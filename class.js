class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 8;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
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
        this.multiply++;
        let found = this.chooseCell(0);
        let exact = random(found)
        if (exact && this.multiply > 9) {
            let x = exact[0];
            let y = exact[1];
            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);
            this.multiply = 0;
        }
    }
}

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 10;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
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
        let exact = random(found)
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
        let exact = random(found)
        if (exact) {
            this.multiply += 5;
            let x = exact[0];
            let y = exact[1];
            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
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
        let exact = random(found)
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
            }
        }
        matrix[this.y][this.x] = 0
    }
}
class AllEater {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 10;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char1, char2) {
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
        let exact = random(found)
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
        let found = this.chooseCell(1, 2);
        let exact = random(found)
        if (exact) {
            this.multiply += 5;
            let x = exact[0];
            let y = exact[1];
            for (let i = 0; i < allEaterArr.length; i++) {
                if (allEaterArr[i].x == x && allEaterArr[i].y == y) {
                    allEaterArr.splice(i, 1)
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
        let exact = random(found)
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
            }
        }
        matrix[this.y][this.x] = 0
    }
}
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char1, char2) {
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
        let exact = random(found)
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
        let found = this.chooseCell(2, 3);
        let exact = random(found)
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
        let exact = random(found)
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
class Virus {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 20;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char1, char2, char3) {
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
        let exact = random(found)
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
        let exact = random(found)
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
        let found = this.chooseCell(2, 3, 4)
        let exact = random(found)
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
            }
        }
        matrix[this.y][this.x] = 0
    }
}
