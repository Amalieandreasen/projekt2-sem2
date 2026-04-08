<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'

defineProps({
    isOpen: Boolean
})

const emit = defineEmits(['close', 'created'])

const quizName = ref('')
const selectedFile = ref(null)
const error = ref('')
const loading = ref(false)

function handleFileChange(event) {
    selectedFile.value = event.target.files[0] || null
}

function resetForm() {
    quizName.value = ''
    selectedFile.value = null
    error.value = ''
    loading.value = false
}

function closeModal() {
    resetForm()
    emit('close')
}

async function handleSubmit() {
    try {
        error.value = ''

        if (!quizName.value.trim()) {
            throw new Error('Du skal angive et quiznavn')
        }

        if (!selectedFile.value) {
            throw new Error('Du skal vælge en JSON-fil')
        }

        loading.value = true

        const fileText = await selectedFile.value.text()
        const parsedJson = JSON.parse(fileText)

        let questions = []

        if (Array.isArray(parsedJson)) {
            questions = parsedJson
        } else if (Array.isArray(parsedJson.questions)) {
            questions = parsedJson.questions
        } else {
            throw new Error('JSON-filen skal være et array eller indeholde et questions-array')
        }

        const payload = {
            quizName: quizName.value.trim(),
            questions
        }

        const res = await fetch('http://localhost:3000/api/admin/quizzes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(payload)
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.message || 'Kunne ikke oprette quiz')
        }

        emit('created', data.quiz)
        closeModal()
    } catch (err) {
        console.error(err)
        error.value = err.message
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <BaseModal :isOpen="isOpen" title="Upload Quiz Fil" subtitle="Upload en quiz fil i JSON format" width="460px"
        @close="closeModal">
        <div class="form-group">
            <label>Quiz Navn</label>
            <input v-model="quizName" type="text" placeholder="F.eks. JavaScript Avanceret" />
        </div>

        <div class="form-group">
            <label>Quiz Fil</label>
            <input type="file" accept=".json,application/json" @change="handleFileChange" />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <div class="info-box">
            <strong>Quiz Format (JSON):</strong>
            <ul>
                <li>Filen kan være et array af spørgsmål</li>
                <li>Eller et objekt med <code>questions</code></li>
                <li>Spørgsmål bør have type, question, options og answer</li>
            </ul>
        </div>

        <button class="primary-btn" :disabled="loading" @click="handleSubmit">
            {{ loading ? 'Uploader...' : 'Upload Quiz' }}
        </button>
    </BaseModal>
</template>

<style scoped>
.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 14px;
}

label {
    font-size: 14px;
    font-weight: 600;
}

input {
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
}

.info-box {
    margin-bottom: 16px;
    padding: 12px;
    border-radius: 10px;
    background: #eef4ff;
    font-size: 13px;
}

.primary-btn {
    width: 100%;
    border: none;
    background: #020617;
    color: white;
    padding: 12px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
}

.primary-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.error {
    color: #dc2626;
    font-weight: 500;
    margin-bottom: 12px;
}
</style>