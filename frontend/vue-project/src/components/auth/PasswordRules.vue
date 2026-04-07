<script setup>
defineProps({
  hasMinLength: Boolean,
  hasUpperCase: Boolean,
  hasLowerCase: Boolean,
  hasNumber: Boolean,
  hasSpecialChar: Boolean
})
</script>

<template>
  <div class="password-rules">
    <p class="rules-title">Krav til stærkt password:</p>

    <div class="rule" :class="{ met: hasMinLength }">
      <span>{{ hasMinLength ? '✔' : '✖' }}</span>
      <span>Mindst 8 tegn</span>
    </div>

    <div class="rule" :class="{ met: hasUpperCase }">
      <span>{{ hasUpperCase ? '✔' : '✖' }}</span>
      <span>Mindst ét stort bogstav</span>
    </div>

    <div class="rule" :class="{ met: hasLowerCase }">
      <span>{{ hasLowerCase ? '✔' : '✖' }}</span>
      <span>Mindst ét lille bogstav</span>
    </div>

    <div class="rule" :class="{ met: hasNumber }">
      <span>{{ hasNumber ? '✔' : '✖' }}</span>
      <span>Mindst ét tal</span>
    </div>

    <div class="rule" :class="{ met: hasSpecialChar }">
      <span>{{ hasSpecialChar ? '✔' : '✖' }}</span>
      <span>Mindst ét specialtegn (!@#$%^&*...)</span>
    </div>
  </div>
</template>

<style scoped>
.password-rules {
  background: var(--color-surface-muted);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.rules-title {
  margin: 0 0 4px;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-label);
}

.rule {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
}

.rule.met {
  color: var(--color-success);
}
</style>