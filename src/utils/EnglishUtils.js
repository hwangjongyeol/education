export const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = parseFloat(getCookie('speechRate') || 1);
    const voiceName = getCookie('voiceName');
    if (voiceName) {
        const voice = speechSynthesis.getVoices().find(v => v.name === voiceName);
        if (voice) utterance.voice = voice;
    }
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
};

export const setCookie = (name, value, days = 7) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export const getCookie = (name) => {
    const match = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return match ? decodeURIComponent(match.pop()) : null;
};

export const shuffle = (array) => {
    return array.map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
};

export const fetchWordList = async (filename) => {
    const res = await fetch(`word/${filename}`);
    const data = await res.json();
    return data;
};

export const initVoiceSettings = () => {
    const voiceSelect = document.getElementById('voiceSelect');
    const savedName = getCookie('voiceName');
    const voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
    voiceSelect.innerHTML = '';
    voices.forEach(voice => {
        const opt = document.createElement('option');
        opt.value = voice.name;
        opt.textContent = voice.name;
        if (savedName === voice.name) {
            opt.selected = true;
        }
        voiceSelect.appendChild(opt);
    });

    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => initVoiceSettings();
    }
};