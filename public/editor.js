var socket = io()

var weapons;
var container = $('#editor');
var options = {
  theme:"bootstrap3",
  iconlib: "fontawesome4"
};

var editor = new JSONEditor(container, options);

String.prototype.toProperCase = function () {
   return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function pushWeapons(){
  socket.emit('weaponsup', weapons)
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function isNumeric(test){
    if(!isNaN(test)){
      return +test
    } else {
      return test;
    }
}

function init(){
  id = getParameterByName('id');
  type = getParameterByName('type')
  if(type && id){
    if(type == "weapon"){
      editor.setValue(weapons[id])
    }
  }
}

function submit(type){
  if(type == 'weapon'){
    pushWeapons()
  }
}

socket.on('weapons', function (data) {
  weapons = data;
  init();
});
