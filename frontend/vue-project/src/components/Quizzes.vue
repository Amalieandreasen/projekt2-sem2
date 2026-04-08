<script setup>
import { ref, onMounted } from 'vue'
import UploadQuizModal from './UploadQuizModal.vue'

const showModal = ref(false)
const quizzes = ref([])
const loading = ref(false)
const error = ref('')

async function fetchQuizzes() {
    try {
        loading.value = true
        error.value = ''

        const res = await fetch('http://localhost:3000/api/admin/quizzes', {
            credentials: 'include'
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.message || 'Kunne ikke hente quizzer')
        }

        quizzes.value = data
    } catch (err) {
        console.error(err)
        error.value = err.message
    } finally {
        loading.value = false
    }
}

function getQuestionCount(quiz) {
    return Array.isArray(quiz.questions) ? quiz.questions.length : 0
}

function handleQuizCreated(newQuiz) {
    quizzes.value.unshift(newQuiz)
}

function formatDate(date) {
    if (!date) return '—'
    return new Date(date).toLocaleString('da-DK')
}

async function deleteQuiz(quizId) {
    const confirmed = window.confirm('Er du sikker på, at du vil slette denne quiz?')
    if (!confirmed) return

    try {
        const res = await fetch(`http://localhost:3000/api/admin/quizzes/${quizId}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        const data = await res.json()

        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.message || 'Kunne ikke slette quizzen')
        }

        quizzes.value = quizzes.value.filter(q => q.id !== quizId)
    } catch (err) {
        console.error(err)
        alert('Fejl: ' + err.message)
    }
}

onMounted(() => {
    fetchQuizzes()
})
</script>

<template>
    <section class="module-card">
        <div class="module-header">
            <div>
                <h2>Quiz Filer</h2>
                <p>Upload, administrer og slet quiz filer</p>
            </div>

            <button class="action-btn" @click="showModal = true">
                Upload Quiz
            </button>
        </div>

        <p v-if="loading">Henter quizzer...</p>
        <p v-else-if="error" class="error">{{ error }}</p>

        <table v-else class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Navn</th>
                    <th>Antal spørgsmål</th>
                    <th>Oprettet</th>
                    <th>Handlinger</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="quiz in quizzes" :key="quiz.id">
                    <td>{{ quiz.id }}</td>
                    <td>{{ quiz.quizName }}</td>
                    <td>{{ getQuestionCount(quiz) }}</td>
                    <td>{{ quiz.createdAt }}</td>
                    <td class="actions">
                        <button class="text-btn">Rediger</button>
                        <button class="icon-btn delete" @click="deleteQuiz(quiz.id)">Slet</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <UploadQuizModal :isOpen="showModal" @close="showModal = false" @created="handleQuizCreated" />
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

.error {
    color: #dc2626;
    font-weight: 500;
}
</style>