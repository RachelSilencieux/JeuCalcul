var x = 0;
var y = 0;
var width = 30;
var height = 30;
 
 
const app  = new PIXI.Application({width: 1500, height: 900, background: '#bfb'});
document.getElementById('pixi-container').appendChild(app.view)
// const texturePromise = PIXI.Assets.load('/img/grass.jpg');

const spriteMaps = new Map();


const texture1 = PIXI.Texture.from('images/un.png');
const texture2 = PIXI.Texture.from('images/deux.png');
const texture3 = PIXI.Texture.from('images/trois.png');

   

const sprite1 = new PIXI.Sprite(texture1);
spriteMaps.set(1, sprite1);

const  sprite2 = new PIXI.Sprite(texture2);
spriteMaps.set(2, sprite2);

const sprite3 = new PIXI.Sprite(texture3);
spriteMaps.set(3, sprite3);

sprite1.position.set(100, 100);
sprite2.position.set(600, 100);
sprite3.position.set(1100, 100);
sprite1.width = 300;
sprite2.width = 300;
sprite3.width = 300;

app.stage.addChild(sprite1);
app.stage.addChild(sprite2);
app.stage.addChild(sprite3);


const operations = {

   operation1: new PIXI.TextStyle({
      fontFamily : 'Arial',
      fontSize: 48,
      fill : "black",
      align :"center"
   }),

   operation2: new PIXI.TextStyle({
      fontFamily : 'Arial',
      fontSize: 48,
      fill : "black",
      align :"center"
   }),

   operation3: new PIXI.TextStyle({
      fontFamily : 'Arial',
      fontSize: 48,
      fill : "black",
      align :"center"
   }),
   operation4: new PIXI.TextStyle({
      fontFamily : 'Arial',
      fontSize: 48,
      fill : "black",
      align :"center"
   }),
   operation5: new PIXI.TextStyle({
      fontFamily : 'Arial',
      fontSize: 48,
      fill : "black",
      align :"center"
   })

};

const text1 = new PIXI.Text('+', operations.operation1);
const text2 = new PIXI.Text('=', operations.operation2);
const text3 = new PIXI.Text('/', operations.operation3);
const  text4 = new PIXI.Text('*', operations.operation4);  
const text5 = new PIXI.Text('-', operations.operation5);
// const  text6 = new PIXI.Text(" ", operations.operation5); // space for the result of an operation



text1.x = 490;
text1.y = 300;
text2.x = 990;
text2.y = 300;


app.stage.addChild(text1, text2);

function calculateOperations(operations, image1, image2){

   switch (operations){
      case "+":
         resultat = image1 + image2;
         break;
         
      case "-":
         resultat = image1 - image2;
         break;
         
      case "/":
         if (image2 == 0) {alert ("Erreur de division par zéro"); return;}
         else{resultat = image1 / image2;}
         break;

      case "*":
         resultat = image1 *  image2;
         break;
      default:
         console.log("Opération non valide");
         return 
   }

}







// const operators = new PIXI.TextStyle({
//    fontFamily : 'Arial',
//    fontSize: 30,
//    fill : 'white',
//    align : 'center'
// })

// const text = new PIXI.Text("Result: ", operators);
// text.position.set(100,50);
// app.stage.addChild(text);




// function ImageRandom(){

//    // Déclarer une nouvelle instance de l'objet Image
//   const image1 = new Image();
//   image1.src= "images/un.png";

//   const image2 = new Image();
//   image2.src="images/deux.png";

//   const image3 = new Image();
//   image3.src = "images/trois.png"

//   // Créer un tableau qui contient tous les images
//   let tabImages = [image1, image2, image3];

//   // Récupérer une image au hasard dans le tableau
//   const randomImageIndex = Math.floor(Math.random() * (tabImages.length));
//   const img = tabImages[randomImageIndex] ;

//   return img;




// };

// app.stage.addChild(ImageRandom());

// const randomImage = ImageRandom();
// document.body.appendChild(randomImage);

// function ObjectRandom(){

// // TODO : créer une variable avec une chaine vide.
// // Utiliser le random des images pour calculer  un nombre aléatoire entre 0 et  5.


// };

// ObjectRandom();














