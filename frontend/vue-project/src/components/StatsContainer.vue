<script setup>
import { ref, computed, onMounted } from "vue";
import StatsComponent from "./StatsComponent.vue";

const users = ref([]);
const quizzes = ref([]);
const loading = ref(false);
const error = ref("");

async function fetchStatsData() {
  try {
    loading.value = true;
    error.value = "";

    const [usersRes, quizzesRes] = await Promise.all([
      fetch("http://localhost:3000/api/admin/users", {
        credentials: "include",
      }),
      fetch("http://localhost:3000/api/admin/quizzes", {
        credentials: "include",
      }),
    ]);

    const usersData = await usersRes.json();
    const quizzesData = await quizzesRes.json();

    if (!usersRes.ok) {
      throw new Error(usersData.message || "Kunne ikke hente brugere");
    }

    if (!quizzesRes.ok) {
      throw new Error(quizzesData.message || "Kunne ikke hente quizzer");
    }

    users.value = usersData;
    quizzes.value = quizzesData;
  } catch (err) {
    console.error(err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

const stats = computed(() => [
  {
    label: "Totale Quizzer",
    value: quizzes.value.length,
    sub: "Quizzer i systemet",
    icon: "docs",
  },
  {
    label: "Totale Brugere",
    value: users.value.length,
    sub: "Brugere i systemet",
    icon: "group",
  },
  {
    label: "Aktive Moduler",
    value: 3,
    sub: "Admin sektioner",
    icon: "finance",
  },
]);

onMounted(() => {
  fetchStatsData();
});
</script>

<template>
  <p v-if="loading" class="message">Henter statistik...</p>
  <p v-else-if="error" class="error">{{ error }}</p>
  <StatsComponent v-else :stats="stats" />
</template>

<style scoped>
.message {
  padding: 0 24px;
  color: #666;
}

.error {
  padding: 0 24px;
  color: #dc2626;
  font-weight: 500;
}
</style>
