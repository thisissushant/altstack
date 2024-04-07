const express = require("express");
const app = express();

const question = require("./question.json");
const port = 4000;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/question", (req, res) => {
  res.json(question);
});
app.post("/submit-answers", (req, res) => {
  const userAnswers = req.body.answers;
  let score = 0;

  question.forEach((question, index) => {
    if (userAnswers[index] !== undefined) {
      const correctAnswerIndex = parseInt(question.answer.split(")")[0]) - 1;
      if (userAnswers[index] === correctAnswerIndex) {
        score++;
      }
    }
  });

  res.json({ score: score, totalQuestions: question.length });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
