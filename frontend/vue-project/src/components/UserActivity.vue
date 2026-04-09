<script setup>
import { ref, onMounted } from 'vue'

const results = ref([])
const loading = ref(false)
const error = ref('')

async function fetchResults() {
    try {
        loading.value = true
        error.value = ''

        const res = await fetch('http://localhost:3000/api/admin/results', {
            credentials: 'include'
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.message || 'Kunne ikke hente brugeraktivitet')
        }

        results.value = data
    } catch (err) {
        console.error(err)
        error.value = err.message
    } finally {
        loading.value = false
    }
}

function formatDate(date) {
    if (!date) return '—'
    return new Date(date).toLocaleString('da-DK')
}

function formatDuration(seconds) {
    if (seconds == null) return '—'

    const totalSeconds = Math.round(seconds)
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60

    return `${minutes}m ${remainingSeconds}s`
}

function formatScore(score, total) {
    if (score == null || total == null || total === 0) return '—'
    return `${Math.floor(score * 100) / 100}/${total}`
}

onMounted(() => {
    fetchResults()
})
</script>

<template>
    <section class="module-card">
        <div class="module-header">
            <div>
                <h2>Brugeraktivitet</h2>
                <p>Se hvem der tager hvilken quiz, hvornår, hvor længe og med hvilket resultat</p>
            </div>
        </div>

        <p v-if="loading">Henter brugeraktivitet...</p>
        <p v-else-if="error" class="error">{{ error }}</p>

        <table v-else class="data-table">
            <thead>
                <tr>
                    <th>Bruger</th>
                    <th>Quiz</th>
                    <th>Startet</th>
                    <th>Afsluttet</th>
                    <th>Varighed</th>
                    <th>Resultat</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="result in results" :key="`${result.username}-${result.quizId}-${result.timestamp}`">
                    <td>{{ result.username }}</td>
                    <td>{{ result.quizName }}</td>
                    <td>{{ formatDate(result.startTime) }}</td>
                    <td>{{ formatDate(result.endTime) }}</td>
                    <td>{{ formatDuration(result.durationsSeconds) }}</td>
                    <td>{{ formatScore(result.score, result.total) }}</td>
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

.error {
    color: #dc2626;
    font-weight: 500;
}
</style>