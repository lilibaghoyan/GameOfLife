let LivingCreature = require("./LivingCreature") 

module.exports = class Grass extends LivingCreature {
    
    
    mul() {
        this.multiply++;
        let found = this.chooseCell(0);
        // let exact = random(found)
        let exact = found[Math.floor(Math.random() * found.length)]
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