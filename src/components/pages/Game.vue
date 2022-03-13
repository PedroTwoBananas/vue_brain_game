<template>
   <div class="expression">
      <div v-for="sign in generator()">
         <span
            v-if="
               (!sign.hidden && sign.type === 'number') ||
               sign.type === 'operator'
            "
            >{{ sign.value }}</span
         >
         <input class='sign-input' v-if="sign.hidden" />
         <span v-if="sign.type === 'total'">= {{ sign.value }}</span>
      </div>
   </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
   setup() {

      const store = useStore()

      const configs = store.state.configs

      const getRandomInt = (min, max) => {
         const rand = min + Math.random() * (max + 1 - min)

         return Math.floor(rand)
      }

      const generator = () => {
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
      return { generator }
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
