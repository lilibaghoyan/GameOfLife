let LivingCreature = require("./LivingCreature") 

module.exports = class AllEater extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.multiply = 10;
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
        if (exact && this.multiply > 110) {
            let x = exact[0];
            let y = exact[1];
            let allEater = new AllEater(x, y);
            matrix[y][x] = 3;
            allEaterArr.push(allEater);
            this.multiply = 10;
        }
        else {
            this.move()
        }
    }
    eat() {
        let found = this.chooseCell1(1, 2);
        let exact = found[Math.floor(Math.random() * found.length)]
        if (exact) {
            this.multiply += 5;
            let x = exact[0];
            let y = exact[1];
            for (let i = 0; i < allEaterArr.length; i++) {
                if (allEaterArr[i].x == x && allEaterArr[i].y == y) {
                    allEaterArr.splice(i, 1)
                    break;
                }
            }
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x;
            this.y = y
            if (this.multiply > 110) {
                this.mul()
            }
            else {
                this.move()
            }
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
            matrix[y][x] = 3
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
        for (let i = 0; i < allEaterArr.length; i++) {
            if (allEaterArr[i].x == this.x && allEaterArr[i].y == this.y) {
                allEaterArr.splice(i, 1)
                break;
            }
        }
        matrix[this.y][this.x] = 0
    }
}
