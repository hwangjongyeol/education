import { useState, useEffect } from 'react';
import { fetchWordList, shuffle, getCookie, setCookie } from '../utils/EnglishUtils';

export function useEngQuiz() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [wordList, setWordList] = useState([]);
    const [unseenWords, setUnseenWords] = useState([]);
    let [currentWord, setCurrentWord] = useState(null);
    const [showingFull, setShowingFull] = useState(false);
    const [hideTarget, setHideTarget] = useState('word'); // 초기값 'word' 또는 'meaning'
    const [speechRate, setSpeechRate] = useState(() => getCookie('speechRate') || '1');
    const [answeredWords, setAnsweredWords] = useState({}); // 추가: 각 단어의 정답 여부 상태

    const handleCheckChange = (e) => {
        const { id, checked } = e.target;
        if (checked) {
            setHideTarget(id.replace('hide', '').toLowerCase());
        } else {
            setHideTarget('');
        }
    };

    useEffect(() => {
        fetch('date.json')
            .then(res => res.json())
            .then(list => {
                const formatted = list.map(f => ({
                    value: f,
                    label: formatLabel(f),
                }));
                setFiles(formatted);

                const saved = getCookie('selectedWordFile') || list[0];
                setSelectedFile(saved);
                loadWordsFromFile(saved);
            });
    }, []);

    useEffect(() => {
        if (selectedFile) {
            setCookie('selectedWordFile', selectedFile);
            loadWordsFromFile(selectedFile);
        }
    }, [selectedFile]);

    const formatLabel = (f) => {
        const match = f.match(/^(\d{2})(\d{2})(\d{2})\.json$/);
        if (!match) return f;
        const [, yy, mm, dd] = match;
        return `20${yy}년 ${mm}월 ${dd}일`;
    };

    const loadWordsFromFile = async (filename) => {
        const data = await fetchWordList(filename);
        setWordList(data);
        setUnseenWords([...data]);
        setAnsweredWords({}); // 파일 로드 시 정답 상태 초기화
    };

    const renderWords = (randomize = false) => {
        const list = randomize ? shuffle([...wordList]) : wordList;
        setWordList(list);
        setAnsweredWords({}); // 랜덤 보기 시 정답 상태 초기화
    };

    const showRandomWord = () => {
        if (unseenWords.length === 0) {
            setCurrentWord(null);
            return;
        }

        const copy = [...unseenWords];
        const i = Math.floor(Math.random() * copy.length);
        const w = copy.splice(i, 1)[0];

        setUnseenWords(copy);
        setCurrentWord(w);
        setShowingFull(false);

        const target = Math.random() < 0.5 ? 'word' : 'meaning';
        setHideTarget(target); // ✅ 숨길 대상 설정
    };

    const handleNextClick = () => {
        if (unseenWords.length === 0) {
            setCurrentWord(null);
            setUnseenWords([...wordList]);
        } else {
            showRandomWord();
        }
    };

    const revealPopupFull = () => {
        setShowingFull(true);
    };

    const closePopup = () => {
        setCurrentWord(null);
    };

    // 추가: 사용자가 입력한 답안을 체크하고 상태를 갱신
    const checkAnswer = (index, userInput) => {
        const correctAnswer = wordList[index].word.trim().toLowerCase();
        const isCorrect = userInput.trim().toLowerCase() === correctAnswer;

        setAnsweredWords(prev => ({
            ...prev,
            [index]: isCorrect ? 'correct' : 'wrong'
        }));

        return isCorrect;
    };

    return {
        files,
        selectedFile,
        setSelectedFile,
        wordList,
        unseenWords,
        currentWord,
        showingFull,
        handleCheckChange,
        renderWords,
        showRandomWord,
        handleNextClick,
        revealPopupFull,
        closePopup,
        hideTarget,
        speechRate,
        setSpeechRate,
        answeredWords,
        checkAnswer, // 반환
    };
}