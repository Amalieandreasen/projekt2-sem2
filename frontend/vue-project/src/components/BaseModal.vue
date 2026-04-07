<script setup>
defineProps({
    isOpen: Boolean,
    title: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '420px'
    }
})

const emit = defineEmits(['close'])
</script>

<template>
    <div v-if="isOpen" class="overlay" @click.self="emit('close')">
        <div class="modal" :style="{ width }">
            <div class="modal-header">
                <div>
                    <h2>{{ title }}</h2>
                    <p v-if="subtitle">{{ subtitle }}</p>
                </div>

                <button class="close-btn" @click="emit('close')">✕</button>
            </div>

            <div class="modal-body">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background: white;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;
}

.modal-header h2 {
    margin: 0;
    font-size: 24px;
}

.modal-header p {
    margin: 4px 0 0;
    font-size: 14px;
    color: #6b7280;
}

.close-btn {
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
    color: #6b7280;
}

.modal-body {
    display: flex;
    flex-direction: column;
}
</style>