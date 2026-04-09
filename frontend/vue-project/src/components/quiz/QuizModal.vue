<script setup>
import { computed, ref, watch } from "vue"
import BaseButton from "../BaseButton.vue"
import QuizHeader from "./QuizHeader.vue"
import QuizInfoBox from "./QuizInfoBox.vue"
import QuizProgress from "./QuizProgress.vue"
import QuizQuestionRenderer from "./QuizQuestionRenderer.vue"

const API_URL = "http://localhost:3000"

const props = defineProps({
  session: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["close"])

const currentQuestion = ref(props.session.question)
const currentIndex = ref(props.session.index)
const totalQuestions = ref(props.session.total)
const selectedAnswer = ref(getInitialAnswer(props.session.question))
const feedback = ref(null)
const result = ref(null)
const answered = ref(false)
const loading = ref(false)
const errorMessage = ref("")

watch(
  () => props.session,
  (newSession) => {
    currentQuestion.value = newSession.question
    currentIndex.value = newSession.index
    totalQuestions.value = newSession.total
    selectedAnswer.value = getInitialAnswer(newSession.question)
    feedback.value = null
    answered.value = false
    result.value = null
    errorMessage.value = ""
  },
  { immediate: true }
)

function getInitialAnswer(question) {
  if (!question) return null
  if (question.type === "multiple") return []
  if (question.type === "cloze") return ""
  return []
}

const progressValue = computed(() => {
  return ((currentIndex.value + 1) / totalQuestions.value) * 100
})

function updateAnswer(value) {
  selectedAnswer.value = value
}

async function handleSubmitAnswer() {
  try {
    loading.value = true
    errorMessage.value = ""

    const response = await fetch(
      `${API_URL}/api/quizzes/${props.session.quiz.quizId}/answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          answer: selectedAnswer.value,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Kunne ikke sende svar")
    }

    feedback.value = data
    answered.value = true
  } catch (error) {
    errorMessage.value = error.message
    console.error(error)
  } finally {
    loading.value = false
  }
}

async function handleNext() {
  try {
    loading.value = true
    errorMessage.value = ""

    const isLastQuestion = currentIndex.value >= totalQuestions.value - 1

    if (isLastQuestion) {
      const submitResponse = await fetch(
        `${API_URL}/api/quizzes/${props.session.quiz.quizId}/submit`,
        {
          method: "POST",
          credentials: "include",
        }
      )

      const submitData = await submitResponse.json()

      if (!submitResponse.ok) {
        throw new Error(submitData.message || "Kunne ikke afslutte quiz")
      }

      result.value = submitData.result
      return
    }

    const nextResponse = await fetch(
      `${API_URL}/api/quizzes/${props.session.quiz.quizId}/next`,
      {
        method: "POST",
        credentials: "include",
      }
    )

    const nextData = await nextResponse.json()

    if (!nextResponse.ok) {
      throw new Error(nextData.message || "Kunne ikke gå til næste spørgsmål")
    }

    const questionResponse = await fetch(
      `${API_URL}/api/quizzes/${props.session.quiz.quizId}/question`,
      {
        credentials: "include",
      }
    )

    const questionData = await questionResponse.json()

    if (!questionResponse.ok) {
      throw new Error(questionData.message || "Kunne ikke hente næste spørgsmål")
    }

    currentQuestion.value = questionData.question
    currentIndex.value = questionData.index
    totalQuestions.value = questionData.total
    selectedAnswer.value = getInitialAnswer(questionData.question)
    feedback.value = null
    answered.value = false
  } catch (error) {
    errorMessage.value = error.message
    console.error(error)
  } finally {
    loading.value = false
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
        :total-questions="totalQuestions"
        @close="$emit('close')"
      />

      <template v-if="!result">
        <QuizInfoBox />
        <QuizProgress :value="progressValue" />

        <QuizQuestionRenderer
          v-if="currentQuestion"
          :question="currentQuestion"
          :model-value="selectedAnswer"
          @update:model-value="updateAnswer"
        />

        <div v-if="feedback" class="feedback-box">
          <p>{{ feedback.correct ? "Korrekt svar" : "Forkert svar" }}</p>
          <p>Point: {{ feedback.score }}</p>
        </div>

        <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

        <div class="quiz-actions">
          <BaseButton
            v-if="!answered"
            type="button"
            width="fit-content"
            :disabled="loading"
            @click="handleSubmitAnswer"
          >
            Aflever svar
          </BaseButton>

          <BaseButton
            v-else
            type="button"
            width="fit-content"
            :disabled="loading"
            @click="handleNext"
          >
            {{ currentIndex === totalQuestions - 1 ? "Afslut quiz" : "Næste spørgsmål" }}
          </BaseButton>
        </div>
      </template>

      <template v-else>
        <div class="result-box">
          <h3>Quiz afsluttet</h3>
          <p><strong>Quiz:</strong> {{ result.quizName }}</p>
          <p><strong>Score:</strong> {{ result.score }} / {{ result.total }}</p>
          <p><strong>Varighed:</strong> {{ result.durationsSeconds }} sekunder</p>

          <BaseButton type="button" width="fit-content" @click="$emit('close')">
            Luk
          </BaseButton>
        </div>
      </template>
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

.quiz-actions {
  margin-top: var(--space-2xl);
  display: flex;
  justify-content: flex-end;
}

.feedback-box {
  margin-top: var(--space-lg);
  padding: var(--space-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
}

.error-text {
  margin-top: var(--space-md);
  color: var(--color-error);
}

.result-box {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>