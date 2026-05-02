const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  console.log("User:", userMessage);

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message || error);
    res.status(500).json({ reply: "Groq API error" });
  }
});

app.listen(8000, () => console.log("Server running on port 8000"));