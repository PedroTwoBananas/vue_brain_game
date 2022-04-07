<template>
   <div class="timer-block">
      <span class="timer-text">{{ formatTimer(countDownTime) }}</span>
   </div>
</template>

<script lang="ts">
import { formatTimer } from '../utils/mappers/formatTimer'
import { onBeforeUnmount, onMounted, ref, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { goToMain } from '@/components/utils/goToMain'
import { Timer } from '@/components/utils/timer'

export default defineComponent({
   name: 'Timer',
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
      const countDownTime = ref<number>(store.state.configs.time * 60)
      const timer = new Timer(countDownTime, toMain)
      onMounted(() => timer.start())
      onBeforeUnmount(() => timer.stop())
      return { timer, countDownTime, formatTimer }
   },
})
</script>

<style scoped>
.timer-text {
   font-size: 24px;
   font-weight: bolder;
}
</style>
