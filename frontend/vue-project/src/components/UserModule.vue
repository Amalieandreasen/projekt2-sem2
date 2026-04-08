<script setup>
import { ref, onMounted } from "vue";
import CreateUserModal from "./CreateUserModal.vue";

const showCreateUserModal = ref(false);
const users = ref([]);
const loading = ref(false);
const error = ref("");

async function fetchUsers() {
  try {
    const res = await fetch("http://localhost:3000/api/admin/users", {
      credentials: "include",
    });

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    const data = JSON.parse(text);

    if (!res.ok) {
      throw new Error(data.message || "Kunne ikke hente brugere");
    }

    users.value = data;
  } catch (err) {
    console.error(err);
    error.value = err.message;
  }
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <section class="module-card">
    <div class="module-header">
      <div>
        <h2>Brugere</h2>
        <p>Administrer brugere og roller</p>
      </div>

      <button class="action-btn" @click="showCreateUserModal = true">
        <span class="material-symbols-rounded"> add </span>
        Tilføj Bruger
      </button>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>Brugernavn</th>
          <th>Email</th>
          <th>Rolle</th>
          <th>Tilmeldt</th>
          <th>Quizzer Taget</th>
          <th>Handlinger</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span
              class="badge"
              :class="user.role === 'Admin' ? 'badge-purple' : 'badge-gray'">
              {{ user.role }}
            </span>
          </td>
          <td>{{ user.joined }}</td>
          <td>{{ user.quizzesTaken }}</td>
          <td class="actions">
            <button class="text-btn">Rediger</button>
            <button class="icon-btn delete">
              <span class="material-symbols-rounded"> delete </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="loading">Henter brugere...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <table v-else class="data-table">
      <thead>
        <tr>
          <th>Brugernavn</th>
          <th>Rolle</th>
          <th>Handlinger</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.username">
          <td>{{ user.username }}</td>
          <td>
            <span
              class="badge"
              :class="user.role === 'admin' ? 'badge-purple' : 'badge-gray'">
              {{ user.role === "admin" ? "Admin" : "Bruger" }}
            </span>
          </td>
          <td class="actions">
            <button class="text-btn">Rediger</button>
            <button class="icon-btn delete">Slet</button>
          </td>
        </tr>
      </tbody>
    </table>

    <CreateUserModal
      :isOpen="showCreateUserModal"
      @close="showCreateUserModal = false" />
  </section>
</template>

<style scoped>
.module-card {
  margin-top: 20px;
  padding: 24px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 16px;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.module-header h2 {
  margin: 0;
  font-size: 20px;
}

.module-header p {
  margin: 4px 0 0;
  color: #666;
}

.action-btn {
  border: none;
  background: #0b0b23;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  align-items: center;
  display: flex;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  text-align: left;
  padding: 14px 10px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.badge-gray {
  background: #e2e8f0;
  color: #334155;
}

.badge-purple {
  background: #f3e8ff;
  color: #7e22ce;
}

.actions {
  display: flex;
  gap: 12px;
}

.text-btn,
.icon-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
}

.delete {
  color: #dc2626;
}

.error {
  color: #dc2626;
  font-weight: 500;
}
</style>
