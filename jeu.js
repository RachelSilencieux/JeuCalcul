var x = 0;
var y = 0;
var width = 30;
var height = 30;
 
 
const app  = new PIXI.Application({width: 900, height: 900, background: '#bfb'});
document.getElementById('pixi-container').appendChild(app.view)
const texturePromise = PIXI.Assets.load('/img/grass.jpg');


function styleSprite(){

const texture = PIXI.Texture.from('un.png');
sprite1 = new PIXI.Sprite(texture);

sprite1.width = 300;
sprite1.y = 100;
sprite1.x = 100;
app.stage.addChild(sprite1);

const texture2 = PIXI.Texture.from('deux.png');
sprite2 = new PIXI.Sprite(texture2);

sprite2.width = 300;
sprite2.y = 100;
sprite2.x = 100;
app.stage.addChild(sprite2);

// const texture3 = PIXI.Texture.from('trois.png');
// sprite3 = new PIXI.Sprite(texture3);



}

styleSprite();

const text = new Text({
    text: 'Hello Pixi!',
    style: {
       fontFamily: 'Arial',
       fontSize: 24,
    fill: 0xff1010,
    align: 'center',
  }
 });



