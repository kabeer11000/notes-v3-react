try {
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
} catch (e) {
    console.error(e);
    document.querySelector('.no-browser-support').classList.add('d-block');
}
