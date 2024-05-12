const app  = new PIXI.Application({ width: 1500, height: 900, background: '#bfb' });
document.getElementById('pixi-container').appendChild(app.view);

function generateImages() {
   const spriteMaps = new Map();

   const images = [
      { texture: PIXI.Texture.from('images/zero.png'), value: 0 },
      { texture: PIXI.Texture.from('images/un.png'), value: 1 },
      { texture: PIXI.Texture.from('images/deux.png'), value: 2 },
      { texture: PIXI.Texture.from('images/trois.png'), value: 3 },
      { texture: PIXI.Texture.from('images/quatre.png'), value: 4 },
      { texture: PIXI.Texture.from('images/cinq.png'), value: 5 },
      { texture: PIXI.Texture.from('images/six.png'), value: 6 },
      { texture: PIXI.Texture.from('images/sept.png'), value: 7 },
      { texture: PIXI.Texture.from('images/huit.png'), value: 8 },
      { texture: PIXI.Texture.from('images/neuf.png'), value: 9 }
   ];

   let randomNumber = Math.floor(Math.random() * images.length);
   let randomImages = images[randomNumber];

   const sprite = new PIXI.Sprite(randomImages.texture);
   sprite.position.set(100, 100);
   sprite.width = 300;

   app.stage.addChild(sprite);

   // Convertir la valeur en nombre
   const value = parseInt(randomImages.value);

   spriteMaps.set(randomNumber + 1, { sprite, value });

   // Retourner la valeur en tant que nombre
   return { texture: randomImages.texture, value };
}



function generateIMG() {
   const spriteMaps = new Map();

   const images = [
      { texture: PIXI.Texture.from('images/zero.png'), value: 0 },
      { texture: PIXI.Texture.from('images/un.png'), value: 1 },
      { texture: PIXI.Texture.from('images/deux.png'), value: 2 },
      { texture: PIXI.Texture.from('images/trois.png'), value: 3 },
      { texture: PIXI.Texture.from('images/quatre.png'), value: 4 },
      { texture: PIXI.Texture.from('images/cinq.png'), value: 5 },
      { texture: PIXI.Texture.from('images/six.png'), value: 6 },
      { texture: PIXI.Texture.from('images/sept.png'), value: 7 },
      { texture: PIXI.Texture.from('images/huit.png'), value: 8 },
      { texture: PIXI.Texture.from('images/neuf.png'), value: 9 }
   ];

   let randomNumber = Math.floor(Math.random() * images.length);
   let randomImages = images[randomNumber];

   const sprite = new PIXI.Sprite(randomImages.texture);
   sprite.position.set(600, 100);
   sprite.width = 300;

   app.stage.addChild(sprite);

   // Convertir la valeur en nombre
   const value = parseInt(randomImages.value);

   spriteMaps.set(randomNumber + 1, { sprite, value });

   // Retourner la valeur en tant que nombre
   return { texture: randomImages.texture, value };
}




function randomOperations() {
   const spriteMaps = new Map();

   const operations = [
      { texture: PIXI.Texture.from('images/plus.png'), value: "+" },
      { texture: PIXI.Texture.from('images/moins.png'), value: "-" },
      { texture: PIXI.Texture.from('images/produit.png'), value: "*" },
      { texture: PIXI.Texture.from('images/quotient.png'), value: "/" }
   ];

   let randomOp = Math.floor(Math.random() * operations.length);
   let randomSigns = operations[randomOp];

   const sprite = new PIXI.Sprite(randomSigns.texture);
   sprite.position.set(450, 200);
   sprite.width = 100;
   sprite.height = 150;

   app.stage.addChild(sprite);

   // Stocker le symbole de l'opérateur en tant que valeur
   spriteMaps.set(randomOp + 1, { sprite, value: randomSigns.value });

   const signeEgal = new PIXI.Text(' = ');
   signeEgal.x = 990;
   signeEgal.y = 300;
   app.stage.addChild(signeEgal);

   // Retourner l'objet contenant le symbole de l'opérateur et sa texture
   return randomSigns;
}




let imgValue1, imgValue2, operationValue;

function RassamblanceImgOperation(userInput) {
   // Utilisez les valeurs stockées au lieu de regénérer
   const img1 = imgValue1 !== undefined ? imgValue1 : (imgValue1 = generateImages().value);
   const img2 = imgValue2 !== undefined ? imgValue2 : (imgValue2 = generateIMG().value);
   const operation = operationValue !== undefined ? operationValue : (operationValue = randomOperations().value);

   let result;

   switch(operation) {
      case '+':
         result = img1 + img2;
         break;
      case '-':
         result = img1 - img2;
         break;
      case '*':
         result = img1 * img2;
         break;
      case '/':
         if(img1 != 0) {
            result = img1 / img2;
         } else {
            alert('Erreur lors de la division!');
            return;
         }
         break;
      default:
         console.log('Operation non valide');
         return;            
   }

   if(Number(userInput) === result) {
      alert('Bravo ! La réponse est correcte.');
  } else {
      alert('Désolé, la réponse est incorrecte.');
  }

   // Réinitialisez les valeurs générées pour les prochains calculs
   imgValue1 = undefined;
   imgValue2 = undefined;
   operationValue = undefined;
}


// Création des éléments HTML
const input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('id', 'reponse');
input.style.position = 'absolute';
input.style.left = '1100px';
input.style.top = '300px';

const button = document.createElement('button');
button.setAttribute('id', 'valide');
button.textContent = 'Valider';
button.style.position = 'absolute';
button.style.left = '1100px';
button.style.top = '350px';

document.body.appendChild(input);
document.body.appendChild(button);

// Ajout d'un écouteur d'événement au bouton
button.addEventListener('click', () => {
    const userInput = input.value;
    RassamblanceImgOperation(userInput);
});

// Génération des éléments initiaux
generateImages();
generateIMG();
randomOperations();




