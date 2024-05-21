const app = new PIXI.Application({ width: 1500, height: 900, backgroundColor: 0xbbffbb });
document.getElementById('pixi-container').appendChild(app.view);

let firstImage, secondImage, symbol, result, currentAnswer;
let currentSection = 0; 
let currentIndex = [0, 0, 0, 0]; // Les 4 sections

// Une liste nommée section qui va permettre de structurer et de gérer les images et les opérations
// selon leur longueur.

const sections = [
    { generator: generateImages, container: new PIXI.Container(), length: 10 }, // Utisation du 'Container', pour déterminer les images et les opérateurs comme des objets
    { generator: generateOperations, container: new PIXI.Container(), length: 4 },
    { generator: generateImages, container: new PIXI.Container(), length: 10 },
    
];

function generateImages(index) {
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

    const selectedImage = images[index];

    const sprite = new PIXI.Sprite(selectedImage.texture);
    sprite.width = 300;
    sprite.height = 300;
    const value = selectedImage.value;

    return { sprite, value };
}

function generateOperations(index) {
    const operations = [
        { texture: PIXI.Texture.from('images/plus.png'), value: "+" },
        { texture: PIXI.Texture.from('images/moins.png'), value: "-" },
        { texture: PIXI.Texture.from('images/produit.png'), value: "*" },
        { texture: PIXI.Texture.from('images/quotient.png'), value: "/" }
    ];

    const selectedOperation = operations[index];

    const sprite = new PIXI.Sprite(selectedOperation.texture);
    sprite.width = 100;
    sprite.height = 150;
    const value = selectedOperation.value;

    return { sprite, value };
}

function generateEquation() {


    firstImage = generateImages(currentIndex[0]);
    symbol = generateOperations(currentIndex[1]);
    secondImage = generateImages(currentIndex[2]);
    

    sections[0].container.addChild(firstImage.sprite);
    sections[1].container.addChild(symbol.sprite);
    sections[2].container.addChild(secondImage.sprite);

   // Définir la position des objets
    

    sections[0].container.x = 100;
    sections[0].container.y = 100;

    sections[1].container.x = 450;
    sections[1].container.y = 200;

    sections[2].container.x = 600;
    sections[2].container.y = 100;

   
    app.stage.addChild(sections[0].container);
    app.stage.addChild(sections[1].container);
    app.stage.addChild(sections[2].container);
    

  
    const equalSign = new PIXI.Text('=', { fontSize: 40, fill: 0x000000 });
    equalSign.x = 1000;
    equalSign.y = 300;
    app.stage.addChild(equalSign);

    calculateResult();
   
}

function calculateResult() {
    switch (symbol.value) {
        case '+':
            result = firstImage.value + secondImage.value;
            break;
        case '-':
            result = firstImage.value - secondImage.value;
            break;
        case '*':
            result = firstImage.value * secondImage.value;
            break;
        case '/':
            if (secondImage.value !== 0) {
                result = firstImage.value / secondImage.value;
            } else {
                alert('Impossible!');
                return;
            }
       
    }
}

function checkAnswer(userInput) {
   // Convertir la saisie d'utilisateur en nombre
    if (Number(userInput) === result) {
        alert('Bravo! La réponse est correcte!');
    } else {
        alert('Désolé! La réponse est incorrecte!');
    }


}

function chooseAnswer(){

const input = document.createElement('input');
input.setAttribute('type', 'number');
input.setAttribute('id', 'reponse');
input.style.position = 'absolute';
input.style.left = '1100px';
input.style.top = '300px';





input.addEventListener('keydown', (event) => {

   if (event.key === 'Enter') {
      const userInput = input.value;
      if (userInput !== '') {
          checkAnswer(userInput);
      } else {
          alert('Veuillez saisir une réponse!');
      }
   }
});


document.body.appendChild(input);
input.focus(); // Le input va s'afficher dès qu'on click sur une touche
               // Il S'apprête à recevoir une saisie de l'utilisateur



}
// Utilisateur des touches du clavier selon l'index et la section

//https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key

document.addEventListener('keydown', (event) => {
   switch (event.key) {
       case 'ArrowUp':
           upKey(); 
           miseAJour(); // Mettez à jour la section après avoir appuyé sur la touche
           break;
       case 'ArrowDown':
           downKey(); 
           miseAJour();
           break;
       case 'ArrowLeft':
           leftKey(); 
           miseAJour();
           break;
       case 'ArrowRight':
           rightKey(); 
           miseAJour();
           break;
   }
});

function miseAJour() {
 
      const currentGenerator = sections[currentSection].generator;
      const currentContainer = sections[currentSection].container;
      const updateSection = currentGenerator(currentIndex[currentSection]);

       currentContainer.removeChildren(); // Pour éviter la surcharge des sprites
       currentContainer.addChild(updateSection.sprite);

       // Une logique qui va mettre à jour les images et les opérations

       if (currentSection === 0) {
           firstImage = updateSection;
       } else if (currentSection === 1) {
           symbol = updateSection;
       } else if (currentSection === 2) {
           secondImage = updateSection;
       } else if (currentSection === 3){
         currentAnswer = updateSection;
         
       }

       // Appel des fonctions dans la fonction qui seront affectées par 
       // la modification

       calculateResult();
       chooseAnswer();
    
  
}

// On appelle cette fonction à la toute fin, car il est le coeur de l'application
// au complet.

generateEquation();


