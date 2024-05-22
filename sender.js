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

    console.log('Receivers updated: ' + JSON.stringify(receivers));
}

function onMediaCommandSuccess() {
    console.log('Media command success');
}




function handleMessageFromSender(namespace, listener){
    chrome.runtime.onMessage.addListener((message) => {
        if (message.namespace === namespace) {
            listener(message);
            }
        });

        return;
    
}


// Function to initialize the Cast SDK
function initializeCastApi() {

    // Set up Cast SDK options
    const castOptions = new cast.framework.CastOptions();
    castOptions.receiverApplicationId = appID;

    // Initialize CastContext with the CastOptions
    const castContext = cast.framework.CastContext.getInstance();
    castContext.setOptions(castOptions);
    
    // Your existing event listener and button click handling code
    const castButton = document.getElementById('connectbtn');
    cast.framework.CastContext.getInstance().addEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        function(event) {
            switch (event.castState) {
                case cast.framework.CastState.NO_DEVICES_AVAILABLE:
                    castButton.disabled = true;
                    break;
                case cast.framework.CastState.NOT_CONNECTED:
                    castButton.disabled = false;
                    break;
                case cast.framework.CastState.CONNECTING:
                case cast.framework.CastState.CONNECTED:
                    castButton.disabled = true;
                    break;
            }
        }
    );

    // Add a click event listener to the Cast button
    castButton.addEventListener('click', function() {
        // Get the current Cast session
        const session = castContext.getCurrentSession();

        // Check if there is an active Cast session
        if (session) {
            // Already connected - do nothing or disconnect if needed
        } else {
            // Not connected - initiate a Cast session
            castContext.requestSession().then(
                function() {
                    // Handle successful connection
                    console.log('Connected to Chromecast');
                    initializeApiOnly();
                },
                function(errorCode) {
                    // Handle connection error
                    console.error('Error connecting to Chromecast: ' + errorCode);
                }
            );
        }
    });
}


function CastReceiverOptions(){
    this.appId = appID;
}

const options = new cast.framework.CastReceiverOptions();

function initializeApiOnly(){
    const sessionRequest = new chrome.cast.sessionRequest(appID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
    currentSession.sendMessage(CHANNEL, message);
    
   
}







