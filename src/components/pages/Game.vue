<template>
   <div>
      <div class="expression">
         <div v-for="sign in data.inputExpression">
            <span v-if="!sign.hidden && sign.type !== 'total'">{{
               sign.value
            }}</span>
            <input
               class="sign-input"
               @click="() => (currentInput = sign.id)"
               :id="sign.id"
               type="number"
               :ref="
                  (el) => {
                     if (el) inputs[sign.id - 1] = el
                  }
               "
               v-model="sign.value"
               v-if="sign.hidden"
            />
            <span v-if="sign.type === 'total'">= {{ sign.value }}?</span>
         </div>
      </div>
      <button @click="goToMain">Отмена</button>
      <div>
         <h1>{{ convertToString(countDownTime) }}</h1>
      </div>
      <div>
         <div>
            <button v-for="key in keys" :key="key" @click="clickNumButton(key)">
               {{ key }}
            </button>
         </div>
         <div>
            <button @click="prevInput">назад</button>
            <button @click="nextInput">вперёд</button>
            <button @click="showExpression">?</button>
            <button @click="checkSolution">=</button>
         </div>
      </div>
   </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { generate } from '@/components/functions/generate'
import { createInputExpression } from '@/components/functions/createInputExpression'
import { getLeftIdentity } from '@/components/functions/getLeftIdentity'
import { convertToString } from '@/components/functions/convertToString'

export default {
   setup() {
      const store = useStore()
      const router = useRouter()

      const goToMain = () => {
         return router.push({ name: 'main' })
      }

      const keys = [...Array(10).keys()]

      const configs = store.state.configs

      let countDownTime = ref(+configs.time * 60)

      let timer

      const startTimer = () => {
         timer = setInterval(runTimer, 1000)
      }

      const stopTimer = () => {
         if (timer) {
            clearInterval(timer)
         }
      }

      const runTimer = () => {
         countDownTime.value -= 1

         if (countDownTime.value === 0) {
            stopTimer()
         }
      }

      startTimer()

      const data = ref({
         generatedExpression: generate(configs),
         inputExpression: null,
      })

      data.value.inputExpression = createInputExpression(
         data.value.generatedExpression
      )

      let currentInput = ref(1)

      let inputs = ref([])

      const focusInput = () => {
         inputs.value.map((input) => {
            if (input.id == currentInput.value) {
               input.focus()
            }
         })
      }

      onMounted(() => focusInput())

      const prevInput = () => {
         if (currentInput.value > 1) currentInput.value--
         focusInput()
      }

      const nextInput = () => {
         if (currentInput.value < configs.difficulty) {
            currentInput.value++
         }
         focusInput()
      }

      const clickNumButton = (num) => {
         data.value.inputExpression.map((sign) => {
            if (sign.id === currentInput.value) {
               sign.value = sign.value + '' + num
            }
         })
         focusInput()
      }

      const showExpression = () => {
         const leftIdentity = getLeftIdentity(data.value.generatedExpression)
         focusInput()
         return alert(leftIdentity)
      }

      const checkSolution = () => {
         const solution = data.value.generatedExpression.find(
            (sign) => sign.type === 'total'
         ).value

         const leftIdentity = getLeftIdentity(data.value.inputExpression)

         const rightIdentity = eval(leftIdentity)
         rightIdentity === solution ? alert('Молодец!') : alert('Болван!')

         data.value.generatedExpression = generate(configs)

         data.value.inputExpression = createInputExpression(
            data.value.generatedExpression
         )
         currentInput.value = 1
         focusInput()
      }
      return {
         currentInput,
         inputs,
         prevInput,
         nextInput,
         keys,
         clickNumButton,
         countDownTime,
         data,
         checkSolution,
         showExpression,
         goToMain,
         convertToString,
      }
   },
}
</script>

<style scoped>
.expression {
   display: flex;
   flex-direction: row;
   gap: 6px;
   align-content: center;
}

.sign-input {
   width: 25px;
}

.sign-input::-webkit-inner-spin-button,
.sign-input::-webkit-outer-spin-button {
   -webkit-appearance: none;
}

.active-sign-input {
   width: 25px;
   background-color: greenyellow;
}
</style>
