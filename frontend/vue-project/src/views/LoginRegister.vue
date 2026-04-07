<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthHeader from '../components/auth/AuthHeader.vue'
import AuthTabs from '../components/auth/AuthTabs.vue'
import LoginForm from '../components/auth/LoginForm.vue'
import SignupForm from '../components/auth/SignupForm.vue'

const router = useRouter()
const activeTab = ref('login')

function handleLogin(isAdmin) {
  if (isAdmin) {
    router.push('/admin')
  } else {
    router.push('/bruger')
  }
}

function handleSignup() {
  router.push('/bruger')
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-wrapper">
      <AuthHeader />

      <AuthTabs v-model="activeTab" />

      <div class="card">
        <LoginForm
          v-if="activeTab === 'login'"
          @login="handleLogin"
        />

        <SignupForm
          v-else
          @signup="handleSignup"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.auth-page {
  min-height: 100vh;
  padding: 16px;
  display: flex;
  padding-top: 6rem;
  justify-content: center;
  background: white;
  font-family: Arial, Helvetica, sans-serif;
}

.auth-wrapper {
  width: 100%;
  max-width: 900px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

@media (max-width: 700px) {
  .auth-wrapper {
    max-width: 100%;
  }
}
</style>