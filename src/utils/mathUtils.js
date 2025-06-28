export function createMathProblems(count, digitA, digitB, operators) {
    const problems = [];
    for (let i = 0; i < count; i++) {
        const a = generateDigitValue(digitA);
        const b = generateDigitValue(digitB);
        const op = operators[Math.floor(Math.random() * operators.length)];

        let first = a, second = b;

        if (op === '-') {
            if (a < b) {
                first = b;
                second = a;
            }
        } else if (op === '/') {
            // 나눗셈 문제는 무조건 정수로 떨어지도록 생성
            second = b === 0 ? 1 : b; // 0 나눔 방지
            const multiplier = Math.floor(Math.random() * 9) + 1; // 1 ~ 9
            first = second * multiplier;
        }

        const expr = `${first} ${op} ${second}`;
        const displayExpr = op === '/' ? `${first} ➗ ${second}` : expr; // 화면 표시용
        const answer = eval(expr);

        problems.push({
            expr,          // 내부 연산용
            displayExpr,   // 화면 표시용
            answer: Number(answer),
            input: ''
        });
    }
    return problems;
}

export function generateDigitValue(digit) {
    if (!digit) {
        console.error('generateDigitValue: digit 값이 유효하지 않음', digit);
        digit = '1'; // 기본값
    }

    const d = digit === 'random' ? Math.floor(Math.random() * 4) + 1 : parseInt(digit);
    const min = d === 1 ? 1 : Math.pow(10, d - 1);
    const max = Math.pow(10, d) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}