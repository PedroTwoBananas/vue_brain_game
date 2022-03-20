<template>
   <div>
      <h1>{{ convertToString(countDownTime) }}</h1>
   </div>
</template>

<script>
import { convertToString } from '@/components/functions/convertToString'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Timer } from '@/components/functions/timer'
export default {
   props: {
      isBlockedTime: {
         type: Boolean,
         required: true,
      },
   },
   watch: {
      isBlockedTime(newBlocked) {
         !newBlocked && this.timer.start()
         newBlocked && this.timer.stop()
      },
   },
   setup(props) {
      const store = useStore()
      const router = useRouter()
      const countDownTime = ref(+store.state.configs.time * 60)
      let timer = new Timer(countDownTime)
      onMounted(() => timer.start())
      onBeforeUnmount(() => timer.stop())
      return { timer, countDownTime, convertToString }
   },
}
</script>

<style scoped></style>
