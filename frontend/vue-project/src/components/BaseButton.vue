<script setup>
defineProps({
  variant: {
    type: String,
    default: 'solid'
  },
  color: {
    type: String,
    default: 'primary'
  },
  width: {
    type: String,
    default: '100%' // fx "200px" eller "fit-content"
  },
  disabled: Boolean,
  type: {
    type: String,
    default: 'button'
  }
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['btn', variant, color]"
    :style="{ width }"
    >
    <!-- ICON LEFT -->
    <span v-if="$slots.iconLeft" class="icon">
      <slot name="iconLeft" />
    </span>

    <!-- TEXT -->
    <span class="content">
      <slot />
    </span>

    <!-- ICON RIGHT -->
    <span v-if="$slots.iconRight" class="icon">
      <slot name="iconRight" />
    </span>
  </button>
</template>

<style scoped>
/* BASE */
.btn {
  border-radius: var(--btn-radius);
  padding: var(--btn-padding-y) var(--btn-padding-x);
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--btn-gap);
  transition: var(--transition-fast);
  border: none;
}

/* TEXT + ICON */
.content {
  display: flex;
  align-items: center;
}

.icon {
  display: flex;
  align-items: center;
}

/* ===================== */
/* VARIANTS */
/* ===================== */

.solid {
  color: var(--color-white);
}

.outline {
  background: var(--color-white);
  border: 1px solid;
}

/* ===================== */
/* COLORS - SOLID */
/* ===================== */

.solid.primary {
  background: var(--color-primary);
}

.solid.primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.solid.success {
  background: var(--color-success);
}

.solid.success:hover:not(:disabled) {
  background: var(--color-success-hover);
}

.solid.danger {
  background: var(--color-danger);
}

.solid.danger:hover:not(:disabled) {
  background: var(--color-danger-hover);
}

.solid.gray {
  background: var(--color-text-muted);
}

.solid.gray:hover:not(:disabled) {
  background: var(--color-text-label);
}

/* ===================== */
/* COLORS - OUTLINE */
/* ===================== */

.outline.primary {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.outline.primary:hover:not(:disabled) {
  background: var(--color-primary-soft);
}

.outline.success {
  color: var(--color-success);
  border-color: var(--color-success);
}

.outline.success:hover:not(:disabled) {
  background: var(--color-success-soft);
}

.outline.danger {
  color: var(--color-danger);
  border-color: var(--color-danger);
}

.outline.danger:hover:not(:disabled) {
  background: var(--color-danger-soft);
}

.outline.gray {
  color: var(--color-text-muted);
  border-color: var(--color-border);
}

.outline.gray:hover:not(:disabled) {
  background: var(--color-gray-soft);
}

/* ===================== */
/* DISABLED */
/* ===================== */

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>