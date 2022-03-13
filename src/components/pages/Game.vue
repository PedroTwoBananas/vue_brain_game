<template>
   <div>
      <h1>game</h1>
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

      const getRandomBoolean = () => {
         return Math.random() >= 0.5
      }

      const generator = () => {
         const difficulty = +configs.difficulty

         const count = difficulty + 1

         const operators = configs.selectedOperators

         const example = []

         for (let i = 0; i < count; i++) {
            example.push({
               type: 'number',
               value: getRandomInt(1, 5),
               hidden: false,
            })

            if (i !== count - 1) {
               example.push({
                  type: 'operator',
                  value: operators[getRandomInt(0, operators.length - 1)],
               })
            }
         }
      }
      return { generator }
   },
}
</script>

<style scoped></style>
