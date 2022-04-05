<template>
   <div class="timer-block">
      <span class="timer-text">{{ formatTimer(countDownTime) }}</span>
   </div>
</template>

<script>
import {formatTimer} from '../utils/mappers/formatTimer'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { goToMain } from '@/components/utils/goToMain'
import { Timer } from '@/components/utils/timer'
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
      const toMain = () => {
         goToMain(router)
      }
      const countDownTime = ref(+store.state.configs.time * 60)
      const timer = new Timer(countDownTime, toMain)
      onMounted(() => timer.start())
      onBeforeUnmount(() => timer.stop())
      return { timer, countDownTime, formatTimer }
   },
}
</script>

<style scoped>
.timer-text {
   font-size: 24px;
   font-weight: bolder;
}
</style>
