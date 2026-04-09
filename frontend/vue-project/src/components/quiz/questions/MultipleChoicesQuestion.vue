<script setup>
const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["update:modelValue"])

function toggleOption(index) {
  const updated = [...props.modelValue]

  if (updated.includes(index)) {
    emit("update:modelValue", updated.filter((i) => i !== index))
    return
  }

  updated.push(index)
  emit("update:modelValue", updated)
}
</script>

<template>
  <div class="question-block">
    <h3 v-html="question.question"></h3>

    <div v-if="question.options?.length" class="options">
      <label
        v-for="(option, index) in question.options"
        :key="index"
        class="option-card"
      >
        <input
          type="checkbox"
          :checked="modelValue.includes(index)"
          @change="toggleOption(index)"
        />
        <span v-html="option"></span>
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

.question-block h3 {
  margin: 0;
  font-size: 2rem;
  color: var(--color-text);
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

.option-card input {
  margin: 0;
}
</style>