<template>
   <router-view />
</template>

<script>
export default {
   computed: {
      storeGameConfigs() {
         return this.$store.getters.storeGameConfigs
      },
   },
}
</script>

<style></style>
