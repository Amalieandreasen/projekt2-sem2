import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import {
  readUsers,
  writeUsers,
  validatePassword,
  readQuizzes,
  writeQuiz,
  readResults,
  addResults,
  shuffleArray,
  deleteQuiz,
} from "./helperFunctions.js";
import { hashPassword, verifyPassword } from "./hash.js";
import { sanitizeQuestion } from "./sanitize.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

// middleware
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    },
  }),
);
app.use((req, res, next) => {
  if (!req.session.user) {
    req.session.user = {
      username: "test-user",
      role: "user",
    }
  }
  next()
})

// auth middleware
const requireAuth = (req, res, next) => {
  if (!req.session.user)
    return res.status(401).json({ message: "Not logged in" });
  next();
};

// admin middleware
const isAdmin = (req, res, next) => {
  if (!req.session.user)
    return res.status(401).json({ message: "not logged in" });

  if (req.session.user.role !== "admin")
    return res.status(403).json({ message: "You are not an admin" });

  next();
};

// routes
app.get("/", (req, res) => {
  res.send(`
    <h1>Secure Login Lab</h1>
    <ul>
      <li><a href="/index.html">Login</a></li>
      <li><a href="/profile.html">Profile</a> (requires login)</li>
      <li><a href="/debug/users">Debug: users</a></li>
    </ul>
  `);
});

// register endpoint
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  if (!validatePassword(password)) {
    return res.status(400).json({
      message:
        "Password skal være min. 8 tegn, indeholde et stort bogstav, et tal og et specialtegn",
    });
  }

  const users = await readUsers();

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashed = await hashPassword(password);

  const newUser = { username, password: hashed, role: "user" };
  users.push(newUser);

  await writeUsers(users);
  res.status(201).json({ message: "User created" });
});

// login endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Brugernavn og adgangskode påkrævet" });

  const users = await readUsers();
  const user = users.find((u) => u.username === username);

  if (!user)
    return res
      .status(401)
      .json({ message: "Forkert brugernavn eller adgangskode" });

  const valid = await verifyPassword(password, user.password);
  if (!valid)
    return res
      .status(401)
      .json({ message: "Forkert brugernavn eller adgangskode" });

  req.session.user = { username: user.username, role: user.role };

  res.json({
    message: "logged in",
    user: { username: user.username, role: user.role },
  });
});

// logout endpoint
app.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "logged out" });
});

// admin user endpoint (admin route)
app.get("/api/admin/users", requireAuth, isAdmin, async (req, res) => {
  const users = await readUsers();
  res.json(users);
});

// hent alle quizzer (admin route)
app.get("/api/admin/quizzes", requireAuth, isAdmin, async (req, res) => {
  const quizzes = await readQuizzes();
  res.json(quizzes);
});

// opret quiz (admin route)
app.post("/api/admin/quizzes", requireAuth, isAdmin, async (req, res) => {
  const quiz = req.body;

  if (!quiz.quizName || !quiz.questions)
    return res
      .status(400)
      .json({ message: "Quiz skal have navn og spørgsmål" });

  const quizzes = await readQuizzes();
  const maxId = quizzes.length
    ? Math.max(...quizzes.map((q) => Number(q.id) || 0))
    : 0;
  quiz.id = maxId + 1;

  const quizToWrite = { ...quiz, id: quiz.id };

  quizToWrite.questions = quiz.questions.map((q, index) => ({
    id: q.id || index + 1,
    type: q.type,
    question: q.question,
    options: q.options || [],
    answer: q.answer,
  }));

  await writeQuiz(quizToWrite);
  res.status(201).json({ message: "Quiz oprettet", quiz: quizToWrite });
});

// hent alle resultater (admin route)
app.get("/api/admin/results", requireAuth, isAdmin, async (req, res) => {
  try {
    const results = await readResults();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Kunne ikke hente resultater" });
  }
});

// delete (admin route)
app.delete("/api/admin/quizzes/:id", requireAuth, isAdmin, async (req, res) => {
  const quizId = parseInt(req.params.id);

  if (!quizId) {
    return res.status(400).json({ message: "Ugyldigt quiz ID" });
  }

  const deleted = await deleteQuiz(quizId);

  if (!deleted) {
    return res.status(404).json({ message: "Quiz ikke fundet" });
  }

  res.json({ message: "Quiz slettet", id: quizId });
});

// hent quiz til bruger
app.get("/api/quizzes/:id", async (req, res) => {
  const quizId = parseInt(req.params.id);
  const quizzes = await readQuizzes();

  const quiz = quizzes.find((q) => Number(q.id) === quizId);

  if (!quiz) return res.status(404).json({ message: "Quiz ikke fundet" });

  quiz.questions = quiz.questions.map((q, index) => ({
    id: q.id ?? index,
    ...q,
  }));

  if (!req.session.quizSessions) req.session.quizSessions = {};
  req.session.quizSessions[quizId] = {
    startTime: new Date().toISOString(),
  };

  let sanitizedQuestions = quiz.questions.map((q) => {
    const { answer, ...rest } = q;
    return sanitizeQuestion(rest);
  });

  sanitizedQuestions = shuffleArray(sanitizedQuestions).map((q) => {
    if (q.options) q.options = shuffleArray(q.options);
    return q;
  });

  res.json({
    quizId: quiz.id,
    quizName: quiz.quizName,
    questions: sanitizedQuestions,
  });
});

// start quiz
app.post("/api/quizzes/:id/start", async (req, res) => {
  const quizId = parseInt(req.params.id);
  const quizzes = await readQuizzes();
  const quiz = quizzes.find((q) => Number(q.id) === quizId);
  if (!quiz) return res.status(404).json({ message: "Quiz ikke fundet" });

  let questions = shuffleArray(quiz.questions).map((q) => {
    if (!q.options) return q;

    const originalOptions = [...q.options];

    const shuffledOptions = shuffleArray([...q.options]);

    // 🔥 remap answers
    const newAnswer = q.answer.map((originalIndex) => {
      const correctValue = originalOptions[originalIndex];
      return shuffledOptions.findIndex(opt => opt === correctValue);
    });

    return {
      ...q,
      options: shuffledOptions,
      answer: newAnswer,
    };
  });

  if (!req.session.quizSessions) req.session.quizSessions = {};
  req.session.quizSessions[quizId] = {
    startTime: new Date().toISOString(),
    questions,
    currentIndex: 0,
    answers: [],
    score: 0,
  };

  res.json({
    message: "Quiz started",
    startTime: req.session.quizSessions[quizId].startTime,
  });
});

// hent næste spørgsmål
app.get("/api/quizzes/:id/question", (req, res) => {
  const quizId = parseInt(req.params.id);
  const sessionQuiz = req.session.quizSessions?.[quizId];

  if (!sessionQuiz)
    return res.status(400).json({ message: "Quiz ikke startet" });

  const question = sessionQuiz.questions[sessionQuiz.currentIndex];

  const { answer, ...safeQuestion } = question;

  console.log("RAW QUESTION:", JSON.stringify(safeQuestion, null, 2));

  const sanitized = sanitizeQuestion(safeQuestion);

  console.log("SANITIZED QUESTION:", JSON.stringify(sanitized, null, 2));

  res.json({
    question: sanitized,
    index: sessionQuiz.currentIndex,
    total: sessionQuiz.questions.length,
  });
});
// submitte alle svar (sidste step)
app.post("/api/quizzes/:id/submit", async (req, res) => {
  const quizId = parseInt(req.params.id);
  const sessionQuiz = req.session.quizSessions?.[quizId];

  if (!sessionQuiz) {
    return res.status(400).json({ message: "Quiz ikke startet" });
  }

  const quizzes = await readQuizzes();
  const quiz = quizzes.find((q) => Number(q.id) === quizId);

  if (!quiz) {
    return res.status(404).json({ message: "Quiz ikke fundet" });
  }

  const startTime = sessionQuiz.startTime;
  const endTime = new Date().toISOString();

  let durationsSeconds = null;
  if (startTime) {
    durationsSeconds = (new Date(endTime) - new Date(startTime)) / 1000;
  }

  const result = {
    username: req.session.user.username,
    role: req.session.user.role,
    quizId: quiz.id,
    quizName: quiz.quizName,
    score: sessionQuiz.score,
    total: sessionQuiz.questions.length,
    answers: sessionQuiz.answers,
    startTime,
    endTime,
    durationsSeconds,
    timestamp: endTime,
  };

  if (req.session.user.role !== "admin") {
    await addResults(result);
  }

  delete req.session.quizSessions[quizId];

  res.json({
    message: "Quiz submitted",
    result,
    saved: req.session.user.role !== "admin",
  });
});

//sende svar til enkelt spørgsmål
app.post("/api/quizzes/:id/answer", (req, res) => {
  const quizId = parseInt(req.params.id);
  const { answer } = req.body;

  const sessionQuiz = req.session.quizSessions?.[quizId];
  if (!sessionQuiz)
    return res.status(400).json({ message: "Quiz ikke startet" });

  const question = sessionQuiz.questions[sessionQuiz.currentIndex];

  let isCorrect = false;
  let questionScore = 0;

  if (question.type === "single") {
    isCorrect = question.answer[0] === answer[0];
    questionScore = isCorrect ? 1 : 0;
  } else if (question.type === "multiple") {
    const correct = question.answer;
    const selected = answer || [];

    const correctSelected = selected.filter((s) => correct.includes(s)).length;
    const incorrectSelected = selected.filter(
      (s) => !correct.includes(s),
    ).length;

    questionScore = Math.max(
      0,
      (correctSelected - incorrectSelected) / correct.length,
    );
    isCorrect = questionScore === 1;
  } else if (question.type === "cloze") {
    isCorrect = question.answer.includes(answer?.trim());
    questionScore = isCorrect ? 1 : 0;
  }

  sessionQuiz.score += questionScore;

  sessionQuiz.answers.push({
    questionId: question.id,
    isCorrect,
    score: questionScore,
  });

  res.json({
    correct: isCorrect,
    score: questionScore,
  });
});

// gå til næste spørgsmål
app.post("/api/quizzes/:id/next", (req, res) => {
  const quizId = parseInt(req.params.id);
  const sessionQuiz = req.session.quizSessions?.[quizId];

  if (!sessionQuiz)
    return res.status(400).json({ message: "Quiz ikke startet" });

  sessionQuiz.currentIndex++;

  res.json({ message: "Next question" });
});

// hente tidligere resultater
app.get("/api/results", async (req, res) => {
  const results = await readResults();
  const userResults = results.filter(
    (r) => r.username === req.session.user.username,
  );
  res.json(userResults);
});

// fallback endpoint
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

// start server
app.listen(PORT, () => {
  console.log(`Serveren kører på http://localhost:${PORT}`);
});
