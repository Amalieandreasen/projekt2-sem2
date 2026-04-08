<script setup>
import { ref } from "vue";

const quizzes = [
  {
    id: 1,
    name: "JavaScript Grundlæggende",
    questions: 20,
    created: "2026-03-15",
    status: "Aktiv",
  },
];
</script>

<template>
  <section class="results-module">
    <h3>Mine Tidligere Resultater</h3>
    <p>Se alle dine quiz forsøg og resultater</p>
    <div class="module-card" v-for="quiz in quizzes" :key="quiz.id">
      <h3>{{ quiz.name }}</h3>
      <div class="results-info-wrapper">
        <p class="results-info">
          <span class="material-symbols-rounded"> calendar_today </span>
          {{ quiz.created }}
        </p>
        <p class="results-info">
          <span class="material-symbols-rounded"> schedule </span>
          20 min
        </p>
        <p class="results-info">17/20 Korrekte</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.results-module {
  padding: 24px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 16px;
}
.module-card {
  margin-top: 20px;
  padding: 24px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.results-info-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-2xl);
}
.results-info {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}
</style>
