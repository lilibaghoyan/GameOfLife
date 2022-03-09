let matrix = [];
let grassArr = [];
let grassEaterArr = [];
let allEaterArr = [];
let predatorArr = [];
let virusArr = [];
let side = 20;
function setup() {
    function matrixGenerator(matrixSize, grassCount, grassEaterCount, allEaterCount, predatorCount, virusCount) {
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = []
            for (let o = 0; o < matrixSize; o++) {
                matrix[i][o] = 0;
            }
        }
        for (let j = 0; j < grassCount; j++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 1;
        }
        for (let k = 0; k < grassEaterCount; k++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 2;
        }
        for (let l = 0; l < allEaterCount; l++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 3;
        }
        for (let m = 0; m < predatorCount; m++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 4;
        }
        for (let n = 0; n < virusCount; n++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 5;
        }
    }
    matrixGenerator(30, 40, 10, 15, 10, 10)

    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

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
}
    
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
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



}