<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'

defineProps({
    isOpen: Boolean
})

const emit = defineEmits(['close'])

const quizName = ref('')
const selectedFile = ref(null)

function handleFileChange(event) {
    selectedFile.value = event.target.files[0] || null
}

function handleSubmit() {
    console.log('Upload quiz:', {
        quizName: quizName.value,
        file: selectedFile.value
    })
}
</script>

<template>
    <BaseModal :isOpen="isOpen" title="Upload Quiz Fil" subtitle="Upload en quiz fil i JSON format" width="460px"
        @close="emit('close')">
        <div class="form-group">
            <label>Quiz Navn</label>
            <input v-model="quizName" type="text" placeholder="F.eks. JavaScript Avanceret" />
        </div>

        <div class="form-group">
            <label>Quiz Fil</label>
            <input type="file" @change="handleFileChange" />
        </div>

        <div class="info-box">
            <strong>Quiz Format (JSON):</strong>
            <ul>
                <li>Spørgsmålstyper: single-choice, multiple-choice</li>
                <li>Simple HTML-tags kan tillades</li>
                <li>Scripts fjernes automatisk</li>
            </ul>
        </div>

        <button class="primary-btn" @click="handleSubmit">Upload Quiz</button>
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
</style>