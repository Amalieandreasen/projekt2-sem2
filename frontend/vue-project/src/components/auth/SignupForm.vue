<script setup>
import { computed, ref } from 'vue'
import PasswordRules from './PasswordRules.vue'
import BaseButton from '../BaseButton.vue'

const emit = defineEmits(['signup'])

const signupUsername = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPasswordSignup = ref(false)

const usernameTouched = ref(false)
const emailTouched = ref(false)
const passwordTouched = ref(false)
const confirmPasswordTouched = ref(false)
const submitAttempted = ref(false)

const hasMinLength = computed(() => password.value.length >= 8)
const hasUpperCase = computed(() => /[A-Z]/.test(password.value))
const hasLowerCase = computed(() => /[a-z]/.test(password.value))
const hasNumber = computed(() => /[0-9]/.test(password.value))
const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(password.value))

const isPasswordStrong = computed(() => {
  return (
    hasMinLength.value &&
    hasUpperCase.value &&
    hasLowerCase.value &&
    hasNumber.value &&
    hasSpecialChar.value
  )
})

const passwordsMatch = computed(() => {
  return password.value === confirmPassword.value && confirmPassword.value.length > 0
})

const usernameError = computed(() => {
  if (!usernameTouched.value && !submitAttempted.value) return ''
  if (!signupUsername.value.trim()) return 'Brugernavn er påkrævet.'
  if (signupUsername.value.trim().length < 5) return 'Brugernavn skal være mindst 5 tegn.'
  return ''
})

const emailError = computed(() => {
  if (!emailTouched.value && !submitAttempted.value) return ''
  if (!email.value.trim()) return 'Email er påkrævet.'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) return 'Indtast en gyldig emailadresse.'
  return ''
})

const passwordError = computed(() => {
  if (!passwordTouched.value && !submitAttempted.value) return ''
  if (!password.value) return 'Password er påkrævet.'
  if (!isPasswordStrong.value) return 'Password opfylder ikke alle krav.'
  return ''
})

const confirmPasswordError = computed(() => {
  if (!confirmPasswordTouched.value && !submitAttempted.value) return ''
  if (!confirmPassword.value) return 'Bekræft dit password.'
  if (!passwordsMatch.value) return 'Passwords matcher ikke.'
  return ''
})

const isFormValid = computed(() => {
  return (
    !usernameError.value &&
    !emailError.value &&
    !passwordError.value &&
    !confirmPasswordError.value
  )
})

function submitSignup() {
  submitAttempted.value = true
  usernameTouched.value = true
  emailTouched.value = true
  passwordTouched.value = true
  confirmPasswordTouched.value = true

  if (isFormValid.value) {
    emit('signup', {
      username: signupUsername.value.trim(),
      email: email.value.trim(),
      password: password.value
    })
  }
}

function enter(el) {
  el.style.height = '0'
  el.style.opacity = '0'

  requestAnimationFrame(() => {
    el.style.transition = 'height 0.35s ease, opacity 0.35s ease'
    el.style.height = el.scrollHeight + 'px'
    el.style.opacity = '1'
  })

  setTimeout(() => {
    el.style.height = 'auto'
  }, 350)
}

function leave(el) {
  el.style.height = el.scrollHeight + 'px'
  el.style.opacity = '1'

  requestAnimationFrame(() => {
    el.style.transition = 'height 0.25s ease, opacity 0.25s ease'
    el.style.height = '0'
    el.style.opacity = '0'
  })
}
</script>

<template>
  <div>
    <div class="card-header">
      <h2>Opret bruger</h2>
      <p>Registrer dig for at tage quizzer</p>
    </div>

    <div class="card-content">
      <form @submit.prevent="submitSignup" class="form" novalidate>
        <div class="form-group">
          <label for="signup-username">Brugernavn</label>
          <input
            id="signup-username"
            v-model="signupUsername"
            type="text"
            placeholder="Vælg et brugernavn"
            :class="{ invalid: usernameError }"
            @blur="usernameTouched = true"
          />
          <p v-if="usernameError" class="error-text">{{ usernameError }}</p>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="din.email@eksempel.dk"
            :class="{ invalid: emailError }"
            @blur="emailTouched = true"
          />
          <p v-if="emailError" class="error-text">{{ emailError }}</p>
        </div>

        <div class="form-group">
          <label for="signup-password">Password</label>
          <div class="password-wrapper">
            <input
              id="signup-password"
              :type="showPasswordSignup ? 'text' : 'password'"
              v-model="password"
              placeholder="Vælg et stærkt password"
              :class="{ invalid: passwordError }"
              @blur="passwordTouched = true"
            />
            <button
              type="button"
              class="toggle-password"
              @click="showPasswordSignup = !showPasswordSignup"
            >
              {{ showPasswordSignup ? 'Skjul' : 'Vis' }}
            </button>
          </div>
          <p v-if="passwordError" class="error-text">{{ passwordError }}</p>
        </div>

        <Transition @enter="enter" @leave="leave">
          <div v-if="password" class="rules-wrapper">
            <PasswordRules
              :has-min-length="hasMinLength"
              :has-upper-case="hasUpperCase"
              :has-lower-case="hasLowerCase"
              :has-number="hasNumber"
              :has-special-char="hasSpecialChar"
            />
          </div>
        </Transition>

        <div class="form-group">
          <label for="confirm-password">Bekræft password</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            placeholder="Indtast password igen"
            :class="{ invalid: confirmPasswordError }"
            @blur="confirmPasswordTouched = true"
          />
          <p v-if="confirmPasswordError" class="error-text">{{ confirmPasswordError }}</p>
        </div>

        <BaseButton type="submit" :disabled="!isFormValid">
          <template #iconLeft>
            <span class="material-symbols-rounded">person_add</span>
          </template>
          Opret bruger
        </BaseButton>

        <p class="small-text">
          Ved at oprette en bruger accepterer du vores vilkår og betingelser.
          Dit password vil blive hashet og saltet før det gemmes sikkert.
        </p>
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

.form-group input.invalid {
  border-color: var(--color-error);
  box-shadow: 0 0 0 4px var(--color-error-ring);
}

.error-text {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-error);
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

.rules-wrapper {
  overflow: hidden;
}

.small-text {
  margin: 0;
  text-align: center;
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--color-text-muted);
}

@media (max-width: 700px) {
  .card-header,
  .card-content {
    padding-left: var(--space-lg);
    padding-right: var(--space-lg);
  }
}
</style>