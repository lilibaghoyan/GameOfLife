
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

////////////////////////////////


matrix = [];
grassArr = [];
grassEaterArr = [];
allEaterArr = [];
predatorArr = [];
virusArr = [];

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
setInterval(gamePLay, 300)

io.on('connection', function (socket) {
    createObject(matrix)
})
