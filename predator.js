let LivingCreature = require("./LivingCreature") 

module.exports = class Predator extends LivingCreature {

    constructor(x, y) {
        super(x,y)
        this.multiply = 20;
    }
    chooseCell1(char1, char2) {
        this.getNewCordinates();
        let result = [];
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char1 || matrix[y][x] == char2) {
                    result.push(this.directions[i]);
                }
            }
        }
        return result;
    }
    mul() {
        let found = this.chooseCell(0);
        let exact = found[Math.floor(Math.random() * found.length)]
        if (exact && this.multiply > 100) {
            let x = exact[0];
            let y = exact[1];
            let predator = new Predator(x, y);
            matrix[y][x] = 4;
            predatorArr.push(predator);
            this.multiply = 10;
        }
        else {
            this.move()
        }
    }
    eat() {
        let found = this.chooseCell1(2, 3);
        let exact = found[Math.floor(Math.random() * found.length)]
        if (exact) {
            this.multiply += 6;
            let x = exact[0];
            let y = exact[1];
            for (let i = 0; i < predatorArr.length; i++) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x;
            this.y = y
            if (this.multiply > 100) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = found[Math.floor(Math.random() * found.length)]
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x;
            this.y = y;
            this.multiply--
            if (this.multiply < 0) {
                this.die()
            }
        } else {
            this.multiply--
            if (this.multiply < 0) {
                this.die()
            }
        }
    }
    die() {
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0
    }
}
