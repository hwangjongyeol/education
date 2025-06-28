import { useState } from 'react';
import styles from './Math.module.scss';
import MainLayout from '../layouts/MainLayout';
import { useQuiz } from '../hooks/useQuiz';

export default function Math() {
    const [digitA, setDigitA] = useState('2');
    const [digitB, setDigitB] = useState('1');
    const [operators, setOperators] = useState(['+']);
    const { problems, result, generate, updateAnswer, grade } = useQuiz();

    return (
        <MainLayout>
            <div className={styles.container}>
                <h1>🧠 초등 수학 문제</h1>

                <div className={styles.box}>
                    <div className={styles.options}>
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
                        <button onClick={() => generate(digitA, digitB, operators)}>문제 생성</button>
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
                                    <td>{p.displayExpr}</td>
                                    <td>
                                        <input
                                            className={styles["input-type01"]}
                                            type="number"
                                            value={p.input}
                                            onChange={(e) => updateAnswer(i, e.target.value)}
                                        />
                                    </td>
                                    <td className={p.correct == null ? '' : p.correct ? styles.correct : styles.wrong}>
                                        {p.correct == null ? '' : p.correct ? '✅ 정답' : `❌ (${p.answer})`}
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