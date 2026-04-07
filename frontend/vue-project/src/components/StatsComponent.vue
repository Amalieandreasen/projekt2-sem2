<script setup>
defineProps({
    stats: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <div class="stats-grid">
        <div v-for="card in stats" :key="card.label" class="card">
            <div class="card-header">
                <span>{{ card.label }}</span>
                <span class="icon">{{ card.icon }}</span>
            </div>

            <h2>{{ card.value }}</h2>
            <p>{{ card.sub }}</p>
        </div>
    </div>
</template>

<style scoped>
.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 24px;
}

.card {
    background: white;
    border: 1px solid #eee;
    border-radius: 16px;
    padding: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #666;
    margin-bottom: 10px;
}

h2 {
    margin: 0;
    font-size: 28px;
}

p {
    margin: 6px 0 0;
    font-size: 13px;
    color: #888;
}
</style>