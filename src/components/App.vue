<template>
   <router-view />
</template>

<script>
export default {
   computed: {
      storeGameConfigs() {
         return this.$store.getters.storeGameConfigs
      },

      storeGenerate() {
         return this.$store.getters.storeGenerate
      },

      storeInputExpression() {
         return this.$store.getters.storeInputExpression
      },

      storeInputs() {
         return this.$store.getters.storeInputs
      },

      storeExpressions() {
        return this.$store.getters.storeExpressions
      }
   },
}
</script>

<style></style>
