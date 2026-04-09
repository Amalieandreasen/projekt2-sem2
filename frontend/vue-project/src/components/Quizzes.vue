<script setup>
import { ref, onMounted } from "vue";
import UploadQuizModal from "./UploadQuizModal.vue";
import QuizModal from "@/components/quiz/QuizModal.vue";

const API_URL = "http://localhost:3000";

const showModal = ref(false);
const showQuizModal = ref(false);
const quizSession = ref(null);

const quizzes = ref([]);
const loading = ref(false);
const quizLoading = ref(false);
const error = ref("");

async function fetchQuizzes() {
  try {
    loading.value = true;
    error.value = "";

    const res = await fetch(`${API_URL}/api/admin/quizzes`, {
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Kunne ikke hente quizzer");
    }

    quizzes.value = data;
  } catch (err) {
    console.error(err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

function getQuestionCount(quiz) {
  return Array.isArray(quiz.questions) ? quiz.questions.length : 0;
}

function handleQuizCreated(newQuiz) {
  quizzes.value.unshift(newQuiz);
}

function formatDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleString("da-DK");
}

async function deleteQuiz(quizId) {
  const confirmed = window.confirm(
    "Er du sikker på, at du vil slette denne quiz?",
  );
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_URL}/api/admin/quizzes/${quizId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Kunne ikke slette quizzen");
    }

    quizzes.value = quizzes.value.filter((q) => q.id !== quizId);
  } catch (err) {
    console.error(err);
    alert("Fejl: " + err.message);
  }
}

async function startQuiz(quiz) {
  try {
    quizLoading.value = true;
    error.value = "";

    const startRes = await fetch(`${API_URL}/api/quizzes/${quiz.id}/start`, {
      method: "POST",
      credentials: "include",
    });

    const startData = await startRes.json();

    if (!startRes.ok) {
      throw new Error(startData.message || "Kunne ikke starte quiz");
    }

    const questionRes = await fetch(
      `${API_URL}/api/quizzes/${quiz.id}/question`,
      {
        credentials: "include",
      },
    );

    const questionData = await questionRes.json();

    if (!questionRes.ok) {
      throw new Error(questionData.message || "Kunne ikke hente spørgsmål");
    }

    quizSession.value = {
      quiz: {
        quizId: quiz.id,
        quizName: quiz.quizName,
        difficulty: quiz.diff || quiz.difficulty || "—",
        numberOfQuestions: questionData.total,
      },
      question: questionData.question,
      index: questionData.index,
      total: questionData.total,
    };

    showQuizModal.value = true;
  } catch (err) {
    console.error(err);
    error.value = err.message;
  } finally {
    quizLoading.value = false;
  }
}

onMounted(() => {
  fetchQuizzes();
});
</script>

<template>
  <section class="module-card">
    <div class="module-header">
      <div>
        <h2>Quiz Filer</h2>
        <p>Upload, administrer og slet quiz filer</p>
      </div>

      <button class="action-btn" @click="showModal = true">Upload Quiz</button>
    </div>

    <p v-if="loading">Henter quizzer...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <table v-else class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Navn</th>
          <th>Antal spørgsmål</th>
          <th>Oprettet</th>
          <th>Handlinger</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="quiz in quizzes" :key="quiz.id">
          <td>{{ quiz.id }}</td>
          <td>{{ quiz.quizName }}</td>
          <td>{{ getQuestionCount(quiz) }}</td>
          <td>{{ formatDate(quiz.createdAt) }}</td>
          <td class="actions">
            <button
              class="text-btn start"
              :disabled="quizLoading"
              @click="startQuiz(quiz)">
              <span class="material-symbols-rounded">play_circle</span>
              {{ quizLoading ? "Starter..." : "Start quiz" }}
            </button>

            <button class="text-btn">
              <span class="material-symbols-rounded">edit_document</span>
            </button>

            <button class="icon-btn delete" @click="deleteQuiz(quiz.id)">
              <span class="material-symbols-rounded">delete</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <UploadQuizModal
      :isOpen="showModal"
      @close="showModal = false"
      @created="handleQuizCreated" />

    <QuizModal
      v-if="showQuizModal && quizSession"
      :session="quizSession"
      @close="showQuizModal = false" />
  </section>
</template>

<style scoped>
.module-card {
  margin-top: 20px;
  padding: 24px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 16px;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.module-header h2 {
  margin: 0;
  font-size: 20px;
}

.module-header p {
  margin: 4px 0 0;
  color: #666;
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

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  text-align: left;
  padding: 14px 10px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.text-btn,
.icon-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  align-items: center;
  display: flex;
  gap: 8px;
}

.start {
  color: #0b0b23;
  font-weight: 600;
}

.start:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.delete {
  color: #dc2626;
}

.error {
  color: #dc2626;
  font-weight: 500;
}
</style>
