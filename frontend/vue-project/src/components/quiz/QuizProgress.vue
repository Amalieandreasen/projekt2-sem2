<script setup>
defineProps({
  value: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="progress-track">
    <div class="progress-bar" :style="{ width: `${value}%` }"></div>
  </div>
</template>

<style scoped>
.progress-track {
  width: 100%;
  height: 10px;
  background: #d9d9de;
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: var(--space-2xl);
}

.progress-bar {
  height: 100%;
  background: #0b0b24;
  border-radius: 999px;
  transition: width var(--transition-normal);
}
</style>