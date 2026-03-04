class Game {
    constructor() {
        this.rows = 5;
        this.cols = 9;
        this.cells = [];  
        this.selectedPlant = null;
        this.sun = 300; 
        this.plants = [];  
        
        this.init();
    }
    
    init() {
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
            
            this.placePlant(row, col);
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
        //console.log(`Place ${this.selectedPlant} at row ${row}, col ${col}`);
    }
    
    updateSunDisplay() {
        document.getElementById('sunflowerCounter').textContent = `Sunflower counter: ${this.sun}`;
    }

    setupButtonListeners(){
        const buttons = document.querySelectorAll('.plantbar-section button')

        buttons.forEach(button => {
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

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});