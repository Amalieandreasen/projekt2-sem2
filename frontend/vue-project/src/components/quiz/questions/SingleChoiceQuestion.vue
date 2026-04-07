<script setup>
defineProps({
  question: {
    type: Object,
    required: true
  },
  modelValue: {
    type: [String, null],
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

function selectOption(optionId) {
  emit('update:modelValue', optionId)
}
</script>

<template>
  <div class="question-block">
    <div class="question-top">
      <h3 v-html="question.questionHtml"></h3>
      <span class="type-badge">Single</span>
    </div>

    <div class="options">
      <label
        v-for="option in question.options"
        :key="option.optionId"
        class="option-card"
        :class="{ selected: modelValue === option.optionId }"
      >
        <input
          type="radio"
          :name="question.questionId"
          :checked="modelValue === option.optionId"
          @change="selectOption(option.optionId)"
        />
        <span class="option-text" v-html="option.textHtml"></span>
      </label>
    </div>
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

.options {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.option-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  cursor: pointer;
  transition: var(--transition-fast);
}

.option-card:hover {
  border-color: var(--color-focus);
  background: var(--color-surface-muted);
}

.option-card.selected {
  border-color: var(--color-focus);
  background: var(--color-primary-soft);
}

.option-text {
  color: var(--color-text);
}
</style>