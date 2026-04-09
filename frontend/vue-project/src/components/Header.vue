<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const router = useRouter();

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/api/me", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Kunne ikke hente brugeren");

    const data = await res.json();
    username.value = data.username;
  } catch (err) {
    console.error(err);
  }
});

const logout = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Kunne ikke logge ud");

    router.push("/");
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <header class="header">
    <div class="left">
      <div class="logo">
        <span class="material-symbols-rounded"> school </span>
      </div>
      <div>
        <h1>QuizPlatform Admin</h1>
        <p>Underviser panel</p>
        <p>Velkommen tilbage {{ username }}</p>
      </div>
    </div>

     <button class="logout-btn" v-on:click="logout">
      <span class="material-symbols-rounded"> logout </span>Log ud
    </button>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #eee;
  background: #f9fafb;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 40px;
  height: 40px;
  background: #6366f1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 18px;
}

h1 {
  margin: 0;
  font-size: 18px;
}

p {
  margin: 2px 0 0;
  font-size: 13px;
  color: #666;
}

.logout-btn {
  border: 1px solid #ddd;
  background: black;
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  align-items: center;
  display: flex;
}
</style>
