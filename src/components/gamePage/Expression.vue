<template>
   <div class="expression">
      <div v-for="sign in inputExpression" :key="sign.id">
         <span v-if="!sign.hidden && sign.type !== 'total'">
            {{ sign.value }}
         </span>
         <input
            @click='selectInputByClick(sign.id)'
            class="sign-input"
            :id="sign.id"
            type="number"
            :ref="
               (el) => {
                  if (el) inputs[sign.id - 1] = el
               }
            "
            v-model="sign.value"
            v-if="sign.hidden"
         />
         <span v-if="sign.type === 'total'">= {{ sign.value }}?</span>
      </div>
   </div>
</template>

<script>
import { useStore } from 'vuex'
import {nextTick} from 'vue'
import { onMounted, ref } from 'vue'
import { computed } from 'vue'
import { createInputExpression } from '@/components/functions/createInputExpression'

export default {
   setup() {
      const store = useStore()


      // console.log(smth.value)
      // const inputExpression = ref(createInputExpression(smth.value))
      // console.log(inputExpression.value)
      // const smth = computed(() => store.state.generatedExpression)
      // console.log(smth.value)



      const inputExpression = computed(() => store.state.inputExpression)

      let currentInput = computed(() => store.state.currentInput)

      const inputs = ref([])

       const focus = () => {
         inputs.value.map((input) => {
            if (input.id == currentInput.value) {
               input.focus()
            }
         })
      }

      const selectInputByClick = (id) => {
         store.dispatch('selectInput', id)
      }

       onMounted(() => {
          store.dispatch('SET_INPUTS', inputs)
          nextTick(focus)
      })

      return {  inputExpression, inputs, selectInputByClick }
   },
}
</script>

<style scoped></style>
