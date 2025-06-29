import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    console.log("===== GPT API DEBUG =====");
    console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
    console.log("Request Body:", req.body);
    console.log("==========================");

    try {
        const { prompt, model, temperature, max_tokens } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: '프롬프트가 제공되지 않았습니다.' });
        }

        const completion = await openai.chat.completions.create({
            model: model || "gpt-4o-preview",
            messages: [{ role: "user", content: prompt }],
            temperature: temperature ?? 0.2,
            max_tokens: max_tokens ?? 600,
        });

        const explanation = completion.choices[0].message.content;

        res.status(200).json({ explanation });
    } catch (error) {
        console.error("GPT 연동 오류:", error);
        res.status(500).json({ error: "GPT API 호출 실패", details: error.message });
    }
}