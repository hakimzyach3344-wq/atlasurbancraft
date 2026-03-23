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
                            content: `You are Sara, a friendly, human customer support assistant for 'Atlas Urban Craft'. 
                            Make your replies very short, natural, and conversational (not robotic). Use emojis sparingly like a real person 😊.
                            Your goal is to be helpful and guide them to a purchase. If they ask about products, mention "I can help you choose the perfect bag or decor piece".
                            If a user asks a complex question, a specific order detail, or something outside your knowledge, tell them: 'Let me check with our team and get back to you shortly.'
                            Do not write long paragraphs. Keep it to 1-2 short sentences max.`
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
