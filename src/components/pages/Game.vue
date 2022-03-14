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
   </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { generate } from '@/components/functions/generate'
import { createInputExpression } from '@/components/functions/createInputExpression'
import { getLeftIdentity } from '@/components/functions/getLeftIdentity'

export default {
   setup() {
      const store = useStore()

      const configs = store.state.configs

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
      return { data, checkSolution, showExpression }
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
