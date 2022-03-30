
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");


app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');

});


matrix = [];
grassArr = [];
grassEaterArr = [];
allEaterArr = [];
predatorArr = [];
virusArr = [];


weath = "summer";
Grass = require("./grass")
GrassEater = require("./grasseater")
AllEater = require("./alleater")
Virus = require("./virus")
Predator = require("./predator")



function matrixGenerator(matrixSize, grassCount, grassEaterCount, allEaterCount, predatorCount, virusCount) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = []
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let j = 0; j < grassCount; j++) {

        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        } else {
            j--
        }
    }
    for (let k = 0; k < grassEaterCount; k++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        } else {
            k--
        }
    }
    for (let l = 0; l < allEaterCount; l++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        } else {
            l--
        }
    }
    for (let m = 0; m < predatorCount; m++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        } else {
            m--
        }
    }
    for (let n = 0; n < virusCount; n++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        } else {
            n--
        }
    }
    return matrix
}

io.sockets.emit('send matrix', matrixGenerator(30, 40, 10, 15, 10, 10))



function createObject() {


    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let eater = new GrassEater(x, y);
                grassEaterArr.push(eater);
            }
            else if (matrix[y][x] == 3) {
                let allEater = new AllEater(x, y);
                allEaterArr.push(allEater);
            }
            else if (matrix[y][x] == 4) {
                let preDator = new Predator(x, y);
                predatorArr.push(preDator);
            }
            else if (matrix[y][x] == 5) {
                let virus = new Virus(x, y);
                virusArr.push(virus);
            }
        }
    }
    io.sockets.emit("send matrix", matrix);

}


function gamePLay() {
    for (let l = 0; l < predatorArr.length; l++) {
        const predator = predatorArr[l];
        predator.eat()

    }
    for (let i = 0; i < grassArr.length; i++) {
        const grass = grassArr[i];
        grass.mul();
    }
    for (let j = 0; j < grassEaterArr.length; j++) {
        const eater = grassEaterArr[j];
        eater.eat();
    }

    for (let k = 0; k < allEaterArr.length; k++) {
        const alleater = allEaterArr[k];
        alleater.eat();
    }
    for (let m = 0; m < virusArr.length; m++) {
        const virus = virusArr[m];
        virus.infect()
        virus.mul()

    }
    io.sockets.emit("send matrix", matrix)
}
setInterval(gamePLay, 1000)


function kill() {
    grassArr = [];
    grassEaterArr = [];

    allEaterArr = [];
    predatorArr = [];
    virusArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addAllEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            grassEaterArr.push(new AllEater(x, y, 3))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addpredator() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            grassEaterArr.push(new AllEater(x, y, 4))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addVirus() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            grassEaterArr.push(new AllEater(x, y, 5))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spring(data) {
    weath = data
    io.sockets.emit("send weath", weath);
}

function winter(data) {
    weath = data
    io.sockets.emit("send weath", weath);
}

function summer(data) {
    weath = data
    io.sockets.emit("send weath", weath);
}

function autumn(data) {
    weath = data
    io.sockets.emit("send weath", weath);
}




io.on('connection', function (socket) {
    createObject(matrix)
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add allEater", addAllEater);
    socket.on("add predator", addpredator);
    socket.on("add virus", addVirus);
    socket.on("spring", spring);
    socket.on("winter", winter);
    socket.on("summer", summer);
    socket.on("autumn", autumn);
})



var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.allEater = allEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.virus = virusArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)


