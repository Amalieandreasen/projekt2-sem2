<script setup>
import { computed, ref } from 'vue'
import BaseButton from '../BaseButton.vue'
import QuizHeader from './QuizHeader.vue'
import QuizInfoBox from './QuizInfoBox.vue'
import QuizProgress from './QuizProgress.vue'
import QuizQuestionRenderer from './QuizQuestionRenderer.vue'

const props = defineProps({
  session: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const currentIndex = ref(0)
const answers = ref({})

const currentQuestion = computed(() => props.session.questions[currentIndex.value])

const progressValue = computed(() => {
  return ((currentIndex.value + 1) / props.session.questions.length) * 100
})

const currentAnswer = computed(() => {
  const question = currentQuestion.value
  const saved = answers.value[question.questionId]

  if (saved !== undefined) return saved
  if (question.type === 'multiple') return []
  if (question.type === 'cloze') return ''
  return null
})

function updateAnswer(value) {
  answers.value[currentQuestion.value.questionId] = value
}

function nextQuestion() {
  if (currentIndex.value < props.session.questions.length - 1) {
    currentIndex.value++
  }
}

function previousQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
</script>

<template>
  <div class="quiz-overlay" @click.self="$emit('close')">
    <div class="quiz-modal">
      <QuizHeader
        :title="session.quiz.quizName"
        :difficulty="session.quiz.difficulty"
        :current-index="currentIndex"
        :total-questions="session.questions.length"
        @close="$emit('close')"
      />

      <QuizInfoBox />

      <QuizProgress :value="progressValue" />

      <QuizQuestionRenderer
        :question="currentQuestion"
        :model-value="currentAnswer"
        @update:model-value="updateAnswer"
      />

      <div class="quiz-footer">
        <p class="helper-text">
          Vælg dit svar og klik videre
        </p>

        <div class="quiz-actions">
          <BaseButton
            type="button"
            width="fit-content"
            variant="outline"
            color="gray"
            :disabled="currentIndex === 0"
            @click="previousQuestion"
          >
            <template #iconLeft>
              <span class="material-symbols-rounded">arrow_back</span>
            </template>
            Tilbage
          </BaseButton>

          <BaseButton
            type="button"
            width="fit-content"
            :disabled="currentIndex === session.questions.length - 1"
            @click="nextQuestion"
          >
            Næste
            <template #iconRight>
              <span class="material-symbols-rounded">arrow_forward</span>
            </template>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  z-index: 1000;
}

.quiz-modal {
  width: 100%;
  max-width: 640px;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-md);
}

.quiz-footer {
  margin-top: var(--space-2xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
}

.helper-text {
  margin: 0;
  font-size: var(--text-md);
  color: var(--color-text-muted);
}

.quiz-actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

@media (max-width: 700px) {
  .quiz-modal {
    padding: var(--space-lg);
  }

  .quiz-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .quiz-actions {
    justify-content: space-between;
  }
}
</style>