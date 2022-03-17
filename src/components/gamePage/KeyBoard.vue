<template>
   <div>
      <div>
         <button @click="clickNum(key)" v-for="key in keys" :key="key">
            {{ key }}
         </button>
      </div>
      <div>
         <button @click="prevInput">назад</button>
         <button @click="nextInput">вперёд</button>
         <button @click="showModalExpression">?</button>
         <button @click="checkSolution">=</button>
      </div>
      <teleport to="body" v-if="showExpression">
         <Modal :info='leftIdentity' @ok="closeModalExpression" />
      </teleport>
   </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
   props: {
      isBlockedTime: {
         type: Boolean,
         required: true,
      },
   },
   components: {
      Modal,
   },
   setup(props, context) {
      const store = useStore()

      const leftIdentity = ref(store.state.leftIdentity)

      const keys = [...Array(10).keys()]

      let showExpression = ref(false)

      let showSolution = ref(false)

      const clickNum = (num) => {
         store.dispatch('clickNum', num)
      }

      const showModalExpression = () => {
         context.emit('toggleTimer')

         showExpression.value = !showExpression.value

         store.dispatch('showLeftIdentity')
      }

      const closeModalExpression = () => {
         context.emit('toggleTimer')
         showExpression.value = !showExpression.value
      }

      const checkSolution = () => {
         context.emit('toggleTimer')
         showSolution.value = !showSolution.value
         store.dispatch('CHECK_SOLUTION')
         store.dispatch('generateExpressions')
      }

      const closeCheckSolution = () => {
         context.emit('toggleTimer')
         showSolution.value = !showSolution.value
      }

      const prevInput = () => {
         store.dispatch('prevInput')
      }

      const nextInput = () => {
         store.dispatch('nextInput')
      }

      return {
         keys,
         clickNum,
         checkSolution,
         prevInput,
         nextInput,
         showExpression,
         showSolution,
         showModalExpression,
         closeModalExpression,
         closeCheckSolution,
         leftIdentity
      }
   },
}
</script>

<style scoped></style>
