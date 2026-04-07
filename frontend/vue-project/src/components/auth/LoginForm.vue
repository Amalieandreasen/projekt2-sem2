<script setup>
import { ref } from 'vue'
import BaseButton from '../BaseButton.vue'

const emit = defineEmits(['login'])

const loginUsername = ref('')
const loginPassword = ref('')
const showPassword = ref(false)

function submitUserLogin() {
  emit('login', false)
}
</script>

<template>
  <div>
    <div class="card-header">
      <h2>Log ind</h2>
      <p>Log ind med dit brugernavn og password</p>
    </div>

    <div class="card-content">
      <form @submit.prevent="submitUserLogin" class="form">
        <div class="form-group">
          <label for="username">Brugernavn</label>
          <input
            id="username"
            v-model="loginUsername"
            type="text"
            placeholder="Indtast dit brugernavn"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-wrapper">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="loginPassword"
              placeholder="Indtast dit password"
              required
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Skjul' : 'Vis' }}
            </button>
          </div>
        </div>

        <BaseButton type="submit">
          <template #iconLeft>
            <span class="material-symbols-rounded">login</span>
          </template>
          Log ind
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  padding: var(--space-2xl) var(--space-2xl) var(--space-md);
}

.card-header h2 {
  margin: 0 0 var(--space-xs);
  font-size: var(--text-xl);
  color: var(--color-text);
}

.card-header p {
  margin: 0;
  color: var(--color-text-muted);
}

.card-content {
  padding: var(--space-lg) var(--space-2xl) var(--space-2xl);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.form-group label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-label);
}

.form-group input {
  width: 100%;
  max-width: -webkit-fill-available;
  padding: var(--input-padding-y) var(--input-padding-x);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--text-lg);
  outline: none;
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.form-group input:focus {
  border-color: var(--color-focus);
  box-shadow: 0 0 0 4px var(--color-focus-ring);
}

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  padding-right: var(--input-padding-right-with-toggle);
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: var(--space-md);
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.toggle-password:hover {
  color: var(--color-text-label);
}

@media (max-width: 700px) {
  .card-header,
  .card-content {
    padding-left: var(--space-lg);
    padding-right: var(--space-lg);
  }
}
</style>