socket = io()

var buildings;
var buildable = []
var playerbuildings = []
var age = "stoneage"
var resources = {"wood": 200, "metal":50, "stone":20, "gems": 0, "gunpowder": 0, "food":50}

var tilecount = 9;
var height;
if (!height) {
    height = Math.sqrt(tilecount)
}
var width = tilecount / height;

var id = 0
var idmapping = {};

socket.emit("get", 'buildings')
socket.on('buildings', function(data) {
    buildings = data;
    init()
});

function init() {
    $('#game').empty()
    $('#game').append("<table id='grid'></table>")
    for (i = 0; i < height; i++) {
        $('#grid').append("<tr id='row" + i + "'></tr>")
    }
    for (i = 0, k = 0; i < tilecount; i++) {
        if (i % width == 0 && i > 1) {
            k++
        }
        if (!playerbuildings[i]) {
          roll = Math.floor(Math.random() * 6)
          if(roll == 4){
            playerbuildings.push({"building": buildings[22]})
          }
          else if(roll == 5){
            playerbuildings.push({"building": buildings[24]})
          }
          else {
            playerbuildings.push({"building": buildings[0]})
          }

        }
        $('#row' + k).append("<td id='c" + i + "' class='icon-div'><img id='img" + i + "' src=" + playerbuildings[i].building.path + "></img></td>")
        $('#c' + i).droppable({
            drop: function(event, ui) {
                ui.draggable.fadeOut()
                id = ui.draggable.attr('id');
                cellnum = $(event.target).attr("id").substring(1)
                tile = idmapping[id].building;
                if(canSubtract(resources, tile.buildcost, 0)){
                  if(tile.upgrade && tile.upgrade.from !== playerbuildings[cellnum].building.upgrade.to){
                    
                  }
                  resources = subtract(resources, tile.buildcost)
                  $('#img'+cellnum).attr("src", idmapping[id].building.path);
                  playerbuildings[cellnum] = {"building": idmapping[id].building};
                  tick()
                }
                tick()
            }
        });
    }
    tick()
}

function tick(){
  getBuildable()
  $('#status').empty()
  $('#status').append("<li class='status'><a>Wood <span class='badge'>"+resources.wood+"</span></a></li>")
  $('#status').append("<li class='status'><a>Metal <span class='badge'>"+resources.metal+"</span></a></li>")
  $('#status').append("<li class='status'><a>Stone <span class='badge'>"+resources.stone+"</span></a></li>")
}

function getBuildable(){
  //buildable logic
  buildable = []
  var capital;
  playerbuildings.forEach(function(e, i){
    if(e.building.name == "Capital"){
        capital = 1
    }
  });
  if(capital !== 1){
    buildable.push(7)
  }
  if(capital == 1){
    buildable = buildable.concat(getTechLevelBuildings(age))
  }
  $('#sidebar').empty()
  buildable.forEach(function(e, i){
    dragtile(e);
  });
}

function dragtile(i){
  e = buildings[i]
  $('#sidebar').append("<div class='icon-div list' id="+id+"><img src="+e.path+"></img><p>"+e.name+"</p></div>")
  $('#'+id).draggable({
    revert: "invalid"
  });
  idmapping[id] = {"id": id, "building": e, "index": i}
  id++
}

function getTechLevelBuildings(tech){
  var techbuild = [];
  buildings.forEach(function(e, i){
    if(e.unlockage == tech){
      techbuild.push(i)
    }
  })
  return techbuild;
}
