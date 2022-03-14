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
            <span v-if="sign.type === 'total'">= {{ sign.value }}</span>
         </div>
      </div>
      <button @click="showExpression">Показать выражение</button>
      <button @click="checkSolution">Проверить</button>
   </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
   setup() {
      const store = useStore()

      const configs = store.state.configs

      const getRandomInt = (min, max) => {
         const rand = min + Math.random() * (max + 1 - min)

         return Math.floor(rand)
      }

      const generate = () => {
         const difficulty = +configs.difficulty

         const operators = configs.selectedOperators

         const expression = []

         expression.push({
            type: 'number',
            value: getRandomInt(1, 5),
            hidden: false,
         })

         expression.push({
            type: 'operator',
            value: operators[getRandomInt(0, operators.length - 1)],
         })

         for (let i = 0; i < difficulty; i++) {
            expression.push({
               type: 'number',
               value: getRandomInt(1, 5),
               hidden: true,
            })

            if (i !== difficulty - 1) {
               expression.push({
                  type: 'operator',
                  value: operators[getRandomInt(0, operators.length - 1)],
               })
            }
         }

         const fullExpression = expression
            .map((elem) => elem.value.toString())
            .join('')
         expression.push({
            type: 'total',
            value: eval(fullExpression),
         })

         return expression
      }

      const data = ref({
         generatedExpression: generate(),
         inputExpression: [],
      })

      data.value.inputExpression = data.value.generatedExpression.map(
         (sign) => {
            if (sign.hidden && sign.type === 'number') {
               const newSign = { ...sign }
               newSign.value = null
               return newSign
            }
            return sign
         }
      )

      const showExpression = () => {
         const exp = data.value.generatedExpression
            .filter((elem) => elem.type !== 'total')
            .map((elem) => elem.value.toString())
            .join('')

         return alert(exp)
      }

      const checkSolution = () => {
         const solution = data.value.generatedExpression.find(
            (sign) => sign.type === 'total'
         ).value

         const leftIdentity = data.value.inputExpression
            .filter((elem) => elem.type !== 'total')
            .map((elem) => elem.value.toString())
            .join('')

         const rightIdentity = eval(leftIdentity)

         rightIdentity === solution ? alert('Молодец!') : alert('Болван!')

         data.value.generatedExpression = generate()

         data.value.inputExpression = data.value.generatedExpression.map(
            (sign) => {
               if (sign.hidden && sign.type === 'number') {
                  const newSign = { ...sign }
                  newSign.value = null
                  return newSign
               }
               return sign
            }
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
