<script setup>
defineProps({
    isOpen: Boolean
})

const emit = defineEmits(['close'])
</script>

<template>
    <div v-if="isOpen" class="overlay" @click.self="emit('close')">
        <div class="modal">
            <div class="modal-header">
                <div>
                    <h2>Upload Quiz Fil</h2>
                    <p>Upload en quiz fil i JSON format</p>
                </div>

                <button class="close-btn" @click="emit('close')">✕</button>
            </div>

            <div class="form">
                <label>Quiz Navn</label>
                <input placeholder="F.eks. JavaScript Avanceret" />

                <label>Quiz Fil</label>
                <input type="file" />

                <div class="info-box">
                    <strong>Quiz Format (JSON):</strong>
                    <ul>
                        <li>Single-choice, multiple-choice</li>
                        <li>HTML tags tilladt</li>
                        <li>Script tags fjernes automatisk</li>
                    </ul>
                </div>

                <button class="upload-btn">Upload Quiz</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    width: 420px;
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 20px;
}

.modal-header h2 {
    margin: 0;
    font-size: 18px;
}

.modal-header p {
    margin: 4px 0 0;
    font-size: 13px;
    color: #666;
}

.close-btn {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.info-box {
    background: #eef4ff;
    padding: 12px;
    border-radius: 10px;
    font-size: 13px;
}

.upload-btn {
    margin-top: 10px;
    background: #0b0b23;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
}
</style>