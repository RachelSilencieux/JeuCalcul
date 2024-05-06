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
   // spriteMaps.set(1, sprite1);

   // const  sprite2 = new PIXI.Sprite(images[1]);
   // spriteMaps.set(2, sprite2);

   // const sprite3 = new PIXI.Sprite(images[2]);
   // spriteMaps.set(3, sprite3);

   // sprite1.position.set(100, 100);
   // sprite2.position.set(600, 100);
   // sprite3.position.set(1100, 100);
   // sprite1.width = 300;
   // sprite2.width = 300;
   // sprite3.width = 300;

   app.stage.addChild(sprite);

   spriteMaps.set(randomNumber + 1, sprite);
   // app.stage.addChild(sprite2);
   // app.stage.addChild(sprite3);

  

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

   const section2 = new PIXI.Text('+', operations);

   section2.x = 490;
   section2.y = 300;

   const signeEgal = new PIXI.Text('=', operations);

   signeEgal.x = 990;
   signeEgal.y = 300;

   app.stage.addChild(section2, signeEgal);



}
generateOperations();

function RassamblanceImgOperation(){

   const img = generateImages();
   const operation = " ";

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

RassamblanceImgOperation();
