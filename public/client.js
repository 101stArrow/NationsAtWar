var socket = io()

var weapons;

socket.on('weapons', function (data) {
  weapons = data;
  weapons.forEach(function(e, i){
    $('#content').append("<img class='tile' src="+weapons[i].path+"></img>")
  });
});

function pushWeapons(){
  socket.emit('weaponsup', weapons)
}
