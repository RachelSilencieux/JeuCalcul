const app = new PIXI.Application({ width: 1500, height: 900, backgroundColor: 0xbbffbb });
document.getElementById('pixi-container').appendChild(app.view);

let currentNum1, currentNum2, currentOp, currentResult;
let currentSection = 0; // 0: num1, 1: operation, 2: num2
let currentIndex = [0, 0, 0]; 

// Une liste nommée section qui va permettre de structurer et de gérer les images et les opérations
// selon leur longueur.

const sections = [
    { generator: generateImages, container: new PIXI.Container(), length: 10 },
    { generator: generateOperations, container: new PIXI.Container(), length: 4 },
    { generator: generateImages, container: new PIXI.Container(), length: 10 }
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


    currentNum1 = generateImages(currentIndex[0]);
    currentOp = generateOperations(currentIndex[1]);
    currentNum2 = generateImages(currentIndex[2]);

    sections[0].container.addChild(currentNum1.sprite);
    sections[1].container.addChild(currentOp.sprite);
    sections[2].container.addChild(currentNum2.sprite);

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
    switch (currentOp.value) {
        case '+':
            currentResult = currentNum1.value + currentNum2.value;
            break;
        case '-':
            currentResult = currentNum1.value - currentNum2.value;
            break;
        case '*':
            currentResult = currentNum1.value * currentNum2.value;
            break;
        case '/':
            if (currentNum2.value !== 0) {
                currentResult = round(currentNum1.value / currentNum2.value, 2);
            } else {
                alert('Erreur lors de la division');
                return;
            }
       
    }
}

function checkAnswer(userInput) {
    if (Number(userInput) === currentResult) {
        alert('Bravo! La réponse est correcte!');
    } else {
        alert('Désolé! La réponse est incorrecte!');
    }
}

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

button.addEventListener('click', () => {
    const userInput = input.value;
    checkAnswer(userInput);
});

generateEquation();

// Utilisateur des touches du clavier selon l'index et la section


document.addEventListener('keydown', (event) => {
   switch (event.key) {
       case 'ArrowUp':
           upKey(); 
           updateSection(); // Mettez à jour la section après avoir appuyé sur la touche
           break;
       case 'ArrowDown':
           downKey(); 
           updateSection();
           break;
       case 'ArrowLeft':
           leftKey(); 
           updateSection();
           break;
       case 'ArrowRight':
           rightKey(); 
           updateSection();
           break;
   }
});

function updateSection() {
    const currentGenerator = sections[currentSection].generator;
    const currentContainer = sections[currentSection].container;

    const newElement = currentGenerator(currentIndex[currentSection]);

 
    currentContainer.removeChildren(); // Empêcher aux images et aux opérateurs de s'empiller
    currentContainer.addChild(newElement.sprite); 

   // Logique pour mettre à jour les images et les opérations qu'on a choisis
    if (currentSection === 0) {
        currentNum1 = newElement;
    } else if (currentSection === 1) {
        currentOp = newElement;
    } else if (currentSection === 2) {
        currentNum2 = newElement;
    }

    // On appelle la fonction qui enregistre les calculs pour mettre à jour les opérations

    calculateResult();

  
}

