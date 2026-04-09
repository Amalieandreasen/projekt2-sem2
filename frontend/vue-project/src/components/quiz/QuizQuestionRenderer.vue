<script setup>
import { computed } from "vue"
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion.vue"
import MultipleChoiceQuestion from "./questions/MultipleChoicesQuestion.vue"
import ClozeQuestion from "./questions/ClozeQuestion.vue"

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: [Array, String, null],
    default: null,
  },
})

const emit = defineEmits(["update:modelValue"])

const componentMap = {
  single: SingleChoiceQuestion,
  multiple: MultipleChoiceQuestion,
  cloze: ClozeQuestion,
}

const currentComponent = computed(() => componentMap[props.question.type])
</script>

<template>
  <component
    :is="currentComponent"
    :question="question"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>