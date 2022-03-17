<template>
   <div>
      <h1>{{ convertToString(countDownTime) }}</h1>
   </div>
</template>

<script>

import { convertToString } from '@/components/functions/convertToString'
import { onBeforeUnmount, onMounted, onUpdated, ref } from 'vue'
import { useStore } from 'vuex'

export default {
   props: {
      isBlockedTime: {
         type: Boolean,
         required: true
      }
   },
   setup(props) {
      const store = useStore()
      let countDownTime = ref(+store.state.configs.time * 60)

      let timer

      const startTimer = () => {
         timer = setInterval(tickTimer, 1000)
      }

      const stopTimer = () => {
         if (timer) {
            clearInterval(timer)
         }
      }

      const tickTimer = () => {
         console.log('tick')
         if (!props.isBlockedTime) countDownTime.value -= 1

         if (countDownTime.value === 0) {
            stopTimer()
         }
      }

      onMounted(() => startTimer())
      onBeforeUnmount(() => stopTimer())


      return { countDownTime, convertToString }
   },
}
</script>

<style scoped></style>
