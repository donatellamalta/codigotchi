// Collect from     doc ALL REFERENCES OF OBJECT WE'LL MANIPULATE

const mic = document.getElementById('mic');
const screen = document.getElementById('screen');
const panelData = document.getElementById('panel-data');

const commands = ['eat','dance','sleep']; //array to contain allowed commands

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recog = new SpeechRecognition();

function onStart(){
    console.log("Start listening...")
    panelData.classList.add('listening');
    recog.start(); //the API understands when we stop talking and stop itself automatically 
}

function onResult(event){
    const text = event.results[0][0].transcript;
    console.log(text);

    //check if there are commands in the text
    const action = commands.find(function(command) {
        return text.toLowerCase().includes(command);
    });

    //show thecorrect gif
    const actionClassname = 'codigotchi-screen_' + action;
    screen.classList.add(actionClassname);
    console.log('start action');

    //come back to initial state 
    panelData.classList.remove('listening');
    setTimeout(function(){
        screen.classList.remove(actionClassname);
        console.log('stop action');
    }, 2000); // the action is active for 2 sec

    
}

mic.addEventListener('click', onStart);
recog.addEventListener('result', onResult);
