<template>
    <div class="admin-tabs">
        <button v-for="tab in tabs" :key="tab.value" class="tab-button" :class="{ active: modelValue === tab.value }"
            @click="$emit('update:modelValue', tab.value)">
            {{ tab.label }}
        </button>
    </div>
</template>

<script setup>
defineProps({
    modelValue: {
        type: String,
        default: 'quizzes'
    }
})

defineEmits(['update:modelValue'])

const tabs = [
    { label: 'Quiz Administration', value: 'quizzes' },
    { label: 'Brugeraktivitet', value: 'activity' },
    { label: 'Brugere', value: 'users' }
]
</script>

<style scoped>
.admin-tabs {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
    background: #f3f4f6;
    border-radius: 999px;
}

.tab-button {
    border: none;
    background: transparent;
    color: #374151;
    font-size: 13px;
    font-weight: 500;
    padding: 8px 14px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.tab-button:hover {
    background: #e5e7eb;
}

.tab-button.active {
    background: white;
    color: #111827;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>