let voices = [];

function loadVoices() {
    voices = speechSynthesis.getVoices();
}

function speakKorean(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";

    if (voices.length === 0) {
        loadVoices();
    }

    const koreanVoice = voices.find(voice => voice.lang.startsWith("ko"));
    if (koreanVoice) {
        utterance.voice = koreanVoice;
    }

    speechSynthesis.cancel();
    setTimeout(() => {
        speechSynthesis.speak(utterance);
    }, 200);
}

speechSynthesis.onvoiceschanged = loadVoices;

document.getElementById('main-content').addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON" && event.target.dataset.text) {
        speakKorean(event.target.dataset.text);
    }
});
