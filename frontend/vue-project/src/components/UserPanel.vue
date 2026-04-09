<script setup>
import { ref, onMounted } from "vue";
import UserPanelTabs from "./UserPanelTabs.vue";
import UserStatsComponent from "./UserStatsComponent.vue";
import UserQuizzes from "./UserQuizzes.vue";
import UserResults from "./UserResults.vue";
import UserHeader from "./UserHeader.vue";

const activeTab = ref("userQuizzes");
const stats = ref([
  { label: "Quizzer taget", value: 0, icon: "trophy" },
  { label: "Gennemsnitlig Score", value: "0%", icon: "trending_up" },
  { label: "Total tid", value: 0, icon: "schedule" },
]);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/results", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Kunne ikke hente resultater");

    const results = await res.json();
    const totalQuizzes = results.length;

    const avgScore =
      totalQuizzes > 0
        ? Math.round(
            (results.reduce((sum, r) => sum + r.score / r.total, 0) /
              totalQuizzes) *
              100,
          )
        : 0;

    const totalTime = results.reduce(
      (sum, r) => sum + (r.durationsSeconds || 0),
      0,
    );

    stats.value = [
      { label: "Quizzer taget", value: totalQuizzes, icon: "trophy" },
      {
        label: "Gennemsnitlig Score",
        value: avgScore + "%",
        icon: "trending_up",
      },
      {
        label: "Total tid",
        value: Math.round(totalTime / 60),
        icon: "schedule",
      },
    ];
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <UserHeader />
  <section class="user-panel">
    <UserStatsComponent :stats="stats" />
    <UserPanelTabs v-model="activeTab" />

    <UserQuizzes v-if="activeTab === 'userQuizzes'" />
    <UserResults v-else-if="activeTab === 'userResults'" />
  </section>
</template>

<style scoped>
.user-panel {
  padding: 20px;
}
</style>
