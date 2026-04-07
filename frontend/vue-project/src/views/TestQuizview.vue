<script setup>
import { ref } from 'vue'
import QuizModal from '@/components/quiz/QuizModal.vue'
import { mockQuizSession } from '@/mock/mockSession'

const showQuiz = ref(true)
</script>

<template>
  <QuizModal
    v-if="showQuiz"
    :session="mockQuizSession"
    @close="showQuiz = false"
  />
</template>