<script setup>
import { ref } from "vue"
import QuizModal from "@/components/quiz/QuizModal.vue"

// 👇 senere skal disse komme fra backend
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

// 👇 state til modal
const API_URL = "http://localhost:3000"
const showQuizModal = ref(false)
const quizSession = ref(null)
const loading = ref(false)
const error = ref("")

// 🚀 START QUIZ
async function startQuiz(quiz) {
  try {
    loading.value = true
    error.value = ""

    // START QUIZ
    await fetch(`${API_URL}/api/quizzes/${quiz.id}/start`, {
      method: "POST",
      credentials: "include",
    })

    // GET QUESTION
    const res = await fetch(`${API_URL}/api/quizzes/${quiz.id}/question`, {
      credentials: "include",
    })

    if (!res.ok) throw new Error("Kunne ikke hente spørgsmål")

    const data = await res.json()
    console.log("QUESTION DATA:", JSON.stringify(data.question, null, 2))

    // 3. opret session til modal
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

    // 4. åbn modal
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

    <!-- ERROR -->
    <p v-if="error" class="error-text">{{ error }}</p>

    <!-- QUIZ MODAL -->
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