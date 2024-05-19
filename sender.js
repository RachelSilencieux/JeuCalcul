const appId = "TODO";
var currentSession;
var deltaPosition;
const deltaOffset = 5;
var deltaRotation = 0;
const NAMESPACE = "urn...";


function initializeApiOnly() {
   
    console.log("Chromecast API initialized");
}

// Fonctions pour générer des membres et des signes
function generateMember1() {
    const indice = Math.floor(Math.random() * 10);
    const cartes = ["zero.png", "un.png", "deux.png", "trois.png", "quatre.png", "cinq.png", "six.png", "sept.png", "huit.png", "neuf.png"];
    const membre1 = cartes[indice];
    return membre1;
}

function generateMember2() {
    const indice = Math.floor(Math.random() * 10);
    const cartes = ["zero.png", "un.png", "deux.png", "trois.png", "quatre.png", "cinq.png", "six.png", "sept.png", "huit.png", "neuf.png"];
    const membre2 = cartes[indice];
    return membre2;
}

function generateSign() {
    const numSign = Math.floor(Math.random() * 4);
    const signes = ["+", "-", "*", "/"];
    const signe = signes[numSign];
    return signe;
}


document.getElementById("downBtn").addEventListener('click', initializeApiOnly);
document.getElementById("rightBtn").addEventListener('click', generateMember2);
document.getElementById("upBtn").addEventListener('click', generateSign);
document.getElementById("leftBtn").addEventListener('click', generateMember1);

function sendCommand() {
    const message = { "zero": 0, "un": 1, "deux": 2, "trois": 3, "quatre": 4, "cinq": 5, "six": 6, "sept": 8, "neuf": 9 };
    const jsonMessage = JSON.stringify(message);
    // Envoie le message via la session courante
    if (currentSession) {
        currentSession.sendMessage(NAMESPACE, jsonMessage, onSuccess, onError);
    }
}


document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
  
    if (typeof playerBox !== 'undefined' && typeof boxWidth !== 'undefined' && typeof boxHeight !== 'undefined' && typeof renderer !== 'undefined') {
        switch (event.keyCode) {
            case 83: // S Key
            case 40: // Down arrow
                if (playerBox.position.y != renderer.height - boxHeight) {
                    playerBox.position.y += boxHeight;
                }
                break;
            case 87: // W Key
            case 38: // Up arrow
                if (playerBox.position.y != 0) {
                    playerBox.position.y -= boxHeight;
                }
                break;
            case 65: // A Key
            case 37: // Left arrow
                if (playerBox.position.x != 0) {
                    playerBox.position.x -= boxWidth;
                }
                break;
            case 68: // D Key
            case 39: // Right arrow
                if (playerBox.position.x != renderer.width - boxWidth) {
                    playerBox.position.x += boxWidth;
                }
                break;
        }
    } else {
        console.warn("Variables playerBox, boxWidth, boxHeight ou renderer non définies.");
    }
}


function onSuccess() {
    console.log("Message envoyé avec succès.");
}

function onError(error) {
    console.error("Erreur lors de l'envoi du message:", error);
}

function onInitSuccess() {
    console.log("Initialisation réussie.");
}

function receiverListener(availability) {
    if (availability === cast.framework.CastContextAvailability.AVAILABLE) {
        console.log("Receveur disponible.");
    } else {
        console.log("Receveur non disponible.");
    }
}


cast.framework.CastContext.getInstance().setOptions({
    receiverApplicationId: appId,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
});

cast.framework.CastContext.getInstance().addEventListener(
    cast.framework.CastContextEventType.CAST_STATE_CHANGED,
    function(event) {
        if (event.castState === cast.framework.CastState.CONNECTED) {
            console.log("CastState CONNECTED");
        }
    }
);
