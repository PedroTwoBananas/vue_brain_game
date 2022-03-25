<template>
   <router-view />
</template>

<script>
export default {
   mounted() {
      this.$router.push({ name: 'main' })
   },
}
</script>

<style></style>
