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
   },
}
</script>

<style scoped></style>
