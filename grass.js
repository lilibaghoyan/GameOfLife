let LivingCreature = require("./LivingCreature") 

module.exports = class Grass extends LivingCreature {
    
    
    mul() {
        this.multiply++;
        let found = this.chooseCell(0);
        let exact = found[Math.floor(Math.random() * found.length)]
        if (exact && this.multiply > 9) {
            let x = exact[0];
            let y = exact[1];
            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);
            this.multiply = 0;
        }
        if (weath == "winter") {
            
            this.energy -= 2;
            this.multiply -= 2;
        }
        if (weath == "spring") {
            this.energy += 5;
            this.multiply += 5;
        }
        if (weath == "summer") {
            this.energy += 3;
            this.multiply += 3;
        }
        if (weath == "autumn") {
            this.energy--;
            this.multiply--;
        }
    }
}