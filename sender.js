const appID = 'TODO';
var currentSession;
const namespace ="urn..."

document.getElementById("connectbtn").addEventListener('click', () => {
    initializeApiOnly();
});

document.getElementById('upBtn').addEventListener('click', () => {
    upKey();
})

document.getElementById('downBtn').addEventListener('click', () => {
    downKey();
})

document.getElementById('leftBtn').addEventListener('click', () => {
    leftKey();
})

document.getElementById('rightBtn').addEventListener('click', () => {
    rightKey();
})

function upKey() {
    currentIndex[currentSection] = (currentIndex[currentSection] - 1 + sections[currentSection].length) % sections[currentSection].length;
}

function downKey() {
    currentIndex[currentSection] = (currentIndex[currentSection] + 1) % sections[currentSection].length;
}

function leftKey() {
    currentSection = (currentSection - 1 + 6) % 6;
}

function rightKey() {
    currentSection = (currentSection + 1) % 6;
}

function onInitSuccess(){
    console.log('Chromecast init success');
}

function onError(error){
    console.log('Chromecast init error: ' + error);
}

function sessionListener(newSession){
    currentSession = newSession;
}

function initializeApiOnly(){
    const sessionRequest = new chrome.cast.sessionRequest(appID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiversListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

// Créer un objet JSON

function sendMessage(){

let message = {
    "zero": 0,
    "un": 1,
    "deux": 2,
    "trois": 3,
    "quatre": 4,
    "cinq": 5,
    "six": 6,
    "sept": 7,
    "huit": 8,
    "neuf": 9
};

message = JSON.stringify(message);

}


currentSession.sendMessage(namespace, message);


