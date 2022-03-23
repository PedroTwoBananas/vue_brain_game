<template>
   <div>
      <span>{{ convertToString(countDownTime) }}</span>
   </div>
</template>

<script>
import { convertToString } from '@/components/functions/convertToString'
import { onBeforeUnmount, onMounted, ref} from 'vue'
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
      const goToMain = () => {
         router.push({name: 'main'})
      }
      const countDownTime = ref(+store.state.configs.time * 60)
      const timer = new Timer(countDownTime, goToMain)
      onMounted(() => timer.start())
      onBeforeUnmount(() => timer.stop())
      return { timer, countDownTime, convertToString }
   },
}
</script>

<style scoped></style>
