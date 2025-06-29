/**
 * Create math problems with different modes.
 * @param {'basic'|'column'|'fraction'|'fraction2'} mode - Problem mode
 * @param {number} count
 * @param {string|number} digitA
 * @param {string|number} digitB
 * @param {string[]} operators
 * @param {number} [remainderOption] - For 'column' mode division: 0=exact, 1=one-digit remainder, 2=two-digit remainder (0~5)
 */
export function createMathProblems(
    mode = 'basic',
    count,
    digitA,
    digitB,
    operators,
    remainderOption = 0
) {
    const problems = [];
    const smallOp = (symbol) => `<span style="font-size: 0.9em;">${symbol}</span>`;

    function genBasicProblem(a, b, op) {
        let first = a, second = b;
        if (op === '-') {
            if (a < b) {
                first = b;
                second = a;
            }
        } else if (op === '/') {
            // 나눗셈 문제는 무조건 정수로 떨어지도록 생성
            second = b === 0 ? 1 : b;
            const multiplier = Math.floor(Math.random() * 9) + 1; // 1~9
            first = second * multiplier;
        }
        const expr = `${first} ${op} ${second}`;
        const answer = eval(expr);
        let opSymbol = op;
        if (op === '/') opSymbol = smallOp('÷');
        else if (op === '*') opSymbol = smallOp('×');
        else if (op === '+') opSymbol = smallOp('+');
        else if (op === '-') opSymbol = smallOp('-');

        return {
            expr,
            displayExpr: `${first} ${opSymbol} ${second}`,
            answer: parseFloat(answer.toFixed(2)),
            input: ''
        };
    }

    function genColumnProblem(a, b, op, remainderOption) {
        let first = a, second = b;
        let expr, answer, displayExpr;
        // For division, handle remainder options
        if (op === '/') {
            second = b === 0 ? 1 : b;
            first = a; // keep first as generated integer

            expr = `${first} / ${second}`;
            answer = first / second;
            // 세로형 나눗셈 표기 (짧고 중앙에 정렬된 구분선)
            displayExpr =
              `<table style="display:inline-table;vertical-align:middle;text-align:right;">
                 <tr><td style="padding:0 2px;">${first}</td></tr>
                 <tr><td style="padding:0 2px;">${smallOp('÷')} ${second}</td></tr>
                 <tr><td style="text-align:center;">
                   <div style="display:inline-block; border-top:1px solid #000; width: 40px; margin: 2px auto 0 auto;">&nbsp;</div>
                 </td></tr>
               </table>`;

            return {
                expr,
                displayExpr,
                answer: parseFloat(answer.toFixed(remainderOption)),
                remainder: 0,
                hasRemainder: false,
                input: ''
            };
        } else {
            if (op === '-') {
                if (a < b) {
                    first = b;
                    second = a;
                }
            }
            expr = `${first} ${op} ${second}`;
            answer = eval(expr);
            // 세로형 표기: 대수 문제를 세로로
            // 예:   45
            //    -  3
            //    ------
            let opSymbol = op;
            if (op === '/') opSymbol = smallOp('÷');
            else if (op === '*') opSymbol = smallOp('×');
            else if (op === '+') opSymbol = smallOp('+');
            else if (op === '-') opSymbol = smallOp('-');

            let displayExpr =
              `<table style="display:inline-table;vertical-align:middle;text-align:right;">
                <tr><td style="padding:0 2px;">${first}</td></tr>
                <tr><td style="padding:0 2px;">${opSymbol} ${second}</td></tr>
                <tr><td style="text-align:center;"><div style="display:inline-block; border-top:1px solid #000; width: 40px; margin: 2px auto 0 auto;">&nbsp;</div></td></tr>
              </table>`;
            return {
                expr,
                displayExpr,
                answer: Number(answer),
                input: ''
            };
        }
    }

    function genFractionProblem(equalDenominator = true) {
        // Generate two fractions: numerator/denominator op numerator/denominator
        // For equalDenominator: 분모 동일, for fraction2: 분모 배수
        let denA, denB, numA, numB, op;
        op = operators[Math.floor(Math.random() * operators.length)];
        if (equalDenominator) {
            denA = denB = Math.floor(Math.random() * 8) + 2; // 2~9
        } else {
            // 분모 배수: denB = denA * k, k=2~4
            denA = Math.floor(Math.random() * 6) + 2; // 2~7
            const k = Math.floor(Math.random() * 3) + 2; // 2~4
            denB = denA * k;
        }
        numA = Math.floor(Math.random() * denA) + 1;
        numB = Math.floor(Math.random() * denB) + 1;
        // Prevent improper fractions for now
        if (numA >= denA) numA = denA - 1;
        if (numB >= denB) numB = denB - 1;
        let expr = `${numA}/${denA} ${op} ${numB}/${denB}`;
        // HTML 표시: 분수
        function fracHTML(n, d) {
            return `<span style="display:inline-flex; flex-direction: column; align-items: center; justify-content: center; min-width: 24px;">
                <span style="border-bottom:1.5px solid #000; padding: 0 2px;">${n}</span>
                <span>${d}</span>
            </span>`;
        }
        let operatorSymbol = smallOp(
            op === '/' ? '÷' :
            op === '*' ? '×' :
            op === '+' ? '+' :
            op === '-' ? '-' : op
        );
        let displayExpr =
`<span style="display:inline-flex; align-items:center; justify-content:center; gap:6px;">
    <span style="display:inline-flex; flex-direction:column; align-items:center; justify-content:center; min-width:24px;">
        <span style="border-bottom:1.5px solid #000; padding:0 2px;">${numA}</span>
        <span>${denA}</span>
    </span>
    <span style="display:inline-flex; align-items:center; justify-content:center; padding:0 4px;">${operatorSymbol}</span>
    <span style="display:inline-flex; flex-direction:column; align-items:center; justify-content:center; min-width:24px;">
        <span style="border-bottom:1.5px solid #000; padding:0 2px;">${numB}</span>
        <span>${denB}</span>
    </span>
</span>`;
        // 계산
        let answer;
        if (op === '+') {
            if (denA === denB) {
                answer = `${numA + numB}/${denA}`;
            } else {
                answer = `${numA * denB + numB * denA}/${denA * denB}`;
            }
        } else if (op === '-') {
            if (denA === denB) {
                answer = `${numA - numB}/${denA}`;
            } else {
                answer = `${numA * denB - numB * denA}/${denA * denB}`;
            }
        } else if (op === '*') {
            answer = `${numA * numB}/${denA * denB}`;
        } else if (op === '/') {
            answer = `${numA * denB}/${denA * numB}`;
        }
        return {
            expr,
            displayExpr,
            answer,
            input: ''
        };
    }

    for (let i = 0; i < count; i++) {
        if (mode === 'basic') {
            const a = generateDigitValue(digitA);
            const b = generateDigitValue(digitB);
            const op = operators[Math.floor(Math.random() * operators.length)];
            problems.push(genBasicProblem(a, b, op));
        } else if (mode === 'column') {
            const a = generateDigitValue(digitA);
            const b = generateDigitValue(digitB);
            const op = operators[Math.floor(Math.random() * operators.length)];
            problems.push(genColumnProblem(a, b, op, remainderOption));
        } else if (mode === 'fraction') {
            problems.push(genFractionProblem(true));
        } else if (mode === 'fraction2') {
            problems.push(genFractionProblem(false));
        } else {
            // fallback to basic
            const a = generateDigitValue(digitA);
            const b = generateDigitValue(digitB);
            const op = operators[Math.floor(Math.random() * operators.length)];
            problems.push(genBasicProblem(a, b, op));
        }
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

/**
 * Parse user input answer string, allowing fractions like "a/b".
 * Returns a numeric value for comparison.
 *
 * @param {string} input - User input answer, possibly a fraction.
 * @returns {number} Parsed numeric answer.
 */
export function parseAnswerInput(input) {
    input = input.trim();
    if (input.includes('/')) {
        const [num, den] = input.split('/').map(Number);
        if (!isNaN(num) && !isNaN(den) && den !== 0) {
            return num / den;
        }
        // Could extend to handle invalid fraction input gracefully
    }
    return parseFloat(input);
}

/**
 * Checks user input against quotient and remainder if applicable.
 * User can input as "몫 r 나머지", e.g., "7 r 2".
 */
export function checkColumnDivisionAnswer(userInput, correctQuotient, correctRemainder, hasRemainder) {
    userInput = userInput.trim();
    if (!hasRemainder) {
        const userValue = parseAnswerInput(userInput);
        return Math.abs(userValue - correctQuotient) < 0.0001;
    }
    const [quotientPart, remainderPart] = userInput.split(/[rR]/).map(s => s.trim());
    const userQuotient = parseInt(quotientPart, 10);
    const userRemainder = parseInt(remainderPart, 10);
    return userQuotient === correctQuotient && userRemainder === correctRemainder;
}