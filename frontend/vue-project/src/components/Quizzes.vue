<script setup>
import { ref } from 'vue'
import UploadQuizModal from './UploadQuizModal.vue';
const showModal = ref(false)
const quizzes = [
    { id: 1, name: 'JavaScript Grundlæggende', questions: 20, created: '2026-03-15', status: 'Aktiv' },
    { id: 2, name: 'React Hooks', questions: 15, created: '2026-03-20', status: 'Aktiv' },
    { id: 3, name: 'CSS Flexbox & Grid', questions: 18, created: '2026-03-25', status: 'Aktiv' },
    { id: 4, name: 'TypeScript Typer', questions: 12, created: '2026-04-01', status: 'Inaktiv' },
    { id: 5, name: 'Node.js & Express', questions: 22, created: '2026-04-05', status: 'Aktiv' }
]
</script>

<template>
    <section class="module-card">
        <div class="module-header">
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
                        <span class="badge" :class="quiz.status === 'Aktiv' ? 'badge-green' : 'badge-gray'">
                            {{ quiz.status }}
                        </span>
                    </td>
                    <td class="actions">
                        <button class="text-btn">Se</button>
                        <button class="icon-btn delete">Slet</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
.module-card {
    margin-top: 20px;
    padding: 24px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 16px;
}

.module-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
}

.module-header h2 {
    margin: 0;
    font-size: 20px;
}

.module-header p {
    margin: 4px 0 0;
    color: #666;
}

.action-btn {
    border: none;
    background: #0b0b23;
    color: white;
    padding: 10px 16px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table th,
.data-table td {
    text-align: left;
    padding: 14px 10px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
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

.badge-gray {
    background: #f1f5f9;
    color: #475569;
}

.actions {
    display: flex;
    gap: 12px;
    align-items: center;
}

.text-btn,
.icon-btn {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
}

.delete {
    color: #dc2626;
}
</style>