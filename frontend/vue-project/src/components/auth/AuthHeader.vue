<template>
  <div class="auth-header">
    <div class="brand">
      <div class="brand-icon">
        <span class="material-symbols-rounded">school</span>
      </div>
      <h1>QuizPlatform</h1>
    </div>
    <p>Faglige quizzer til studerende og undervisere</p>
  </div>
</template>

<style scoped>
.auth-header {
  text-align: center;
  margin-bottom: var(--space-lg);
}

.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.brand-icon {
  background: var(--color-primary);
  color: var(--color-white);
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--icon-md);
}

.brand-icon .material-symbols-rounded {
  font-size: var(--icon-lg);
}

.brand h1 {
  margin: 0;
  font-size: var(--text-xl);
  color: var(--color-text);
}

.auth-header p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

@media (max-width: 700px) {
  .brand h1 {
    font-size: var(--text-lg);
  }
}
</style>