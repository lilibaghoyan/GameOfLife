
var socket = io();
let side = 20;
let weath = "summer"
function setup() {
    createCanvas(30 * side, 30 * side);
    background('#acacac');
}

function drawMatrix(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (weath == "spring") {                    
                    fill("lightgreen");
                }else if(weath == "autumn"){
                    fill("orange")
                }else if(weath == "winter"){
                    fill("white")
                }else if(weath == "summer"){
                    fill("green")
                }   
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("pink");
            }
            else if (matrix[y][x] == 5) {
                fill("lightblue");
            }
            else if (matrix[y][x] == 6) {
                fill("black");
            }

            rect(x * side, y * side, side, side);

        }
    }
}


function setupWeath(data){
    weath = data
}

setInterval(
    function () {
        socket.on('send matrix', drawMatrix)
        socket.on('send weath', setupWeath)

    }, 1000
)

function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addAllEater() {
    socket.emit("add allEater")
}
function addpredator() {
    socket.emit("add predator")
}
function addVirus() {
    socket.emit("add virus")
}
function spring(){
    socket.emit("spring", "spring")
}
function winter(){
    socket.emit("winter", "winter")
}
function summer(){
    socket.emit("summer", "summer")
}
function autumn(){
    socket.emit("autumn","autumn")
}


