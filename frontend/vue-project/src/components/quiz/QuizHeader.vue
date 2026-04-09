<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    default: "",
  },
  currentIndex: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
})

defineEmits(["close"])
</script>

<template>
  <div class="quiz-header">
    <div class="quiz-header-text">
      <h2>{{ title }}</h2>
      <p>
        Spørgsmål {{ currentIndex + 1 }} af {{ totalQuestions }}
        <span v-if="difficulty">• {{ difficulty }}</span>
      </p>
    </div>

    <button class="close-button" type="button" @click="$emit('close')">
      <span class="material-symbols-rounded">close</span>
    </button>
  </div>
</template>

<style scoped>
.quiz-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.quiz-header-text h2 {
  margin: 0 0 var(--space-xs);
  font-size: var(--text-xl);
  color: var(--color-text);
}

.quiz-header-text p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--text-md);
}

.close-button {
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: var(--transition-fast);
  flex-shrink: 0;
}

.close-button:hover {
  background: var(--color-surface-muted);
  color: var(--color-text);
}
</style>