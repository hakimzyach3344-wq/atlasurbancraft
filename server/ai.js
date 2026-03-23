const { OpenAI } = require('openai');

function setupAI() {
    let openai = null;

    if (process.env.OPENAI_API_KEY) {
        try {
            openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY
            });
        } catch (e) {
            console.error("Failed to init OpenAI:", e);
        }
    } else {
        console.warn("⚠️ OPENAI_API_KEY not found in environment variables. Falling back to default responses.");
    }

    return {
        generateReply: async (userMessage) => {
            if (!openai) {
                return "Thank you for reaching out! Let me check with our team and get back to you shortly.";
            }

            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: `You are a friendly, human-like customer support assistant for 'Atlas Urban Craft', an upscale e-commerce store specializing in high-end handmade Moroccan decor like brass sinks, copper lighting, and premium artisanal goods. 
                            Your goal is to answer questions concisely, professionally, and naturally. If a user asks a complex question, a specific order detail, or something outside your knowledge, tell them: 'Let me check with our team and get back to you shortly.'
                            Do not write long paragraphs.`
                        },
                        { role: "user", content: userMessage }
                    ],
                    max_tokens: 150,
                    temperature: 0.7,
                });
                return completion.choices[0].message.content;
            } catch (error) {
                console.error("AI Error generating reply:", error);
                return "Thank you for your message. Let me check with our team and get back to you shortly.";
            }
        }
    };
}

module.exports = setupAI;
