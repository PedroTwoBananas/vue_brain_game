<template>
   <div class='game'>
      <div class='game-wrapper'>
         <div class='header-game-section'>
            <button @click='toMain' class='go-to-main-button'>
               &#10006; ОТМЕНА
            </button>
            <Timer :isBlockedTime='isBlockedTime' />
         </div>
         <Expression
            :inputExpression='inputExpression'
            @selectInput='selectInput'
            @setInputs='setInputs'
         />
         <KeyBoard
            :generatedExpression='generatedExpression'
            :leftIdentity='leftIdentity'
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
import Expression from '@/components/gamePage/Expression'
import KeyBoard from '@/components/gamePage/KeyBoard'
import Timer from '@/components/gamePage/Timer'
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { goToMain } from '@/components/utils/goToMain'
import { createInputExpression } from '../utils/createInputExpression'
import { getLeftIdentity } from '../utils/getLeftIdentity'
import { focusInput } from '../utils/focusInput'
import { Exp } from '@/components/utils/expression'

export default {
   components: { KeyBoard, Expression, Timer },
   setup() {
      const store = useStore()
      const router = useRouter()

      const toMain = () => {
         goToMain(router)
      }

      const exp = new Exp(store.state.configs)

      const generatedExpression = ref({
         expression: exp.generateExpression(),
         isSolved: false,
      })

      const leftIdentity = ref(
         getLeftIdentity(generatedExpression.value.expression),
      )

      const inputExpression = ref(
         createInputExpression(generatedExpression.value.expression),
      )

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
         inputExpression.value.forEach((sign) => {
            if (sign.id === currentInput.value) {
               sign.value = sign.value + '' + num
            }
         })
         focusInput(currentInput.value, inputsHtml.value)
      }

      const checkSolution = () => {
         const solution = generatedExpression.value.expression.find(
            (sign) => sign.type === 'total',
         ).value
         const userLeftIdentity = getLeftIdentity(inputExpression.value)
         const rightIdentity = eval(userLeftIdentity)
         if (rightIdentity === solution) {
            generatedExpression.value.isSolved = true
         }
         store.dispatch('addToStatistics', generatedExpression.value)
         currentInput.value = 0
      }

      const generateExpression = () => {
         generatedExpression.value = {
            expression: exp.generateExpression(),
            isSolved: false,
         }
         leftIdentity.value = getLeftIdentity(
            generatedExpression.value.expression,
         )
         inputExpression.value = createInputExpression(
            generatedExpression.value.expression,
         )
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
         generatedExpression,
         leftIdentity,
         inputExpression,
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
