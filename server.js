var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var path = require('path');
var jsonfile = require('jsonfile');

var PORT = 80;
server.listen(PORT);
console.log("Running on port: "+PORT)

var weapons;

app.get('/', function(req, res){
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile('index.html', options)
});

app.get('/editor', function(req, res){
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile('editor.html', options)
});

app.use(express.static(__dirname + '/'));
jsonfile.readFile('public/weapons.json', function(err, obj) {
  weapons = obj
})

io.on('connection', function(socket){
  socket.emit("weapons", weapons)
  socket.on('weaponsup', function(data){
    weapons = data
    jsonfile.writeFile('public/weapons.json', weapons, {spaces: 4})
  });
});
