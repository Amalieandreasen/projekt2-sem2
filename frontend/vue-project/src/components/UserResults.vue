<script setup>
import { ref, onMounted } from "vue";

const results = ref([]);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/results", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Kunne ikke hente resultater");

    const data = await res.json();
    results.value = data;
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <section class="results-module">
    <h3>Mine Tidligere Resultater</h3>
    <p>Se alle dine quiz forsøg og resultater</p>
    <div class="module-card" v-for="quiz in results" :key="quiz.quizId">
      <h3>{{ quiz.quizName }}</h3>
      <div class="results-info-wrapper">
        <p class="results-info">
          <span class="material-symbols-rounded"> calendar_today </span>
          {{ quiz.timestamp.slice(0, 10) }}
        </p>
        <p class="results-info">
          <span class="material-symbols-rounded"> schedule </span>
          {{
            quiz.durationsSeconds ? Math.round(quiz.durationsSeconds / 60) : 0
          }}
          min
        </p>
        <p class="results-info">{{ quiz.score }}/{{ quiz.total }} Korrekte</p>
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
