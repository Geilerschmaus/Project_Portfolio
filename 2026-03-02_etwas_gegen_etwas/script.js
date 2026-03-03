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
        
        console.log(`Place ${this.selectedPlant} at row ${row}, col ${col}`);
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
}

class Plant{

    constructor(row,col,type){
        this.health = 100;
        this.cost = 50;
        this.row = row;
        this.col = col;
        this.type = type;
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