var express = require('express')
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
var jsonfile = require('jsonfile');
var path = require('path');
var http = require('http');
var fs = require('fs');

var PORT = 80;
server.listen(PORT);
console.log("Running on port: "+PORT)

var weapons;
var buildings;
var tiles;

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

app.get('/game', function(req, res){
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile('game.html', options)
});


app.use(express.static(__dirname + '/'));
jsonfile.readFile('public/json/weapons.json', function(err, obj) {
  weapons = obj;
})
jsonfile.readFile('public/json/buildings.json', function(err, obj) {
  buildings = obj;
})
jsonfile.readFile('public/json/tiles.json', function(err, obj) {
  tiles = obj;
})

io.on('connection', function(socket){
  socket.on('get', function(data){
    if(data == 'weapons'){
      socket.emit("weapons", weapons)
    }
    else if(data == 'buildings'){
      socket.emit("buildings", buildings)
    }
  })
  socket.on('weaponsup', function(data){
    weapons = data
    jsonfile.writeFile('public/json/weapons.json', weapons, {spaces: 4})
  });
  socket.on('buildingsup', function(data){
    buildings = data
    jsonfile.writeFile('public/json/buildings.json', buildings, {spaces: 4})
  });
});
