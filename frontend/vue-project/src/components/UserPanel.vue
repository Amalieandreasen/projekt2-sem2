<script setup>
import { ref } from "vue";
import UserPanelTabs from "./UserPanelTabs.vue";
import UserStatsComponent from "./UserStatsComponent.vue";
import UserQuizzes from "./UserQuizzes.vue";
import UserResults from "./UserResults.vue";
import UserHeader from "./UserHeader.vue";

const activeTab = ref("userQuizzes");
const stats = [
  {
    label: "Quizzer taget",
    value: 6,
    icon: "trophy",
  },
  {
    label: "Gennemsnitlig Score",
    value: "82%",
    icon: "trending_up",
  },
  {
    label: "Total tid",
    value: 25,
    icon: "schedule",
  },
];
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
