import { useEffect } from 'react';
import styles from './English.module.scss';
import { useEngQuiz } from '../hooks/useEngQuiz';
import { initVoiceSettings, speak, setCookie } from '../utils/EnglishUtils';
export default function English() {
    const {
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
        setSpeechRate
    } = useEngQuiz();

    useEffect(() => {
        initVoiceSettings();
    }, []);

    return (
        <div className={styles.container}>
            <h1>📘 랜덤 단어장</h1>

            <div className={styles.selectBox}>
                <label htmlFor="wordFileSelect" style={{ marginRight: '8px' }}>📁 단어 파일:</label>
                <select
                    id="wordFileSelect"
                    value={selectedFile}
                    onChange={e => setSelectedFile(e.target.value)}
                >
                    <option value="">선택하세요</option>
                    {files.map(f => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                </select>
            </div>

            <div className={styles.settingsBox}>
                <div className={styles.options}>
                    <label style={{ marginRight: '12px' }}>
                        <input type="checkbox" id="hideWord" onChange={handleCheckChange} /> 단어
                    </label>
                    <label style={{ marginRight: '12px' }}>
                        <input type="checkbox" id="hideReading" onChange={handleCheckChange} /> 리딩
                    </label>
                    <label style={{ marginRight: '12px' }}>
                        <input type="checkbox" id="hideMeaning" onChange={handleCheckChange} /> 의미
                    </label>
                </div>
            </div>

            <div className={styles.controls}>
                <button className={styles.btn} onClick={showRandomWord}>🎲 랜덤 단어</button>
                <button className={styles.btn} onClick={() => renderWords(true)}>🔀 리스트 랜덤</button>
            </div>

            <div className={styles.selectBox} style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="speechRateSelect" style={{ marginRight: '8px' }}>🔊 속도:</label>
                <select
                    id="speechRateSelect"
                    value={speechRate}
                    onChange={e => {
                        setSpeechRate(e.target.value);
                        setCookie('speechRate', e.target.value);
                    }}
                >
                    <option value="0.5">느림</option>
                    <option value="1">보통</option>
                    <option value="1.5">빠름</option>
                </select>
                <label htmlFor="voiceSelect" style={{ marginLeft: '12px', marginRight: '8px' }}>🗣️ 음성:</label>
                <select
                    id="voiceSelect"
                    style={{ marginLeft: '0' }}
                    defaultValue=""
                    onChange={e => setCookie('voiceName', e.target.value)}
                >
                    <option value="">음성 선택</option>
                </select>
            </div>

            <div className={styles.wordList}>
                {wordList.map((word, i) => (
                    <div key={i} className={styles.word}>
                        <div>
                            {hideTarget !== 'word' && <div>{word.word}</div>}
                            {hideTarget !== 'reading' && <div>[{word.reading}]</div>}
                            {hideTarget !== 'meaning' && <div>{word.meaning}</div>}
                        </div>
                        <button onClick={() => speak(word.word)}>🔊</button>
                    </div>
                ))}
            </div>

            {currentWord && (
                <div className={styles.popup} id="popup">
                    <div className={styles.popupContent}>
                        <div className={styles.popupClose} onClick={closePopup}>&times;</div>
                        <div id="popupWord" onClick={e => { e.stopPropagation(); revealPopupFull(); }}>
                            {showingFull || hideTarget !== 'word' ? currentWord.word : '?'}
                        </div>
                        <div id="popupReading" onClick={e => { e.stopPropagation(); revealPopupFull(); }}>
                            {showingFull ? `[${currentWord.reading}]` : ''}
                        </div>
                        <div id="popupMeaning" onClick={e => { e.stopPropagation(); revealPopupFull(); }}>
                            {showingFull || hideTarget !== 'meaning' ? currentWord.meaning : '?'}
                        </div>
                        <div className={styles.popupButtons}>
                            <button
                                className={styles.btn}
                                style={{ fontSize: '1.2rem', padding: '14px 28px', minWidth: '140px' }}
                                onClick={handleNextClick}
                            >
                                다음 ▶️
                            </button>
                            <button className={styles.btn} onClick={() => speak(currentWord.word)}>🔊</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}