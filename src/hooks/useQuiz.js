// src/hooks/useQuiz.js

import { useState } from 'react';
import { createMathProblems } from '../utils/mathUtils.js';

export function useQuiz() {
    const [problems, setProblems] = useState([]);
    const [result, setResult] = useState('');

    const generate = (digitA, digitB, operators) => {
        if (!operators || operators.length === 0) {
            alert('하나 이상의 연산을 선택하세요.');
            return;
        }

        const newProblems = createMathProblems(10, digitA, digitB, operators);
        setProblems(newProblems);
        setResult('');
    };

    const updateAnswer = (index, value) => {
        const updated = [...problems];
        updated[index].input = value;
        setProblems(updated);
    };

    const grade = () => {
        const incomplete = problems.some(p => p.input.trim() === '');
        if (incomplete) {
            setResult('아직 풀지 않은 문제가 있습니다.');
            return;
        }

        let correct = 0;
        const graded = problems.map(p => {
            const userAnswer = parseFloat(p.input);
            const isCorrect = userAnswer === p.answer;
            if (isCorrect) correct++;
            return { ...p, correct: isCorrect };
        });

        setProblems(graded);
        setResult(`총점: ${correct} / 10`);
    };

    return { problems, result, generate, updateAnswer, grade };
}