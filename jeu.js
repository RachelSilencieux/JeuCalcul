const app = new PIXI.Application({ width: 1500, height: 900, backgroundColor: 0xbbffbb });
document.getElementById("pixi-container").appendChild(app.view);

let firstImage, secondImage, operation, resultEquation, playerAnswer;
let texturePosition = 0;
let textureSection = [0, 0, 0, 0];


// ----------------------------------------------------------------------------------------------------------------------------------------------

function generateImages(index) {
  const images = [
    { texture: PIXI.Texture.from("images/zero.png"), value: 0 },
    { texture: PIXI.Texture.from("images/un.png"), value: 1 },
    { texture: PIXI.Texture.from("images/deux.png"), value: 2 },
    { texture: PIXI.Texture.from("images/trois.png"), value: 3 },
    { texture: PIXI.Texture.from("images/quatre.png"), value: 4 },
    { texture: PIXI.Texture.from("images/cinq.png"), value: 5 },
    { texture: PIXI.Texture.from("images/six.png"), value: 6 },
    { texture: PIXI.Texture.from("images/sept.png"), value: 7 },
    { texture: PIXI.Texture.from("images/huit.png"), value: 8 },
    { texture: PIXI.Texture.from("images/neuf.png"), value: 9 }
  ];


  const valeurImage = images[index];

  const sprite = new PIXI.Sprite(valeurImage.texture);
  sprite.width = 300;
  sprite.height = 300;
  const value = valeurImage.value;

  return { sprite, value };
}

function generateOperations(index) {
  const operations = [
    { texture: PIXI.Texture.from("images/plus.png"), value: "+" },
    { texture: PIXI.Texture.from("images/moins.png"), value: "-" },
    { texture: PIXI.Texture.from("images/produit.png"), value: "*" },
    { texture: PIXI.Texture.from("images/quotient.png"), value: "/" }
  ];

  const selectedOperation = operations[index];

  const sprite = new PIXI.Sprite(selectedOperation.texture);
  sprite.width = 100;
  sprite.height = 150;
  const value = selectedOperation.value;

  return { sprite, value };
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------


const sections = [
    { section: generateImages, container: new PIXI.Container(), length: 10 }, 
    { section: generateOperations, container: new PIXI.Container(), length: 4 },
    { section: generateImages, container: new PIXI.Container(), length: 10 }
];

function texturePlacement() {
  firstImage = generateImages(textureSection[0]);
  operation = generateOperations(textureSection[1]);
  secondImage = generateImages(textureSection[2]);



  sections[0, 1, 2].container.removeChildren();
 

  sections[0].container.addChild(firstImage.sprite);
  sections[1].container.addChild(operation.sprite);
  sections[2].container.addChild(secondImage.sprite);

  

  sections[0].container.x = 100;
  sections[0].container.y = 100;

  sections[1].container.x = 450;
  sections[1].container.y = 200;

  sections[2].container.x = 600;
  sections[2].container.y = 100;

  app.stage.addChild(sections[0].container);
  app.stage.addChild(sections[1].container);
  app.stage.addChild(sections[2].container);

  const equalSign = new PIXI.Text("=", { fontSize: 40, fill: 0x000000 });
  equalSign.x = 1000;
  equalSign.y = 300;
  app.stage.addChild(equalSign);

  calculateResult();
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

function calculateResult() {
  switch (operation.value) {
    case "+":
      resultEquation = firstImage.value + secondImage.value;
      break;
    case "-":
      resultEquation = firstImage.value - secondImage.value;
      break;
    case "*":
      resultEquation = firstImage.value * secondImage.value;
      break;
    case "/":
      if (secondImage.value !== 0) {
        resultEquation = firstImage.value / secondImage.value;
      } else {
        alert("Impossible!");
        return;
      }
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------


function chooseAnswer() {
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", "reponse");
    input.style.position = "absolute";
    input.style.left = "1100px";
    input.style.top = "500px";
    input.style.padding = "30px";
    input.style.fontSize = "50px";
    input.style.width = "100px";
  
    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            const userInput = input.value;
        if (userInput !== "") {
          checkAnswer(userInput);
        } else {
          alert("Veuillez saisir une réponse!");
        }
      }
    });
  
    document.body.appendChild(input);
    input.focus(); 
  }
  
let score = 0;
let correctAnswer = 0;
let maxAnswer = 10;

let badAnswer = "Mauvaise Réponse!";
let gameOver = "Temps écoulé! Merci d'avoir participé au jeu! :D";

let chrono = null;

function startTimer(){
    if(!chrono){
        chrono = setInterval(minuterie, 1000);
    }
}

function checkAnswer(userInput) {
  
  if (Number(userInput) === resultEquation) {
    score++;
    correctAnswer++;
  } else {
    score = 0;
    correctAnswer = 0;
    document.getElementById("msg-echec").innerText = badAnswer;
    setTimeout(function () { location.reload(); }, 2000); 
  }

  document.getElementById("score").innerText = "Nombre de points accumulé: " + score;

  startTimer();
  

  texturePlacement();
}

let secondes = 60;
let para = document.getElementById("timer");


function minuterie(){
    secondes--;
    para.innerHTML = secondes;
    if (secondes == 0){
        clearInterval(chrono);
        document.getElementById("msg-over").innerText = gameOver;
    }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------


function updateEquation() {
    const objectsListSection = sections[texturePosition];
    if (objectsListSection && objectsListSection.section) {
      const generateElement = objectsListSection.section;
      const addGenerateElem = objectsListSection.container;
      const updateSection = generateElement(textureSection[texturePosition]);
  
      addGenerateElem.removeChildren(); //Empêcher les textures de s'empiller
      addGenerateElem.addChild(updateSection.sprite);
  
      if (texturePosition === 0) {
        firstImage = updateSection;
      } else if (texturePosition === 1) {
        operation = updateSection;
      } else if (texturePosition === 2) {
        secondImage = updateSection;
      } else if (texturePosition === 3) {
        playerAnswer = updateSection;
      }
  
      calculateResult();
      chooseAnswer();
    }
  }
  

texturePlacement();

//---------------------------------------------------------------------------------------------------------------------------------------------------------------

// Gestion des touches du clavier

console.time("time")

document.addEventListener("keydown", (event) => {

    switch (event.key) {
        case "ArrowUp":
          if (sections[texturePosition]) {
            textureSection[texturePosition] = (textureSection[texturePosition] - 1 + sections[texturePosition].length) % sections[texturePosition].length;
          }
          updateEquation(); // Mettez à jour la section après avoir appuyé sur la touche
          break;
        case "ArrowDown":
          if (sections[texturePosition]) {
            textureSection[texturePosition] = (textureSection[texturePosition] + 1) % sections[texturePosition].length;
          }
          updateEquation();
          break;
        case "ArrowLeft":
          texturePosition = (texturePosition - 1 + 6) % 6;
          updateEquation();
          break;
        case "ArrowRight":
          texturePosition = (texturePosition + 1) % 6;
          updateEquation();
          break;
    }

});

console.timeEnd("time");
