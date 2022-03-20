<template>
   <div>
      <Expression
         ref="exreonsion"
         :inputExpression="inputExpression"
         :current="current"
      />
      <Timer :isBlockedTime="isBlockedTime" />
      <KeyBoard
         @clickNum="clickNum"
         @next="next"
         @prev="prev"
         @toggleTimer="toggleTimer"
         :isBlockedTime="isBlockedTime"
      />
   </div>
</template>

<script>
import Expression from '@/components/gamePage/Expression'
import KeyBoard from '@/components/gamePage/KeyBoard'
import Timer from '@/components/gamePage/Timer'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { createInputExpression } from '../functions/createInputExpression'
import { generate } from '@/components/functions/generate'
export default {
   components: { KeyBoard, Expression, Timer },
   setup() {
      const store = useStore()
      const generatedExpression = ref({
         expression: generate(store.state.configs),
         isSolved: false,
      })

      const inputExpression = ref(
         createInputExpression(generatedExpression.value.expression)
      )
      const current = ref(0)
      const exreonsion = ref(null)

      let isBlockedTime = ref(false)
      const toggleTimer = () => {
         isBlockedTime.value = !isBlockedTime.value
      }

      const next = () => {
         current.value += 1
      }

      const prev = () => {
         if (current.value > 0) current.value = current.value - 1
      }

      // onMounted(() => {
      //    store.dispatch('generateExpressions')
      // })
      // const next = () => {
      //    exreonsion.value.next()
      // }
      // const prev = () => {
      //    exreonsion.value.prev()
      // }

      const clickNum = (num) => {
         inputExpression.value.forEach((sign) => {
            if ((sign.id - 1) === current.value) {
               sign.value = sign.value + '' + num
            }
         })
      }
      return {
         isBlockedTime,
         inputExpression,
         toggleTimer,
         exreonsion,
         current,
         prev,
         next,
         clickNum,
      }
   },
}
</script>

<style scoped></style>
