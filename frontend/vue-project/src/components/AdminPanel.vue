<script setup>
import { ref } from 'vue'
import PanelTabs from './PanelTabs.vue'
import Quizzes from './Quizzes.vue'
import UserActivity from './UserActivity.vue'
import UserModule from './UserModule.vue'
import Header from './Header.vue'
import StatsComponent from './StatsComponent.vue'

const activeTab = ref('quizzes')
const stats = [
    {
        label: 'Totale Quizzer',
        value: 5,
        sub: '4 aktive',
        icon: '📄'
    },
    {
        label: 'Totale Brugere',
        value: 25,
        sub: '142 quiz forsøg',
        icon: '👥'
    },
    {
        label: 'Gennemsnitlig Score',
        value: '82%',
        sub: '94% gennemførsel',
        icon: '📊'
    }
]
</script>

<template>
    <Header />
    <section class="admin-panel">
        <StatsComponent :stats="stats" />
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