function record(callback = () => {
}) {
    let noteContent = '';
    try {
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
    } catch (e) {
        console.error(e);
    }
    recognition.continuous = true;


    recognition.onstart = async () => {
        console.log('Speak Now');
    };

    recognition.onspeechend = async () => {
        console.log('Didnt get that')
    };

    recognition.onerror = async (event) => {
        if (event.error === 'no-speech') {
            console.log('Didnt Get That');
        }
    };
    recognition.onresult = (event) => {
        let current = event.resultIndex, transcript = event.results[current][0].transcript;
        let mobileRepeatBug = (current === 1 && transcript === event.results[0][0].transcript);
        if (!mobileRepeatBug) {
            noteContent += transcript;
            callback(noteContent);
        }
    };


    return recognition;
}

export default record;
