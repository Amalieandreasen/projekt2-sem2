<script setup>
import { ref } from "vue";
import PanelTabs from "./PanelTabs.vue";
import StatsComponent from "./StatsComponent.vue";
import UserQuizzes from "./UserQuizzes.vue";
import UserResults from "./UserResults.vue";

const activeTab = ref("userQuizzes");
const stats = [
  {
    label: "Quizzer taget",
    value: 6,
    icon: "📄",
  },
  {
    label: "Gennemsnitlig Score",
    value: "82%",
    icon: "📊",
  },
  {
    label: "Total tid",
    value: 25,
    icon: "👥",
  },
];
</script>

<template>
  <section class="user-panel">
    <StatsComponent :stats="stats" />
    <PanelTabs v-model="activeTab" />

    <UserQuizzes v-if="activeTab === 'userQuizzes'" />
    <UserResults v-else-if="activeTab === 'userResults'" />
  </section>
</template>

<style scoped>
.user-panel {
  padding: 20px;
}
</style>
