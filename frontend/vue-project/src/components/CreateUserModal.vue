<script setup>
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'

defineProps({
    isOpen: Boolean
})

const emit = defineEmits(['close'])

const username = ref('')
const email = ref('')
const role = ref('Bruger')

function handleSubmit() {
    console.log('Create user:', {
        username: username.value,
        email: email.value,
        role: role.value
    })
}
</script>

<template>
    <BaseModal :isOpen="isOpen" title="Opret Ny Bruger" subtitle="Opret en ny bruger eller admin" width="460px"
        @close="emit('close')">
        <div class="form-group">
            <label>Brugernavn</label>
            <input v-model="username" type="text" placeholder="brugernavn" />
        </div>

        <div class="form-group">
            <label>Email</label>
            <input v-model="email" type="email" placeholder="email@eksempel.dk" />
        </div>

        <div class="form-group">
            <label>Rolle</label>
            <select v-model="role">
                <option>Bruger</option>
                <option>Admin</option>
            </select>
        </div>

        <button class="primary-btn" @click="handleSubmit">Opret Bruger</button>
    </BaseModal>
</template>

<style scoped>
.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 14px;
}

label {
    font-size: 14px;
    font-weight: 600;
}

input,
select {
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
}

.primary-btn {
    width: 100%;
    border: none;
    background: #020617;
    color: white;
    padding: 12px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
}
</style>