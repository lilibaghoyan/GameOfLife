let LivingCreature = require("./LivingCreature") 

module.exports = class Virus extends LivingCreature {

    constructor(x, y) {
        super(x, y)
        this.multiply = 20;
    }
    chooseCell2(char1, char2, char3) {
        this.getNewCordinates();
        let result = [];
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char1 || matrix[y][x] == char2 || matrix[y][x] == char3) {
                    result.push(this.directions[i]);
                }
            }
        }
        return result;
    }
    mul() {
        let found = this.chooseCell(0);
        let exact = found[Math.floor(Math.random() * found.length)]
        if (exact && this.multiply > 11) {
            let x = exact[0];
            let y = exact[1];
            let virus = new Virus(x, y);
            matrix[y][x] = 5;
            virusArr.push(virus);
            this.multiply = 10;
        }
        else {
            this.move()
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = found[Math.floor(Math.random() * found.length)]
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 5
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
    infect() {
        let found = this.chooseCell2(2, 3, 4)
        let exact = found[Math.floor(Math.random() * found.length)]
        if (exact) {
            let x = exact[0]
            let y = exact[1]
            matrix[y][x] = 6
            matrix[this.y][this.x] = 0
            this.x = x;
            this.y = y;
            this.multiply -= 2
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
        for (let i = 0; i < virusArr.length; i++) {
            if (virusArr[i].x == this.x && virusArr[i].y == this.y) {
                virusArr.splice(i, 1)
                break;
            }
        }
        matrix[this.y][this.x] = 0
    }
}