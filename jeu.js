var x = 0;
var y = 0;
var width = 30;
var height = 30;
 
 
const app  = new PIXI.Application({width: 1500, height: 900, background: '#bfb'});
document.getElementById('pixi-container').appendChild(app.view)
// const texturePromise = PIXI.Assets.load('/img/grass.jpg');


function styleSprite(){

const texture = PIXI.Texture.from('images/un.png');
sprite1 = new PIXI.Sprite(texture);

sprite1.width = 300;
sprite1.y = 100;
sprite1.x = 100;
app.stage.addChild(sprite1);

const texture2 = PIXI.Texture.from('images/deux.png');
sprite2 = new PIXI.Sprite(texture2);

sprite2.width = 300;
sprite2.y = 100;
sprite2.x = 600;
app.stage.addChild(sprite2);

// const texture3 = PIXI.Texture.from('trois.png');
// sprite3 = new PIXI.Sprite(texture3);



}

styleSprite();

const operators = new PIXI.TextStyle({
   fontFamily : 'Arial',
   fontSize: 30,
   fill : 'white',
   align : 'center'
})

const text = new PIXI.Text("Result: ", operators);
text.position.set(100,50);
app.stage.addChild(text);




function ImageRandom(){

   // Déclarer une nouvelle instance de l'objet Image
  const image1 = new Image();
  image1.src= "images/un.png";

  const image2 = new Image();
  image2.src="images/deux.png";

  const image3 = new Image();
  image3.src = "images/trois.png"

  // Créer un tableau qui contient tous les images
  let tabImages = [image1, image2, image3];

  // Récupérer une image au hasard dans le tableau
  const randomImageIndex = Math.floor(Math.random() * (tabImages.length));
  const img = tabImages[randomImageIndex] ;

  return img;




};

app.stage.addChild(ImageRandom());

const randomImage = ImageRandom();
document.body.appendChild(randomImage);

function ObjectRandom(){

// TODO : créer une variable avec une chaine vide.
// Utiliser le random des images pour calculer  un nombre aléatoire entre 0 et  5.


};

ObjectRandom();














