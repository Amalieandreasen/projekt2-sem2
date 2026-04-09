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
    <h3 v-html="question.question"></h3>

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

.question-block h3 {
  margin: 0;
  font-size: 2rem;
  color: var(--color-text);
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