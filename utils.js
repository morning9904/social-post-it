var fs = require('fs');
var data = new Date();

/* funzione per verificare se la scrittura è avvenuta con successo*/
function scriviFile(percorso, file) {
  fs.writeFile(percorso, file, function(err) {
    if (err) throw err;
    console.log("File scritto con successo");
  });
}
 /* funzione per leggere dentro il file */ 
function leggiFile(percorsoFile) {
  var data;
  data = fs.readFileSync(percorsoFile, "utf8", (err, dati) => {
    if (err) {
      console.error(err);
      return;
    } else {
      return dati;
    }
  });
  return JSON.parse(data);
}

/* funzione per scrivere i nuovi dati in coda al file */
function appendArrayJSON(percorsoFile, fileJSON, req) {
  var file = "[";
  length = Object.keys(fileJSON).length;

  for (var i = 0; i < length; i++) {
    file += '{ "Nome": "' + fileJSON[i].Nome + '", "Nickname": "' + fileJSON[i].Nickname + '"},\n';
  }
  file += '{ "Nome": "' + req.body.Nome
    + '", "Nickname": "' + req.body.Nickname + '"}\n';
  file += "]";
  scriviFile(percorsoFile, file);
}

module.exports = { scriviFile, leggiFile, appendArrayJSON }