const appID = "252FAB2A";
var currentSession;
const CHANNEL = "urn:x-cast:testChannel";

document.getElementById("connectbtn").addEventListener("click", () => {
  initializeApiOnly();
});

document.getElementById("upBtn").addEventListener("click", () => {
//   upKey();
});

document.getElementById("downBtn").addEventListener("click", () => {
//   downKey();
});

document.getElementById("leftBtn").addEventListener("click", () => {
//   leftKey();
});

document.getElementById("rightBtn").addEventListener("click", () => {
//   rightKey();
});


function sessionListener(newSession){
    currentSession = newSession;
}

function receiverListener(availability) {
    if (availability === chrome.cast.ReceiverAvailability.AVAILABLE) {
        document.getElementById('connectbtn').style.display = 'block';
    } 
}

function onInitSuccess() {
    console.log('Chromecast init success');
}

function onError(error) {
    console.error('Chromecast initialization error', error);
}

function onMediaCommandSuccess() {
    console.log('Media command success');
}

function initializeApiOnly(){
    const sessionRequest = new chrome.cast.SessionRequest(appID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function sendMessage(){
    let message = {"type": "startSession", "session": currentSession};
    message = JSON.stringify(message);
    if (currentSession) {
        currentSession.sendMessage(CHANNEL, message); 
    } else {
        alert("Attends. Tu vas un peu trop vite!")
    }
}





