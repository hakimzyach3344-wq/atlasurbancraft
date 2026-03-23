const { OpenAI } = require('openai');

function setupAI() {
    let openai = null;

    if (process.env.OPENAI_API_KEY) {
        openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }

    return {
        generateReply: async (userMessage) => {
            if (!openai) {
                return "Thank you for reaching out! Sara will get back to you shortly 😊";
            }

            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: `You are Sara, a friendly human customer support assistant for 'Atlas Urban Craft'. 
                            Make your replies very short, natural, and conversational. Use emojis sparingly 😊.
                            Your goal is to be helpful and guide them to a purchase. Mention "I can help you choose the perfect bag or decor piece".
                            Max 1-2 short sentences. No robot talk.`
                        },
                        { role: "user", content: userMessage }
                    ],
                    max_tokens: 150,
                    temperature: 0.7,
                });
                return completion.choices[0].message.content;
            } catch (error) {
                console.error("AI Error:", error);
                return "Sara here! Let me check with our team and get back to you shortly.";
            }
        }
    };
}

module.exports = setupAI;
