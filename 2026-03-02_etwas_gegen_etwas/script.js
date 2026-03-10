class Game {
    constructor() {
        this.rows = 5;
        this.cols = 9;
        this.cells = [];  
        this.selectedPlant = null;
        this.sun = 300; 
        this.plants = []; 
        this.zombies = [];
        this.lastZombieSpawn = new Date();
        this.zombieSpawnIntervall = 3000;
        this.projectiles = [];
        this.removeMode = false; 
        
        this.init();
    }
    
    init() {

        const style = document.createElement('style');

        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            .pulsate { animation: pulse 0.5s infinite; }`;

        document.head.appendChild(style);

        this.createGrid();
        this.setupEventListeners();
        this.updateSunDisplay();
        this.setupButtonListeners();

        setInterval(() => {
            this.gameLoop();
        },100);
    }
    
    createGrid() {
        const gameSection = document.querySelector('.gameplay-section');
        

        for (let row = 0; row < this.rows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                gameSection.appendChild(cell);
                this.cells[row][col] = cell;
            }
        }
    }
    
    setupEventListeners() {

        document.querySelector('.gameplay-section').addEventListener('click', (e) => {
            const cell = e.target.closest('.cell');
            if (!cell) return;
            
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            if(this.removeMode == true){
                this.removePlant(row,col);
                
            }
            else{
                
                
                this.placePlant(row, col);
                
            }
        });
    }
    
    placePlant(row, col) {
        if (!this.selectedPlant) {
            console.log('No plant selected!');
            return;
        }
        
        const plantTypes = {
            'peashooter': Peashooter,      
            'sunflower': Sunflower,
            'wallnut': Wallnut,
            'cherry bomb': Cherry,
            'potato mine': Potato
        }

        const plantClass = plantTypes[this.selectedPlant];
        const cost = new plantClass(row,col).cost;

        if(cost > this.sun){
            console.log("not enough sun");
            return;
        }

        if(this.cells[row][col].querySelector(".plant")){
            console.log("Cant place Plant on existing Plant")
            return;
        }

        this.sun = this.sun - cost;
        const plant = new plantClass(row,col);
        this.plants.push(plant);
        
        this.cells[row][col].appendChild(plant.element);

        
        this.updateSunDisplay();
        //console.log(`Place ${this.selectedPlant} at row ${row}, col ${col}`);
    }
    
    removePlant(row,col){

        const plantPlace = this.plants.findIndex(f => f.row === row && f.col === col);
        if(plantPlace !== -1){

            const plant = this.plants[plantPlace];
            plant.element.remove();
            this.plants.splice(plantPlace,1);

        }

    }

    updateSunDisplay() {
        document.getElementById('sunflowerCounter').textContent = `Sunflower counter: ${this.sun}`;
    }

    setupButtonListeners(){
        const buttons = document.querySelectorAll('.plantbar-section button')

        buttons.forEach(button => {

            if(button.id == "shovel"){

                button.addEventListener('click', () => {

                    if(this.removeMode == true){
                        this.removeMode = false;
                        document.getElementById("shovel").classList.remove("pulsate");
                    }

                    else{
                        this.removeMode = true;
                        document.getElementById("shovel").classList.add("pulsate");
                    }
                })
                return;
            }

            button.addEventListener('click', () => {
                this.selectedPlant = button.textContent;
                console.log(this.selectedPlant);
            })
        });
    }

    gameLoop(){
        this.plants.forEach(plant => {

            plant.tick(this);

        })

        this.plants = this.plants.filter(plant => plant.col >= 0);

        const now = new Date();
        if(now - this.lastZombieSpawn >= this.zombieSpawnIntervall){

            Zombie.spawnZombie(this);
            this.lastZombieSpawn = now;
        }
        
        this.projectiles.forEach(proj => {

            proj.tick(this);
        })

        this.projectiles = this.projectiles.filter(proj => proj.col <= 8);

        this.zombies.forEach(zombie => {
            
            zombie.tick(this);
        })

         this.zombies = this.zombies.filter(zombie => zombie.col >= 0 && zombie.health > 0);


    }
}

class Plant{

    constructor(row,col,type,emoji,color,health){
        this.health = health;
        this.cost = 50;
        this.row = row;
        this.col = col;
        this.type = type;
        this.element = document.createElement('div');
        this.element.classList.add('plant');
        this.element.textContent = emoji;
        this.element.style.backgroundColor = color;
    }

    tick(game){

    }

}

class Peashooter extends Plant{

    constructor(row,col){
        super(row,col,"peashooter","🔫","darkgreen",100)
        this.cost = 100;
        this.actionInterval = 800;
        this.lastAction = new Date();
    }

    tick(game){

        const now = new Date();

        if(now - this.lastAction >= this.actionInterval){

            const zombieInLane = game.zombies.some(zombie => zombie.row === this.row && zombie.col > this.col);

            if(zombieInLane){

                const pea = new Pea(this.row , this.col, game);
                game.projectiles.push(pea);
                this.lastAction = now;

            }
        }

    }

}

class Pea{

    constructor(row,col,game){
        this.row = row;
        this.col = col;
        this.speed = 0.5;
        this.damage = 10;
        this.movementAccumulator = 0;
        this.element = document.createElement("div");
        this.element.textContent = "🟢";
        this.element.classList.add("pea");

        game.cells[this.row][this.col].appendChild(this.element);

    }

    tick(game){

        this.movementAccumulator += this.speed;

        if(this.movementAccumulator >= 1){
            
            this.col += 1;  

            if(this.col > 8){
                this.element.remove();
                this.col = 9;
            }
            else{

                game.cells[this.row][this.col].appendChild(this.element);
                this.movementAccumulator = 0;
            }
        }

        const zombieToHit = game.zombies.find(zombie => zombie.row === this.row &&  Math.abs(zombie.col-this.col) < 1);

        if(zombieToHit){

            zombieToHit.health -= this.damage;
            this.element.remove();
            this.col = 9;
        }
        
        
    }

    
}

class Sunflower extends Plant{

constructor(row, col) {
        super(row, col, "sunflower", "🌻", "yellow",50);
        this.cost = 50;
        this.actionInterval = 5000;
        this.lastAction = new Date();
    }

    tick(game){
        const now = new Date();
        if(now - this.lastAction >= this.actionInterval){
            game.sun += 25;
            game.updateSunDisplay();
            this.lastAction = now;
        }
    }

}

class Wallnut extends Plant{

    constructor(row, col) {
        super(row, col, "wallnut", "🥜", "bisque",200);
        this.cost = 50;
    }

}

class Cherry extends Plant{

    constructor(row, col) {
        super(row, col, "cherry", "🍒", "crimson",1000);
        this.cost = 150;
    }

}

class Potato extends Plant{

    constructor(row, col) {
        super(row, col, "potato", "🥔", "darkgoldenrod",75);
        this.cost = 150;
    }

}

class Zombie{

    constructor(row,col){
        this.row = row;
        this.col = col;
        this.health = 50;
        this.speed = 0.05;
        this.damage = 25;
        this.lastSpawn = new Date();
        this.spawnTime = 100;
        this.movementAccumulator = 0;
        this.movementAccumulatorBefore = 0;
        this.element = document.createElement('div');
        this.element.classList.add('zombie');
        this.element.textContent = "🧟";
    }
    
    static spawnZombie(game){
        const row = Math.trunc(Math.random() * game.rows);
        const zombie = new Zombie(row,8)
        game.zombies.push(zombie);
        game.cells[row][8].appendChild(zombie.element);
    }

    tick(game){

        this.movementAccumulator += this.speed;

        if(this.movementAccumulator >= 1){
            
            this.col -= 1;  

            if(this.col < 0){
                this.element.remove();
            }
            else{

                game.cells[this.row][this.col].appendChild(this.element);
                this.movementAccumulator = 0;
            }
        }
        
        if(this.health <= 0){
            this.element.remove();
        }

        const plantToEat = game.plants.find(plant => plant.row === this.row && Math.abs(plant.col - this.col) < 1);

        if(plantToEat){

            this.movementAccumulatorBefore = this.movementAccumulator;
            this.movementAccumulator = 0;
            plantToEat.health -= this.damage;

            if(plantToEat.health <= 0){
    
                this.movementAccumulator = this.movementAccumulatorBefore;
                this.movementAccumulatorBefore = 0;
                plantToEat.element.remove();
                plantToEat.col = -1;
    
            }
            
        }

    }

}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});