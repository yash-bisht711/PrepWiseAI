const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const OpenAI =
  require("openai");

const gemini =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const openai =
  new OpenAI({
    apiKey:
      process.env.OPENAI_API_KEY,
  });

const geminiModel =
  gemini.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

const generateContent =
  async (prompt,provider = "auto") => {
    // 1️⃣ Try Gemini First
    try {
      console.log(
        "Using Gemini..."
      );

      const result =
        await geminiModel.generateContent(
          prompt
        );

      return result.response.text();
    } catch (geminiError) {
      console.error(
        "Gemini Failed:",
        geminiError.message
      );
    }

    // 2️⃣ Fallback to OpenAI
    try {
      console.log(
        "Using OpenAI..."
      );

      const response =
        await openai.chat.completions.create(
          {
            model:
              "gpt-4.1-mini",
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.7,
          }
        );

      return response.choices[0]
        .message.content;
    } catch (openAiError) {
      console.error(
        "OpenAI Failed:",
        openAiError.message
      );
    }

    throw new Error(
      "All AI Providers Failed"
    );
  };

module.exports = {
  generateContent,
};