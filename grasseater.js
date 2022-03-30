let LivingCreature = require("./LivingCreature") 


module.exports = class GrassEater extends LivingCreature {
    constructor(x, y) {
       super(x, y)
        this.multiply = 10;
    }
  
    chooseCell(char) {
        this.getNewCordinates();
        let result = [];
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
                if (matrix[y][x] == char) {
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
            let eater = new GrassEater(x, y);
            matrix[y][x] = 2;
            grassEaterArr.push(eater);
            this.multiply = 10;
        }
        else {
            this.move()
        }
    }
    eat() {
        let found = this.chooseCell(1);
        let exact = found[Math.floor(Math.random() * found.length)]


        if (exact) {
            this.multiply += 5;
            let x = exact[0];
            let y = exact[1];
            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                    break;
                }
            }
            matrix[y][x] = 2
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
        // let exact = random(found)
        let exact = found[Math.floor(Math.random() * found.length)]

        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 2
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
                break;
            }
        }
        matrix[this.y][this.x] = 0
    }
}

