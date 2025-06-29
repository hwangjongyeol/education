/**
 * GPT 연동하여 초등학생 기준 수학 문제 풀이 설명을 가져오는 함수
 * 이제 직접 OpenAI에 호출하지 않고, /api/gpt-explain 로 안전하게 요청
 */

export async function fetchMathExplanation(problemText) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/gpt-explain`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: `다음 문제를 초등학생도 이해할 수 있도록 풀어줘:\n\n${problemText}`,
                model: "gpt-4o-preview",
                temperature: 0.2,
                max_tokens: 600
            })
        });

        if (!response.ok) {
            throw new Error(`GPT API 요청 실패: ${response.statusText}`);
        }

        const data = await response.json();
        return data.explanation || '⚠️ GPT 응답 파싱 실패';
    } catch (error) {
        console.error('GPT 연동 오류:', error);
        return '⚠️ GPT 서버와의 연결에 실패했습니다. 잠시 후 다시 시도해주세요.';
    }
}