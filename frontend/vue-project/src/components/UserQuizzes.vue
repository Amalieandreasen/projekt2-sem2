<script setup>
<<<<<<< HEAD
import { ref, onMounted } from "vue";

const quizzes = ref([]);

onMounted(async () => {
  try {
    const [quizRes, resultRes] = await Promise.all([
      fetch("http://localhost:3000/api/quizzes", {
        method: "GET",
        credentials: "include",
      }),
      fetch("http://localhost:3000/api/results", {
        method: "GET",
        credentials: "include",
      }),
    ]);

    if (!quizRes.ok || !resultRes.ok) throw new Error("Kunne ikke hente data");

    const quizData = await quizRes.json();
    const resultsData = await resultRes.json();

    quizzes.value = quizData.map((q) => {
      const userResults = resultsData.filter((r) => r.quizId === q.quizId);
      const best = userResults.length
        ? Math.max(
            ...userResults.map((r) => Math.round((r.score / r.total) * 100)),
          )
        : 0;
      const trys = userResults.length;

      return {
        id: q.quizId,
        name: q.quizName,
        description: q.description,
        questions: q.questions,
        created: q.created,
        status: q.status,
        time: q.time,
        diff: q.diff,
        best,
        trys,
      };
    });
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <section class="module-card" v-for="quiz in quizzes" :key="quiz.id">
    <div class="card-left">
      <h2>{{ quiz.name }}</h2>
      <p>{{ quiz.description }}</p>
=======
import { ref } from "vue"
import QuizModal from "@/components/quiz/QuizModal.vue"

const API_URL = "http://localhost:3000"

const quizzes = [
  {
    id: 1,
    name: "JavaScript Grundlæggende",
    desciption:
      "Test din viden om JavaScript fundamentals, variabler, loops og funktioner",
    questions: 20,
    created: "2026-03-15",
    status: "Aktiv",
    time: 15,
    diff: "Begynder",
    best: 95,
    trys: 3,
  },
]

const showQuizModal = ref(false)
const quizSession = ref(null)
const loading = ref(false)
const error = ref("")

async function startQuiz(quiz) {
  try {
    loading.value = true
    error.value = ""

    const startRes = await fetch(`${API_URL}/api/quizzes/${quiz.id}/start`, {
      method: "POST",
      credentials: "include",
    })

    const startData = await startRes.json()

    if (!startRes.ok) {
      throw new Error(startData.message || "Kunne ikke starte quiz")
    }

    const res = await fetch(`${API_URL}/api/quizzes/${quiz.id}/question`, {
      credentials: "include",
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || "Kunne ikke hente spørgsmål")
    }

    quizSession.value = {
      quiz: {
        quizId: quiz.id,
        quizName: quiz.name,
        difficulty: quiz.diff,
        numberOfQuestions: data.total,
      },
      question: data.question,
      index: data.index,
      total: data.total,
    }

    showQuizModal.value = true
  } catch (err) {
    error.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <section
      class="module-card"
      v-for="quiz in quizzes"
      :key="quiz.id"
    >
      <div class="card-left">
        <h2>{{ quiz.name }}</h2>
        <p>{{ quiz.desciption }}</p>
>>>>>>> origin/main

        <div class="quiz-info">
          <span class="badge badge-green">
            {{ quiz.diff }}
          </span>
          <p>{{ quiz.time }} min</p>
          <p>{{ quiz.questions }} spørgsmål</p>
          <p>{{ quiz.trys }} forsøg</p>
        </div>
      </div>

      <div class="card-right">
        <span class="badge badge-green">
          Bedste: {{ quiz.best }} %
        </span>

        <button
          class="action-btn"
          :disabled="loading"
          @click="startQuiz(quiz)"
        >
          <span class="material-symbols-rounded">play_circle</span>
          {{ loading ? "Starter..." : "Start quiz" }}
        </button>
      </div>
    </section>

    <p v-if="error" class="error-text">{{ error }}</p>

    <QuizModal
      v-if="showQuizModal && quizSession"
      :session="quizSession"
      @close="showQuizModal = false"
    />
  </div>
</template>

<style scoped>
.module-card {
  margin-top: 20px;
  padding: 24px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
}

.quiz-info {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
}

.card-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.badge-green {
  background: #dcfce7;
  color: #166534;
}

.action-btn {
  border: none;
  background: #0b0b23;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  align-items: center;
  display: flex;
  gap: 8px;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-text {
  margin-top: 16px;
  color: red;
}
</style>