var x = 0;
var y = 0;
var width = 30;
var height = 30;
 
 
const app  = new PIXI.Application({width: 1500, height: 900, background: '#bfb'});
document.getElementById('pixi-container').appendChild(app.view)



function generateImages(images){

   const spriteMaps = new Map();

   const images = [

      texture1 = PIXI.Texture.from('images/un.png'),
      texture2 = PIXI.Texture.from('images/deux.png'),
      texture3 = PIXI.Texture.from('images/trois.png')
   ];

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

   let randomNumber = Math.floor(Math.random() * images.lenght);
   let randomImages = images[randomNumber];

   return randomImages;

   
   
};

generateImages();

function generateOperations(){

   const operations = new PIXI.TextStyle({ 
      fontFamily : 'Arial',
      fontSize: 48,
      fill : "black",
      align :"center"
   });

   const section2 = new PIXI.Text(operations);

   section2.x = 490;
   section2.y = 300;

   const signeEgal = new PIXI.TextStyle({
      fontFamily : 'Arial',
      fontSize: 48,
      fill : "black",
      align :"center"
   })

   const section4 = new PIXI.Text(signeEgal);

   signeEgal.x = 990;
   signeEgal.y = 300;

   app.stage.addChild(section2, section4);



}
generateOperations();

function RassamblanceImgOperation(){

   const img = generateImages();
   const operation = generateOperations();

   let result;

   switch(operation){
      case '+':
         result = img + img;
         break;
      case '-':
         result = img - img;
         break;
      case '*':
         result = img * img;
         break;
      case '/':
         if(img != 0) {
            result = img / img;
         } else {
            alert('Erreur lors de la division!');
            return;
         }
         break;
      default:
         console.log('Operation non valide');
         return;            
   }

   // METTRE LA POSITION DU SIGNE D'ÉGALITÉ (Section 5)
   // AFFICHER LA RÉPONSE AVEC CONSOLE.LOG


}







// const text1 = new PIXI.Text('+', operations.addition);
// const text2 = new PIXI.Text('=', operations.soustraction);
// const text3 = new PIXI.Text('/', operations.multiplication);
// const  text4 = new PIXI.Text('*', operations.division);  
// const text5 = new PIXI.Text('-', operations.egale);
// const  text6 = new PIXI.Text(" ", operations.operation5); // space for the result of an operation



// text1.x = 490;
// text1.y = 300;
// text2.x = 990;
// text2.y = 300;

























