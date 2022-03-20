<template>
   <div class="expression">
      <div v-for="sign in inputExpression" :key="sign.id">
         <span v-if="!sign.hidden && sign.type !== 'total'">
            {{ sign.value }}
         </span>
         <input
            @click="selectInputByClick(sign.id)"
            class="sign-input"
            :id="sign.id"
            type="number"
            :ref="(el) => (inputs[sign.id - 1] = el)"
            v-model="sign.value"
            v-if="sign.hidden"
         />
         <span v-if="sign.type === 'total'">= {{ sign.value }}?</span>
      </div>
   </div>
</template>

<script>
import { useStore } from 'vuex'
import { nextTick, toRefs, watchEffect } from 'vue'
import { ref } from 'vue'
export default {
   props: { inputExpression: Array, current: Number },
   setup(props) {
      const { current } = toRefs(props)
      const store = useStore()

      const inputs = ref([])

      const selectInputByClick = (id) => {
         store.dispatch('selectInput', id)
      }
      // const current = ref(null)
      watchEffect(async () => {
         if (inputs.value.length === 0) return
         // inputs.value[props.current].focus()
         const v = current.value
         await nextTick()
         inputs.value[v].focus()
         
      })

      

      return { inputs, selectInputByClick, }
   },
}
</script>

<style scoped></style>
