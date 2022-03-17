<template>
   <div>
      <Expression />
      <Timer :isBlockedTime="isBlockedTime" />
      <KeyBoard @toggleTimer="toggleTimer" :isBlockedTime="isBlockedTime" />
   </div>
</template>

<script>
import Expression from '@/components/gamePage/Expression'
import KeyBoard from '@/components/gamePage/KeyBoard'
import Timer from '@/components/gamePage/Timer'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
   components: { KeyBoard, Expression, Timer },

   setup() {
      const store = useStore()
      let isBlockedTime = ref(false)

      const toggleTimer = () => {
         isBlockedTime.value = !isBlockedTime.value
      }

      onMounted(() => {
         store.dispatch('generateExpressions')
      })
      return { isBlockedTime, toggleTimer }
   },
}
</script>

<style scoped></style>
