const appID = '252FAB2A';
var currentSession;
const CHANNEL = 'urn:x-cast:testChannel';


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

const context = cast.framework.CastReceiverContext.getInstance();
context.addCustomMessageListener(CHANNEL, handleMessageFromSender);
context.start(new cast.framework.CastReceiverOptions());

function handleMessageFromSender(message){
    const sender = {namespace: 'sender',data: message};
    const message = JSON.stringify(sender);
    currentSession.sendMessage(CHANNEL, message);
    
}

function onInitSuccess(){
    console.log('Chromecast init success');
}

function onError(error){
    console.log('Chromecast init error: ' + error);
}

function sessionListener(newSession){
    currentSession = newSession;

    if(currentSession){
        const sender = {namespace: 'sender',data: 'message from receiver'};
        const message = JSON.stringify(sender);
        currentSession.sendMessage(CHANNEL, message);

        currentSession.addCustomMessageListener(CHANNEL, handleMessageFromSender);
    } 
}




function receiverListener(availability) {
    if (availability === chrome.cast.ReceiverAvailability.AVAILABLE) {
        document.getElementById('connectbtn').style.display = 'block';
    } 

    console.log('Receivers updated: ', availability);
}

function onMediaCommandSuccess() {
    console.log('Media command success');
}

function initializeApiOnly(){
    const sessionRequest = new chrome.cast.sessionRequest(appID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
    currentSession.sendMessage(CHANNEL, message);
    
   
}







