<script setup>
defineProps({
  question: {
    type: Object,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="question-block">
    <div class="question-top">
      <h3 v-html="question.questionHtml"></h3>
      <span class="type-badge">Cloze</span>
    </div>

    <input
      class="cloze-input"
      type="text"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      placeholder="Skriv dit svar her"
    />
  </div>
</template>

<style scoped>
.question-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.question-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.question-top h3 {
  margin: 0;
  font-size: 2rem;
  color: var(--color-text);
}

.type-badge {
  background: var(--color-surface-muted);
  color: var(--color-text);
  border-radius: var(--radius-pill);
  padding: 6px 12px;
  font-size: var(--text-sm);
  white-space: nowrap;
}

.cloze-input {
  width: 100%;
  padding: var(--input-padding-y) var(--input-padding-x);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--text-lg);
  outline: none;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.cloze-input:focus {
  border-color: var(--color-focus);
  box-shadow: 0 0 0 4px var(--color-focus-ring);
}
</style>