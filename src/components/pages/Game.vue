<template>
   <div>
      <div class="expression">
         <div v-for="sign in data.inputExpression">
            <span v-if="!sign.hidden && sign.type !== 'total'">{{
               sign.value
            }}</span>
            <input
               type="number"
               class="sign-input"
               v-model="sign.value"
               v-if="sign.hidden"
            />
            <span v-if="sign.type === 'total'">= {{ sign.value }}?</span>
         </div>
      </div>
      <button @click="showExpression">Показать выражение</button>
      <button @click="checkSolution">Проверить</button>
      <button @click="goToMain">Отмена</button>
      <div>
         <h1>{{ convertToString(countDownTime) }}</h1>
      </div>
   </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
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

      const showExpression = () => {
         const leftIdentity = getLeftIdentity(data.value.generatedExpression)

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
      }
      return {
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
</style>
