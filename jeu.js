//const { Graphics } = require("pixi.js");
 
var x = 0;
var y = 0;
var width = 30;
var height = 30;
 
 
const app  = new PIXI.Application({width: 800, height: 600, background: '#1099bb'});
 
// app.init({ width: 800, height: 600, background: '#1099bb'});
 
 
document.getElementById('pixi-container').appendChild(app.view)
 
const texturePromise = PIXI.Assets.load('/img/grass.jpg');
 
const graphics = new Graphics();
     
graphics.rect(50, 50, 100, 100);
graphics.fill(0xf0000);
 
app.stage.addChild(graphics);  
 
 
 
// new PIXI.Graphics(x, y, width, height);