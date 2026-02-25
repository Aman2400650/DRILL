// backend/server.js

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Load questions from JSON
function loadQuestions(topic) {
  const raw = fs.readFileSync("questions.json");
  const data = JSON.parse(raw);
  return data[topic] || [];
}

// GET: fetch quiz questions
app.get("/api/quiz", (req, res) => {
  const topic = req.query.topic || "fire";
  const questions = loadQuestions(topic);

  if (!questions.length) {
    return res.json({
      ok: false,
      message: "No questions found for this topic."
    });
  }

  return res.json({
    ok: true,
    topic,
    questions
  });
});

// POST: save quiz result
app.post("/api/quiz/submit", (req, res) => {
  fs.appendFileSync("results.txt", JSON.stringify(req.body) + "\n");

  return res.json({
    ok: true,
    message: "Result saved successfully!"
  });
});

app.listen(PORT, () =>
  console.log(`🔥 Backend running at http://localhost:${PORT}`)
);
