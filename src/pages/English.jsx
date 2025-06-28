import React, { useState, useEffect } from 'react';
import styles from './English.module.scss';
import { useEngQuiz } from '../hooks/useEngQuiz';

function WordCard({ word, hideTargets, speak, globalHideChangeTrigger }) {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        setInput('');
        setResult('');
        setRevealed(false);
    }, [globalHideChangeTrigger]);

    const checkAnswer = () => {
        if (!hideTargets.word) return;
        const answer = input.trim().toLowerCase();
        if (answer === word.word.trim().toLowerCase()) {
            setResult('correct');
            setRevealed(true);
        } else {
            setResult('wrong');
            setRevealed(false);
        }
    };

    return (
        <div className={`${styles.word} ${styles[result]}`}>
            <div>
                <div className={hideTargets.word && !revealed ? styles.hidden : ''}>{word.word}</div>
                <div className={hideTargets.reading && !revealed ? styles.hidden : ''}>[{word.reading}]</div>
                <div className={hideTargets.meaning && !revealed ? styles.hidden : ''}>{word.meaning}</div>
            </div>
            <button className={styles.soundBtn} onClick={e => { e.stopPropagation(); speak(word.word); }}>🔊</button>
           {hideTargets.word &&
                <div className={styles.inputBox}>
                    <input
                        type="text"
                        value={input}
                        placeholder="정답 입력"
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') checkAnswer(); }}
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            }
            <button className={styles.viewButton} onClick={() => {if (hideTargets.word && input) checkAnswer();setRevealed(true);}}>🔍</button>

        </div>
    );
}

function RandomPopup({ visible, word, showingFull, setShowingFull, onClose, onNext, speak, last, popupHideWord }) {
    if (!visible) return null;
    if (!word) return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <div className={styles.popupClose} onClick={onClose}>&times;</div>
                <div>👏 모두 완료!<br />단어를 모두 보았습니다!</div>
                <button className={styles.btn} onClick={onClose}>닫기 ❌</button>
            </div>
        </div>
    );
    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <div className={styles.popupClose} onClick={onClose}>&times;</div>
                <div className={styles.popupBody} onClick={() => setShowingFull(true)}>
                    <div className={styles.popupWord}>
                        {showingFull ? word.word : (popupHideWord ? '?' : word.word)}
                    </div>
                    <div>
                        {showingFull ? `[${word.reading}]` : (popupHideWord ? `[${word.reading}]` : '')}
                    </div>
                    <div className={styles.popupMeaning}>
                        {showingFull ? word.meaning : (popupHideWord ? word.meaning : '?')}
                    </div>
                </div>
                <div className={styles.popupButtons}>
                    <button className={styles.btn} onClick={onNext}>{last ? '닫기 ❌' : '다음 ▶️'}</button>
                    <button className={styles.btn} onClick={() => speak(word.word)}>🔊 발음 듣기</button>
                </div>
            </div>
        </div>
    );
}

export default function English() {
    const quiz = useEngQuiz();
    const [popupVisible, setPopupVisible] = useState(false);
    const [randomMode, setRandomMode] = useState(false);
    const [listRandomWords, setListRandomWords] = useState([]);
    const [popupHideWord, setPopupHideWord] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(Date.now());

    // 팝업 랜덤 단어
    const handleShowRandom = () => {
        setPopupVisible(true);
        setRandomMode(false);
        // 단어/의미 중 랜덤으로 하나만 숨김
        setPopupHideWord(Math.random() < 0.5);
        quiz.showRandomWord();
    };

    /** 리스트 랜덤 보기 */
    const handleListRandom = () => {
        setRandomMode(true);
        setPopupVisible(false);
        setListRandomWords(quiz.getRandomWords());
        setResetTrigger(Date.now());
    };

    /** 체크 박스 히든 여부 이벤트 **/
    const handleCheckChange = e => {
        quiz.handleCheckChange(e);
        setResetTrigger(Date.now());  // 무조건 추가!
    };


    /** 원래 순서로 보기, 파일 바꿀 때도 */
    const handleShowOrigin = () => {
        setRandomMode(false);
        setResetTrigger(Date.now());
    };

    /** 단어 파일 교체 **/
    const handleFileSelect = (file) => {
        quiz.handleFileSelect(file);   // 기존 단어장 파일 바꾸는 로직
        setResetTrigger(Date.now());   // ★ 모든 카드 revealed 등 초기화!
    };

    /** 팝업 닫기 **/
    const handlePopupClose = () => {
        setPopupVisible(false);
        quiz.resetUnseen();
    };

    /** 팝업 다음 이벤트 **/
    const handlePopupNext = () => {
        if (!quiz.unseenWords.length) {
            handlePopupClose();
        } else {
            setPopupHideWord(Math.random() < 0.5);
            quiz.showRandomWord();
        }
    };

    return (
        <div className={styles.englishContainer}>
            <h1 className={styles.title}>📘 랜덤 단어장</h1>

            {/* 파일 선택 */}
            <div className={styles.centerBox}>
                <label>📁 단어 파일 선택: </label>
                <select value={quiz.selectedFile} onChange={e => handleFileSelect(e.target.value)}>
                    {quiz.files.map(file => {
                        const match = file.match(/^(\d{2})(\d{2})(\d{2})\.json$/);
                        const label = match
                            ? `20${match[1]}년 ${match[2]}월 ${match[3]}일`
                            : file;
                        return <option value={file} key={file}>{label}</option>;
                    })}
                </select>
            </div>

            {/* 옵션 체크 */}
            <div className={styles.settingsBox}>
                <label>
                    <input type="checkbox" id="hideWord"
                           checked={quiz.hideTargets.word}
                           onChange={handleCheckChange}
                    /> 단어
                </label>
                <label>
                    <input type="checkbox" id="hideReading"
                           checked={quiz.hideTargets.reading}
                           onChange={handleCheckChange}
                    /> 리딩
                </label>
                <label>
                    <input type="checkbox" id="hideMeaning"
                           checked={quiz.hideTargets.meaning}
                           onChange={handleCheckChange}
                    /> 의미
                </label>
            </div>

            {/* 컨트롤 버튼 */}
            <div className={styles.controls}>
                <button className={styles.btn} onClick={handleShowRandom}>🎲 랜덤 단어</button>
                <button className={styles.btn} onClick={handleListRandom}>🔀 리스트 랜덤</button>
                {randomMode &&
                    <button className={styles.btn} onClick={handleShowOrigin}>📝 초기화</button>
                }
            </div>

            {/* 음성 옵션 */}
            <div className={styles.centerBox}>
                <label>🔊 속도: </label>
                <select value={quiz.speechRate} onChange={e => quiz.handleRateChange(e.target.value)}>
                    <option value="0.5">느림</option>
                    <option value="1">보통</option>
                    <option value="1.5">빠름</option>
                </select>
                <label style={{ marginLeft: 20 }}>🗣️ 음성: </label>
                <select value={quiz.voiceName} onChange={e => quiz.handleVoiceChange(e.target.value)}>
                    {quiz.voices.map(v => (
                        <option value={v.name} key={v.name}>{v.name}</option>
                    ))}
                </select>
            </div>

            {/* 리스트 */}
            <div className={styles.wordList}>
                {(randomMode ? listRandomWords : quiz.wordList).map((word, idx) =>
                    <WordCard
                        word={word}
                        hideTargets={quiz.hideTargets}
                        speak={quiz.speak}
                        globalHideChangeTrigger={resetTrigger}
                        key={idx}
                    />
                )}
            </div>

            {/* 랜덤 팝업 */}
            <RandomPopup
                visible={popupVisible}
                word={quiz.currentWord}
                showingFull={quiz.showingFull}
                popupHideWord={popupHideWord}
                setShowingFull={quiz.setShowingFull}
                onClose={handlePopupClose}
                onNext={handlePopupNext}
                speak={quiz.speak}
                last={!quiz.unseenWords.length}
            />
        </div>
    );
}