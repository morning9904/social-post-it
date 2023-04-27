/* varie costanti*/
const express = require('express')
const path = require('path')
const app = express()
const ejs = require('ejs')
const body = require("body-parser");
var utils = require("./utils.js");
var data;

app.use(body.urlencoded({ extended: true }))

app.set("view engine", 'ejs')
app.use('/', express.static(__dirname + "/views"));
app.set('views', path.join(__dirname, 'views'));

/*caricamento e visualizzazzione della home */
app.get('/', (req, res) => {
  data = utils.leggiFile("./data/tabella.json");
  res.render("index.ejs")
})                     

/*caricamento e visualizzazzione pagina di inserimento dati */
app.get('/insert', (req, res) => {
  res.render("insert")
})
/*renderizzazione dati scritti nel file json e reindirizzamento alla home*/
app.post('/inserisci', (req, res) => {
  console.log(data);
  utils.appendArrayJSON("./data/tabella.json", data, req)
  res.redirect("/");
})

/*caricamento e visualizzazzione pagina dei post-it */
app.get('/post', (req, res) => {
  data = utils.leggiFile("./data/tabella.json");

  console.log(data);
  res.render("postit",{ data: data})
  
})
/*selezione porta per avviare il server */
var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log("Listening on " + port);
});