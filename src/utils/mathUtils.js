// src/utils/mathUtils.js
export function createMathProblems(count, digitA, digitB, operators) {
    const problems = [];
    for (let i = 0; i < count; i++) {
        const a = generateDigitValue(digitA);
        const b = generateDigitValue(digitB);
        const op = operators[Math.floor(Math.random() * operators.length)];

        let first = a, second = b;
        if (op === '-' && a < b) {
            first = b;
            second = a;
        }

        const expr = `${first} ${op} ${second}`;
        const answer = eval(expr);

        problems.push({ expr, answer: Number(answer), input: '' });
    }
    return problems;
}

// 이미 존재해야 함
export function generateDigitValue(digit) {
    const d = digit === 'random' ? Math.floor(Math.random() * 4) + 1 : parseInt(digit);
    const min = d === 1 ? 1 : Math.pow(10, d - 1);
    const max = Math.pow(10, d) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
