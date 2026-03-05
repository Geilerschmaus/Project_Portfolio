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

        if(this.cells[row][col].hasChildNodes()){
            console.log("Cant place Plant on existing Plant")
            return;
        }

        this.sun = this.sun - cost;
        const plant = new plantClass(row,col);
        this.plants.push(plant);

        this.cells[row][col].textContent = plant.display;
        this.cells[row][col].style.backgroundColor = plant.color
        this.updateSunDisplay();
        //console.log(`Place ${this.selectedPlant} at row ${row}, col ${col}`);
    }
    
    removePlant(row,col){
        const plantPlace = this.plants.findIndex(f => f.row === row && f.col === col);
        if(plantPlace !== -1){

            this.plants.splice(plantPlace,1);
            this.cells[row][col].textContent = "";
            this.cells[row][col].style.backgroundColor = "";
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

        const now = new Date();
        if(now - this.lastZombieSpawn >= this.zombieSpawnIntervall){

            Zombie.spawnZombie(this);
            this.lastZombieSpawn = now;
        }

        this.zombies.forEach(zombie => {
            
            zombie.tick(this);
        })

        
    }
}

class Plant{

    constructor(row,col,type){
        this.health = 100;
        this.cost = 50;
        this.row = row;
        this.col = col;
        this.type = type;
    }

    tick(game){

    }

}

class Peashooter extends Plant{

    constructor(row,col){
        super(row,col,"peashooter")
        this.cost = 100;
        this.color = "lightgreen";
        this.display = "🟢"

    }

    

}

class Pea{

    constructor(row,col,game){
        this.row = row;
        this.col = col;
        this.speed = 0.1;
        this.damage = 10;

    }

    
}

class Sunflower extends Plant{

    constructor(row,col){
        super(row,col,"sunflower")
        this.cost = 50;
        this.color = "yellow";
        this.display = "🌻"
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

    constructor(row,col){
        super(row,col,"wallnut")
        this.cost = 50;
        this.color = "bisque";
        this.display = "🥜"
    }

}

class Cherry extends Plant{

    constructor(row,col){
        super(row,col,"cherry")
        this.cost = 150;
        this.color = "crimson";
        this.display = "🍒"
    }

}

class Potato extends Plant{

    constructor(row,col){
        super(row,col,"potato")
        this.cost = 150;
        this.color = "darkgoldenrod";
        this.display = " 🥔"
    }

}

class Zombie{

    constructor(row,col){
        this.row = row;
        this.col = col;
        this.health = 50;
        this.speed = 0.1;
        this.lastSpawn = new Date();
        this.spawnTime = 3000;
        this.movementAccumulator = 0;
    }
    
    static spawnZombie(game){
        const row = Math.trunc(Math.random() * game.rows);
        game.zombies.push(new Zombie(row,8));
    }

    tick(game){

        this.movementAccumulator += this.speed;

        if(this.movementAccumulator >= 1){

            const oldCol = this.col;
            this.col -= 1;
            this.movementAccumulator = 0;
            if(this.col !== oldCol && oldCol >= 0){
                game.cells[this.row][oldCol].textContent = "";
    
            }
            if(this.col >= 0){
                game.cells[this.row][this.col].textContent = "🧟";
            }
        }

    }

}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});