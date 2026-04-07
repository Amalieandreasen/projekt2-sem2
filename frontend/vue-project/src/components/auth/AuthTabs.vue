<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

function setTab(tab) {
  emit('update:modelValue', tab)
}
</script>

<template>
  <div class="tabs">
    <button
      class="tab-button"
      :class="{ active: modelValue === 'login' }"
      @click="setTab('login')"
      type="button"
    >
      <span class="material-symbols-rounded">login</span>
      Log ind
    </button>

    <button
      class="tab-button"
      :class="{ active: modelValue === 'signup' }"
      @click="setTab('signup')"
      type="button"
    >
      <span class="material-symbols-rounded">person_add</span>
      Opret bruger
    </button>
  </div>
</template>

<style scoped>
.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
  background: var(--color-surface-dark);
  padding: var(--space-xs);
  border-radius: var(--radius-pill);
  box-shadow: var(--shadow-md);
}

.tab-button {
  border: none;
  background: transparent;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-pill);
  cursor: pointer;
  font-size: var(--text-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-black);
  transition: var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}

.tab-button:hover {
  background: var( --color-primary-hover);
  color: var(--color-white);
}

.tab-button.active {
  background: var(--color-white);
  color: var(--color-black);
}
</style>