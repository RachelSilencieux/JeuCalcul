let maze = document.querySelector(".maze");
let ctx =maze.getContext("2d");
let current;



class Maze {
    constructor(taille,rangees,colonnes){
        this.taille = taille;
        this.rangees = rangees;
        this.colonnes = colonnes;
        this.grille = [];
        this.pile = [];
    }

    setup(){
        for (let r =0; r< this.rangees; r++){
            let row = [];
            for (let c =0; c < this.colonnes; c++){
                let cell = new Cell(r,c,this.grille,this.taille)
                this.rangees.push(cell);
            }
            this.grille.push(this.rangees);
        }
        courrante = this.grille[0][0];
    }
}


class Cell {
    constructor(rowNum,colNum,grilleParent,grilleTaille){
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.grilleParent = grilleParent;
        this.grilleTaille = grilleTaille;
        this.visited = false;
        this.walls = {
            murHaut : true,
            murDroite : true,
            murGauche : true,
            murBas : true,
        };
    }

}

let newMaze = new Maze(500,10,10);
newMaze.setup();