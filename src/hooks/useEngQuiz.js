import { useState, useEffect, useCallback } from 'react';
import { fetchWordList, shuffle, getCookie, setCookie } from '../utils/EnglishUtils';

export function useEngQuiz() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [wordList, setWordList] = useState([]);
    const [unseenWords, setUnseenWords] = useState([]);
    const [currentWord, setCurrentWord] = useState(null);
    const [showingFull, setShowingFull] = useState(false);
    const [hideTargets, setHideTargets] = useState({ word: false, reading: false, meaning: false });
    const [speechRate, setSpeechRate] = useState(() => getCookie('speechRate') || '1');
    const [voiceName, setVoiceName] = useState(() => getCookie('voiceName') || '');
    const [voices, setVoices] = useState([]);
    const [randomWords, setRandomWords] = useState([]);

    // 파일 목록 불러오기
    useEffect(() => {
        fetch('date.json')
            .then(res => res.json())
            .then(list => {
                setFiles(list);
                const file = getCookie('selectedWordFile') || list[0];
                setSelectedFile(file);
            });
    }, []);

    // 단어 파일 변경 시
    useEffect(() => {
        if (!selectedFile) return;
        fetchWordList(selectedFile)
            .then(data => {
                setWordList(data);
                setUnseenWords([...data]);
            });
        setCookie('selectedWordFile', selectedFile);
    }, [selectedFile]);

    // 음성 목록 불러오기
    useEffect(() => {
        const loadVoices = () => {
            const all = window.speechSynthesis.getVoices();
            const engVoices = all.filter(v => v.lang.startsWith('en'));
            setVoices(engVoices);
        };
        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    // 체크박스 핸들러
    const handleCheckChange = useCallback((e) => {
        const { id, checked } = e.target;
        const key = id.replace('hide', '').toLowerCase();
        setHideTargets(prev => ({
            ...prev,
            [key]: checked,
        }));
    }, []);

    // 파일 선택 핸들러
    const handleFileSelect = (file) => setSelectedFile(file);

    // 음성 및 속도 변경
    const handleRateChange = (rate) => {
        setSpeechRate(rate);
        setCookie('speechRate', rate);
    };
    const handleVoiceChange = (name) => {
        setVoiceName(name);
        setCookie('voiceName', name);
    };

    // 발음
    const speak = (text) => {
        const utter = new window.SpeechSynthesisUtterance(text.trim());
        utter.lang = 'en-US';
        utter.rate = parseFloat(speechRate);
        const voice = voices.find(v => v.name === voiceName);
        if (voice) utter.voice = voice;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
    };

    // 랜덤 단어 팝업
    const showRandomWord = useCallback(() => {
        if (!unseenWords.length) return null;
        const randomIdx = Math.floor(Math.random() * unseenWords.length);
        const picked = unseenWords[randomIdx];
        setCurrentWord(picked);
        setUnseenWords(prev => prev.filter((_, i) => i !== randomIdx));
        setShowingFull(false);
        return picked;
    }, [unseenWords]);

    // 랜덤 단어 끝나면 unseen 초기화
    const resetUnseen = useCallback(() => {
        setUnseenWords([...wordList]);
    }, [wordList]);

    // 리스트 랜덤 보기(매번 새로 셔플)
    const getRandomWords = useCallback(() => {
        const shuffled = shuffle([...wordList]);
        setRandomWords(shuffled);
        return shuffled;
    }, [wordList]);

    return {
        files, selectedFile, handleFileSelect,
        wordList, unseenWords, currentWord, setCurrentWord,
        showRandomWord, resetUnseen, showingFull, setShowingFull,
        hideTargets, handleCheckChange,
        speechRate, handleRateChange,
        voiceName, handleVoiceChange,
        voices, speak,
        randomWords, getRandomWords
    };
}