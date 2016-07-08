var socket = io()

var weapons;
var buildings
var schema;
var id;
var options;
var editor;

socket.emit("get", 'buildings');
socket.emit("get", 'weapons');

function init() {
    id = getParameterByName('id');
    type = getParameterByName('type')
    if (type) {
        if (type == "weapons") {
            $('#diveditor2').hide()
            editor = new JSONEditor(document.getElementById('diveditor'), {
                ajax: true,
                theme: "bootstrap3",
                iconlib: "fontawesome4",
                no_additional_properties: true,
                schema: {
                    type: "array",
                    title: "Weapons",
                    format: "tabs",
                    items: {
                        headerTemplate: "{{i}} - {{self.name}}",
                        $ref: "public/schema/weapon.json"
                    }
                }
            });
            editor.on('ready', function(){
              editor.setValue(weapons)
              editor.on('change', function() {
                  submit()
              });
            })
        }
        if (type == "buildings") {
            $('#diveditor').hide()
            editor = new JSONEditor(document.getElementById('diveditor2'), {
                ajax: true,
                theme: "bootstrap3",
                iconlib: "fontawesome4",
                no_additional_properties: true,
                schema: {
                    type: "array",
                    title: "Buildings",
                    format: "tabs",
                    items: {
                        headerTemplate: "{{i}} - {{self.name}}",
                        $ref: "public/schema/building.json"
                    }
                }
            });
            editor.on('ready', function(){
              editor.setValue(buildings)
              editor.on('change', function() {
                  submit()
              });
            });
        }
    }
}

function submit() {
    type = getParameterByName('type')
    if (type == 'weapons') {
        weapons = editor.getValue()
        socket.emit('weaponsup', weapons)
    }
    if (type == 'buildings') {
        buildings = editor.getValue()
        socket.emit('buildingsup', buildings)
    }
}

socket.on('weapons', function(data) {
    weapons = data;
    if (getParameterByName('type') == 'weapons') {
        init();
    }
});
socket.on('buildings', function(data) {
    buildings = data;
    if (getParameterByName('type') == 'buildings') {
        init();
    }
});
