var socket = io()

var weapons;
var techweps;
var schema;
var id;

socket.emit("getweapons", true)
function init() {
    id = getParameterByName('id');
    type = getParameterByName('type')
    if (type) {
        if (type == "weapon") {
            editor.setValue(weapons);
        }
    }
}

function submit() {
    if (type == 'weapon') {

socket.emit("getweapons", true)
function init() {
    id = getParameterByName('id');
    type = getParameterByName('type')
    if (type) {
        if (type == "weapon") {
            editor.setValue(weapons);
        }
    }
}
        var errors = editor.validate();
        if (errors.length) {
            console.log(errors);
        } else {
            weapons = editor.getValue()
            pushWeapons()
        }
    }
}

socket.on('weapons', function(data) {
    weapons = data;
    init();
});

var editor = new JSONEditor(document.getElementById('editor'), {
    ajax: true,
    theme: "bootstrap3",
    iconlib: "fontawesome4",
    schema: {
        type: "array",
        title: "Editor",
        format: "tabs",
        items: {
            headerTemplate: "{{i}} - {{self.name}}",
            $ref: "public/schema/weapon.json"
        }
    }
});

editor.on('change', function() {
    submit()
});
