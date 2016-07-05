var socket = io()
var weapons;

socket.emit("getweapons", true)
socket.on('weapons', function(data) {
    weapons = data
    weapons.forEach(function(e, i) {
        $('#content').append("<div id=" + i + " class='icon-div'></div>")
        $('#' + i).css('background-color', rainbow(500, Math.random() * 500))
        $('#' + i).append("<img src=" + e.path + " />")
        $('#' + i).append("<p>" + isNumeric(Math.floor(Math.random() * 10000)) + "</p>")
        $('#' + i).click(function() {
            $('#' + i).fadeOut();
        });
    });
});

function pushWeapons() {
    socket.emit('weaponsup', weapons)
}
