<script setup>
import { ref } from "vue";
import CreateUserModal from "./CreateUserModal.vue";

const showCreateUserModal = ref(false);
const users = [
  {
    id: 1,
    username: "anna_hansen",
    email: "anna@eksempel.dk",
    role: "Bruger",
    joined: "2026-03-10",
    quizzesTaken: 12,
  },
  {
    id: 2,
    username: "peter_nielsen",
    email: "peter@eksempel.dk",
    role: "Bruger",
    joined: "2026-03-12",
    quizzesTaken: 8,
  },
  {
    id: 3,
    username: "marie_jensen",
    email: "marie@eksempel.dk",
    role: "Bruger",
    joined: "2026-03-15",
    quizzesTaken: 15,
  },
  {
    id: 4,
    username: "lars_andersen",
    email: "lars@eksempel.dk",
    role: "Bruger",
    joined: "2026-03-18",
    quizzesTaken: 6,
  },
  {
    id: 5,
    username: "sofie_petersen",
    email: "sofie@eksempel.dk",
    role: "Bruger",
    joined: "2026-03-20",
    quizzesTaken: 10,
  },
  {
    id: 6,
    username: "admin_hansen",
    email: "admin@eksempel.dk",
    role: "Admin",
    joined: "2026-03-01",
    quizzesTaken: 25,
  },
];
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
</style>
