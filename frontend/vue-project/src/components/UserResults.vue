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
  {
    id: 2,
    name: "React Hooks",
    questions: 15,
    created: "2026-03-20",
    status: "Aktiv",
  },
  {
    id: 3,
    name: "CSS Flexbox & Grid",
    questions: 18,
    created: "2026-03-25",
    status: "Aktiv",
  },
  {
    id: 4,
    name: "TypeScript Typer",
    questions: 12,
    created: "2026-04-01",
    status: "Inaktiv",
  },
  {
    id: 5,
    name: "Node.js & Express",
    questions: 22,
    created: "2026-04-05",
    status: "Aktiv",
  },
];
</script>

<template>
  <section class="module-card">
    <!-- <div class="module-header">
      <div>
        <h2>Quiz Filer</h2>
        <p>Upload, administrer og slet quiz filer</p>
      </div>
      <div>
        <button class="action-btn" @click="showModal = true">
          Upload Quiz
        </button>
      </div>
    </div>

    <UploadQuizModal :isOpen="showModal" @close="showModal = false" />

    <table class="data-table">
      <thead>
        <tr>
          <th>Navn</th>
          <th>Spørgsmål</th>
          <th>Oprettet</th>
          <th>Status</th>
          <th>Handlinger</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="quiz in quizzes" :key="quiz.id">
          <td>{{ quiz.name }}</td>
          <td>{{ quiz.questions }} spørgsmål</td>
          <td>{{ quiz.created }}</td>
          <td>
            <span
              class="badge"
              :class="quiz.status === 'Aktiv' ? 'badge-green' : 'badge-gray'">
              {{ quiz.status }}
            </span>
          </td>
          <td class="actions">
            <button class="text-btn">Se</button>
            <button class="icon-btn delete">Slet</button>
          </td>
        </tr>
      </tbody>
    </table> -->
  </section>
</template>

<style scoped></style>
