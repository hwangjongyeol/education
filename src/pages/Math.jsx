import { useState } from 'react';
import styles from './Math.module.scss';
import MainLayout from '../layouts/MainLayout';
import { useQuiz } from '../hooks/useQuiz';

export default function Math() {
    const [mode, setMode] = useState('사칙연산');
    const [digitA, setDigitA] = useState('2');
    const [digitB, setDigitB] = useState('1');
    const [operators, setOperators] = useState(['+']);
    const [remainderOption, setRemainderOption] = useState('0');
    const [remainderLimit, setRemainderLimit] = useState('5');
    const { problems, result, generate, updateAnswer, grade } = useQuiz();

    return (
        <MainLayout>
            <div className={styles.container}>
                <h1>🧠 초등 수학 문제</h1>

                <div className={styles.box}>
                    <div className={styles.options}>

                        <div className={styles.group}>
                            <label>상위 옵션 선택 UI:</label>
                            <select value={mode} onChange={e => setMode(e.target.value)}>
                                <option value="사칙연산">사칙연산</option>
                                <option value="사칙연산2 (세로형)">사칙연산2 (세로형)</option>
                                <option value="분수">분수</option>
                                <option value="분수2">분수2</option>
                            </select>
                        </div>

                        <div className={styles.group}>
                            {['+', '-', '*', '/'].map(op => (
                                <label key={op}>
                                    <input
                                        className={styles["checkbox-type01"]}
                                        type="checkbox"
                                        value={op}
                                        checked={operators.includes(op)}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setOperators(prev =>
                                                prev.includes(value)
                                                    ? prev.filter(o => o !== value)
                                                    : [...prev, value]
                                            );
                                        }}
                                    />
                                    {op === '+' ? '➕' :
                                        op === '-' ? '➖' :
                                            op === '*' ? '✖️' :
                                                '➗'}
                                </label>
                            ))}
                        </div>

                        {operators.includes('/') && (
                            <div className={styles.group}>
                                <label>나머지 옵션:</label>
                                <select value={remainderOption} onChange={e => setRemainderOption(e.target.value)}>
                                    <option value="0">0</option>
                                    <option value="1">0.0</option>
                                    <option value="2">0.00</option>
                                    <option value="3">0.000</option>
                                </select>
                                {remainderOption !== '0' && (
                                    <label style={{ marginLeft: '12px' }}>
                                        0~5 제한값 설정:
                                        <input
                                            type="number"
                                            min="0"
                                            max="3"
                                            value={remainderLimit}
                                            onChange={e => setRemainderLimit(e.target.value)}
                                            style={{ width: '40px', marginLeft: '6px' }}
                                        />
                                    </label>
                                )}
                            </div>
                        )}

                        <div className={styles.group}>
                            <label>
                                자릿수:
                                <select value={digitA} onChange={e => setDigitA(e.target.value)}>
                                    <option value="random">랜덤</option>
                                    <option value="1">1자리</option>
                                    <option value="2">2자리</option>
                                    <option value="3">3자리</option>
                                    <option value="4">4자리</option>
                                </select>
                            </label>
                            <label>
                                <select value={digitB} onChange={e => setDigitB(e.target.value)}>
                                    <option value="random">랜덤</option>
                                    <option value="1">1자리</option>
                                    <option value="2">2자리</option>
                                    <option value="3">3자리</option>
                                    <option value="4">4자리</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button onClick={() => {
                            const mappedMode = mode === '사칙연산' ? 'basic' :
                                               mode.includes('세로형') ? 'column' :
                                               mode === '분수' ? 'fraction' :
                                               mode === '분수2' ? 'fraction2' : 'basic';
                            generate(mappedMode, digitA, digitB, operators, Number(remainderOption), Number(remainderLimit));
                        }}>문제 생성</button>
                    </div>
                </div>

                <div className={styles.box}>
                    <div className="table-container">
                        <table>
                            <thead>
                            <tr>
                                <th style={{ width: '10%' }}>번호</th>
                                <th style={{ width: '45%' }}>문제</th>
                                <th style={{ width: '30%' }}>답 입력</th>
                                <th style={{ width: '15%' }}>채점</th>
                            </tr>
                            </thead>
                            <tbody>
                            {problems.map((p, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td dangerouslySetInnerHTML={{ __html: p.displayExpr }}></td>
                                    <td>
                                        <input
                                            className={styles["input-type01"]}
                                            type="number"
                                            value={p.input}
                                            onChange={(e) => updateAnswer(i, e.target.value)}
                                        />
                                    </td>
                                    <td className={p.correct == null ? '' : p.correct ? styles.correct : styles.wrong}>
                                        {p.correct == null ? '' : p.correct ? '✅ 정답' : `❌`}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '16px'}}>
                        <button onClick={grade}>채점하기</button>
                    </div>
                    <div id="result" className={styles.result}>{result}</div>
                </div>


            </div>
        </MainLayout>
    );
}
//<td className={p.correct == null ? '' : p.correct ? styles.correct : styles.wrong}>
//                                         {p.correct == null ? '' : p.correct ? '✅ 정답' : `❌ (${p.answer})`}
//                                     </td>