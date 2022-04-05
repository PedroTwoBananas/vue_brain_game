<template>
   <div class='game'>
      <div class='game-wrapper'>
         <div class='header-game-section'>
            <button @click='toMain' class='go-to-main-button'>
               &#10006; ОТМЕНА
            </button>
            <Timer :isBlockedTime='isBlockedTime' />
         </div>
         <ExpressionBlock
            :generatedExpression='expressionSetup.generatedExpression.expression'
            @selectInput='selectInput'
            @setInputs='setInputs'
         />
         <KeyBoard
            :generatedExpression='expressionSetup.generatedExpression'
            :leftIdentity='expressionSetup.leftIdentity'
            @clickNum='clickNum'
            @next='next'
            @prev='prev'
            @toggleTimer='toggleTimer'
            @checkSolution='checkSolution'
            @generateExpression='generateExpression'
            :isBlockedTime='isBlockedTime'
         />
      </div>
   </div>
</template>

<script>
import ExpressionBlock from '@/components/gamePage/ExpressionBlock'
import KeyBoard from '@/components/gamePage/KeyBoard'
import Timer from '@/components/gamePage/Timer'
import { reactive, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { goToMain } from '@/components/utils/goToMain'
import { getLeftIdentity } from '../utils/getLeftIdentity'
import { getUserLeftIdentity } from '../utils/getLeftIdentity'
import { focusInput } from '../utils/focusInput'
import { Expression } from '@/components/utils/expression'

export default {
   components: { KeyBoard, ExpressionBlock, Timer },
   setup() {

      function generateNewExpression() {
         const newExpression = new Expression(store.state.configs).generateExpression()

         expressionSetup.value = {
            generatedExpression: { expression: newExpression, isSolved: false },
            leftIdentity: getLeftIdentity(newExpression),
         }
      }

      const store = useStore()
      const router = useRouter()

      const toMain = () => {
         goToMain(router)
      }

      const expressionSetup = ref(null)

      generateNewExpression()

      const inputsHtml = ref([])

      const setInputs = (arr) => {
         inputsHtml.value = arr
      }

      const currentInput = ref(0)

      const isBlockedTime = ref(false)

      const toggleTimer = () => {
         isBlockedTime.value = !isBlockedTime.value
      }

      const selectInput = (id) => {
         currentInput.value = id
      }

      const prev = () => {
         if (currentInput.value > 0) currentInput.value = currentInput.value - 1
         focusInput(currentInput.value, inputsHtml.value)
      }

      const next = () => {
         if (currentInput.value < store.state.configs.difficulty - 1) {
            currentInput.value += 1
         }
         focusInput(currentInput.value, inputsHtml.value)
      }

      const clickNum = (num) => {
         expressionSetup.value.generatedExpression.expression.forEach((sign) => {
            if (sign.id === currentInput.value) {
               sign.inputValue = sign.inputValue + '' + num
            }
         })
         focusInput(currentInput.value, inputsHtml.value)
      }

      const checkSolution = () => {
         const solution = expressionSetup.value.generatedExpression.expression.find(
            (sign) => sign.type === 'total',
         ).value
         const userSolution = eval(getUserLeftIdentity(expressionSetup.value.generatedExpression.expression))

         if (userSolution === solution) {
            expressionSetup.value.generatedExpression.isSolved = true
         }
         store.dispatch('addToStatistics', expressionSetup.value.generatedExpression)

         currentInput.value = 0
      }

      const generateExpression = () => {
         generateNewExpression()
         focusInput(currentInput.value, inputsHtml.value)
      }

      watchEffect(
         () => {
            if (inputsHtml.value.length === 0) return
            inputsHtml.value[currentInput.value].focus()
         },
         { flush: 'post' },
      )

      return {
         isBlockedTime,
         expressionSetup,
         toggleTimer,
         currentInput,
         selectInput,
         prev,
         next,
         clickNum,
         checkSolution,
         generateExpression,
         setInputs,
         inputsHtml,
         toMain,
      }
   },
}
</script>

<style scoped>
.game {
   margin-top: 200px;
   display: flex;
   justify-content: center;
}

.game-wrapper {
   display: flex;
   flex-direction: column;
   gap: 50px;
   align-items: center;
}

.header-game-section {
   display: flex;
   gap: 200px;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
}

.go-to-main-button {
   width: 100px;
   height: 40px;
   background-color: white;
   border: none;
   box-shadow: 0px 2px 3px grey;
   color: grey;
}
</style>
