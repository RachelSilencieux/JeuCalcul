import * as PIXI from 'pixi.js';

const jeu = new PIXI.Application({width: 800, height: 600});

document.body.appendChild(jeu.view);

PIXI.Loader.shared.add("background", "ProjetLabyrinthe\img\grass.jpg").load(setup);

function setup(){

   let background = new PIXI.Sprite(PIXI.Loader.shared.ressources["background"].texture);

   background.width = jeu.screen.width;
   background.height = jeu.screen.height;

   jeu.stage.addChild(background);
}

setup();