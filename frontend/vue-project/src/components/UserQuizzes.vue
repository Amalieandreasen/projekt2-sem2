<script setup>
import { ref } from "vue";

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
];
</script>

<template>
  <section class="module-card" v-for="quiz in quizzes" :key="quiz.id">
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
      <span class="badge badge-green">Bedste: {{ quiz.best }} %</span>
      <button>Start quiz</button>
    </div>
  </section>
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
</style>
