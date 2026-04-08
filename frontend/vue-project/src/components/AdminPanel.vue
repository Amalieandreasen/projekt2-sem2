<script setup>
import { ref } from 'vue'
import PanelTabs from './PanelTabs.vue'
import StatsContainer from './StatsContainer.vue'
import Quizzes from './Quizzes.vue'
import UserActivity from './UserActivity.vue'
import UserModule from './UserModule.vue'
import Header from './Header.vue'

const activeTab = ref('quizzes')

</script>

<template>
    <Header />
    <section class="admin-panel">
        <StatsContainer />
        <PanelTabs v-model="activeTab" />

    <Quizzes v-if="activeTab === 'quizzes'" />
    <UserActivity v-else-if="activeTab === 'activity'" />
    <UserModule v-else-if="activeTab === 'users'" />
  </section>
</template>

<style scoped>
.admin-panel {
  padding: 20px;
}
</style>
