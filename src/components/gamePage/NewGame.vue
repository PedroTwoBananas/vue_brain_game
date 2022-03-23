<template>
   <div>
      <div>
         <button>Отмена</button>
         <Timer :isBlockedTime="isBlockedTime" />
      </div>
      <Expression
         :inputExpression="inputExpression"
         :current="current"
         @selectInput="selectInput"
         @getInputs="getInputs"
      />
      <KeyBoard
         :generatedExpression="generatedExpression"
         :leftIdentity="leftIdentity"
         @clickNum="clickNum"
         @next="next"
         @prev="prev"
         @toggleTimer="toggleTimer"
         @checkSolution="checkSolution"
         @generateExpression="generateExpression"
         :isBlockedTime="isBlockedTime"
      />
   </div>
</template>

<script>
import Expression from '@/components/gamePage/Expression'
import KeyBoard from '@/components/gamePage/KeyBoard'
import Timer from '@/components/gamePage/Timer'
import { ref } from 'vue'
import { watchEffect } from 'vue'
import { useStore } from 'vuex'
import { createInputExpression } from '../functions/createInputExpression'
import { getLeftIdentity } from '../functions/getLeftIdentity'
import { generate } from '@/components/functions/generate'
import { focusInput } from '../functions/focusInput'
export default {
   components: { KeyBoard, Expression, Timer },
   setup() {
      const store = useStore()
      const generatedExpression = ref({
         expression: generate(store.state.configs),
         isSolved: false,
      })

      const leftIdentity = ref(
         getLeftIdentity(generatedExpression.value.expression)
      )

      const inputExpression = ref(
         createInputExpression(generatedExpression.value.expression)
      )
      const inputsHtml = ref([])

      const getInputs = (arr) => {
         inputsHtml.value = arr
      }

      const current = ref(0)

      const isBlockedTime = ref(false)

      const toggleTimer = () => {
         isBlockedTime.value = !isBlockedTime.value
      }

      const selectInput = (id) => {
         current.value = id
      }

      const prev = () => {
         if (current.value > 0) current.value = current.value - 1
         focusInput(current.value, inputsHtml.value)
      }

      const next = () => {
         if (current.value < store.state.configs.difficulty - 1) {
            current.value += 1
         }
         focusInput(current.value, inputsHtml.value)
      }

      const clickNum = (num) => {
         inputExpression.value.forEach((sign) => {
            if (sign.id === current.value) {
               sign.value = sign.value + '' + num
            }
         })
         focusInput(current.value, inputsHtml.value)
      }

      const checkSolution = () => {
         const solution = generatedExpression.value.expression.find(
            (sign) => sign.type === 'total'
         ).value

         const userLeftIdentity = getLeftIdentity(inputExpression.value)

         const rightIdentity = eval(userLeftIdentity)

         if (rightIdentity === solution) {
            generatedExpression.value.isSolved = true
         }

         store.dispatch('addToStatistics', generatedExpression.value)

         current.value = 0
      }

      const generateExpression = () => {
         generatedExpression.value = {
            expression: generate(store.state.configs),
            isSolved: false,
         }

         leftIdentity.value = getLeftIdentity(
            generatedExpression.value.expression
         )
         inputExpression.value = createInputExpression(
            generatedExpression.value.expression
         )
         focusInput(current.value, inputsHtml.value)
      }

      watchEffect(
         () => {
            if (inputsHtml.value.length === 0) return
            inputsHtml.value[current.value].focus()
         },
         { flush: 'post' }
      )

      return {
         isBlockedTime,
         generatedExpression,
         leftIdentity,
         inputExpression,
         toggleTimer,
         current,
         selectInput,
         prev,
         next,
         clickNum,
         checkSolution,
         generateExpression,
         getInputs,
         inputsHtml,
      }
   },
}
</script>

<style scoped></style>
