import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.join(__dirname, "users.json");
const QUIZ_DIR = path.join(__dirname, "quizzes");
const RESULTS_FILE = path.join(__dirname, "results.json");

// læs brugere
export async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

// gemme data til brugere i users.json
export async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

// valider password
export function validatePassword(password) {
  const minLength = /.{8,}/;
  const hasUpper = /[A-Z]/;
  const hasNumber = /[0-9]/;
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    minLength.test(password) &&
    hasUpper.test(password) &&
    hasNumber.test(password) &&
    hasSpecial.test(password)
  );
}

// læs  quizzes
export async function readQuizzes() {
  try {
    const files = await fs.readdir(QUIZ_DIR);
    const quizzes = [];
    for (let file of files) {
      if (file.endsWith(".json")) {
        const data = await fs.readFile(path.join(QUIZ_DIR, file), "utf-8");
        const quiz = JSON.parse(data);
        quiz.id = Number(quiz.id);
        quizzes.push(quiz);
      }
    }
    return quizzes;
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

// gemmer quix som json fil
export async function writeQuiz(quiz) {
  const filePath = path.join(QUIZ_DIR, `${quiz.id}.json`);
  await fs.writeFile(filePath, JSON.stringify(quiz, null, 2));
}

// slet quiz
export async function deleteQuiz(id) {
  const filePath = path.join(QUIZ_DIR, `${id}.json`);
  try {
    await fs.unlink(filePath);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") return false;
    throw err;
  }
}

// læs resultater
export async function readResults() {
  try {
    const data = await fs.readFile(RESULTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

// gemmer hele listen af resultater i results.json
export async function writeResults(results) {
  await fs.writeFile(RESULTS_FILE, JSON.stringify(results, null, 2));
}

// tilføj resultater
export async function addResults(result) {
  const results = await readResults();
  results.push(result);
  await writeResults(results);
}

// shuffle array til randomizing af spørgsmål
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
