const app = new PIXI.Application({ width: 1500, height: 900, backgroundColor: 0xbbffbb });
document.getElementById('pixi-container').appendChild(app.view);

let currentNum1, currentNum2, currentOp, currentResult;

function generateImages() {
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
    sprite.width = 300;
    const value = randomImages.value;

    return { sprite, value };
}

function generateOperations() {
    const operations = [
        { texture: PIXI.Texture.from('images/plus.png'), value: "+" },
        { texture: PIXI.Texture.from('images/moins.png'), value: "-" },
        { texture: PIXI.Texture.from('images/produit.png'), value: "*" },
        { texture: PIXI.Texture.from('images/quotient.png'), value: "/" }
    ];

    let randomOp = Math.floor(Math.random() * operations.length);
    let randomOperations = operations[randomOp];

    const sprite = new PIXI.Sprite(randomOperations.texture);
    sprite.width = 100;
    sprite.height = 150;
    const value = randomOperations.value;

    return { sprite, value };
}



function generateEquation() {
    currentNum1 = generateImages();
    currentNum2 = generateImages();
    currentOp = generateOperations();

   
    currentNum1.sprite.x = 100;
    currentNum1.sprite.y = 100;
    app.stage.addChild(currentNum1.sprite);

    currentOp.sprite.x = 450;
    currentOp.sprite.y = 200;
    app.stage.addChild(currentOp.sprite);

    currentNum2.sprite.x = 600;
    currentNum2.sprite.y = 100;
    app.stage.addChild(currentNum2.sprite);

 
    const equalSign = new PIXI.Text('=', { fontSize: 40, fill: 0x000000 });
    equalSign.x = 1000;
    equalSign.y = 300;
    app.stage.addChild(equalSign);

   
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
            if(currentNum1.value != 0){
                currentResult = currentNum1.value / currentNum2.value;
            } else{
                alert('Erreur lors de la divison');
                return;
            }
            break;
        default:
            alert('Erreur lors de la generation de l\'equation');   
            return;
    }
}

// Vérifier la réponse de l'utilisateur
function checkAnswer(userInput) {
    if (Number(userInput) === currentResult) {
        alert('Bravo! La réponse est correcte!');
    } else {
        alert('Désolé! La réponse est incorrecte!');
    }
}

// Créer un champ de saisie et un bouton
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



// Élement HTML et CSS

const refresh = document.createElement('button');
refresh.setAttribute('id', 'refresh');
refresh.textContent = 'Rafraichir';
refresh.style.position = 'absolute';
refresh.style.left = '10px';
refresh.style.top = '50px';
refresh.style.backgroundColor = "cyan";
refresh.style.padding = "10px";
refresh.style.border = "none";
refresh.style.borderRadius = "50px";
refresh.style.fontSize = "20px";
refresh.style.fontWeight = "bolder";

refresh.addEventListener('click', () => {
    window.location.reload();
});

document.body.appendChild(refresh);
