const app  = new PIXI.Application({width: 1500, height: 900, background: '#bfb'});
document.getElementById('pixi-container').appendChild(app.view)



function generateImages(){

   const spriteMaps = new Map();

   const images = [

      PIXI.Texture.from('images/zero.png'),
      PIXI.Texture.from('images/un.png'),
      PIXI.Texture.from('images/deux.png'),
      PIXI.Texture.from('images/trois.png'),
      PIXI.Texture.from('images/quatre.png'),
      PIXI.Texture.from('images/cinq.png'),
      PIXI.Texture.from('images/six.png'),
      PIXI.Texture.from('images/sept.png'),
      PIXI.Texture.from('images/huit.png'),
      PIXI.Texture.from('images/neuf.png')
   ];

   let randomNumber = Math.floor(Math.random() * images.length);
   let randomImages = images[randomNumber];


   const sprite = new PIXI.Sprite(randomImages);

   sprite.position.set(100, 100);
   sprite.width = 300;


   app.stage.addChild(sprite);

   spriteMaps.set(randomNumber + 1, sprite);


  

   return randomImages;

   
   
};

generateImages();

function generateIMG(){

   const spriteMaps = new Map();

   const images = [

      PIXI.Texture.from('images/zero.png'),
      PIXI.Texture.from('images/un.png'),
      PIXI.Texture.from('images/deux.png'),
      PIXI.Texture.from('images/trois.png'),
      PIXI.Texture.from('images/quatre.png'),
      PIXI.Texture.from('images/cinq.png'),
      PIXI.Texture.from('images/six.png'),
      PIXI.Texture.from('images/sept.png'),
      PIXI.Texture.from('images/huit.png'),
      PIXI.Texture.from('images/neuf.png')
   ];

   let randomNumber = Math.floor(Math.random() * images.length);
   let randomImages = images[randomNumber];


   const sprite = new PIXI.Sprite(randomImages);

   sprite.position.set(600, 100);
   sprite.width = 300;

   app.stage.addChild(sprite);

   spriteMaps.set(randomNumber + 1, sprite);

   return randomImages;

}

generateIMG();

function randomOperations(){

   const spriteMaps = new Map();

   const styles = new PIXI.TextStyle({ 
      fontFamily : 'Arial',
      fontSize: 48,
      fill : "black",
      align :"center"
   });

   const operations = [

      PIXI.Text('+', styles),
      PIXI.Text('-', styles),
      PIXI.Text('*', styles),
      PIXI.Text('/', styles)
   ];

   let randomOp = Math.floor(Math.random() * operations.length);
   let randomSigns = operations[randomOp];

   operations.x = 490;
   operations.y = 300;

   app.stage.addChild(operations);

   spriteMaps.set(randomOp + 1, operations);
   
   return randomSigns;



}

randomOperations();

function equalSign(){

const signeEgal = new PIXI.Text('=', operations);

signeEgal.x = 990;
signeEgal.y = 300;

app.stage.addChild(signeEgal);



}
equalSign();

function RassamblanceImgOperation(){

   const img = generateImages();
   const img2 = generateIMG();
   const operation = " ";

   let result;

   switch(operation){
      case '+':
         result = img + img2;
         break;
      case '-':
         result = img - img2;
         break;
      case '*':
         result = img * img2;
         break;
      case '/':
         if(img != 0) {
            result = img / img2;
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

RassamblanceImgOperation();
