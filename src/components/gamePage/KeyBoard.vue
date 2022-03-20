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
         <!-- <button @click="showModalExpression">?</button>
         <button @click="checkSolution">=</button> -->
      </div>
      <!-- <teleport to="body" v-if="show.showExpression">
         <Modal @ok="closeModalExpression">
            {{leftIdentity}}
         </Modal>
      </teleport>
      <teleport to="body" v-if="show.showSolution">
         <Modal @ok="closeCheckSolution">
            {{isSolved ? "Правильно" : 'Неправильно'}}
         </Modal>
      </teleport> -->
   </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
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

      const keys = [...Array(10).keys()]
      const show = ref({
         showExpression: false,
         showSolution: false
      })
      const clickNum = (num) => {
         // store.dispatch('clickNum', num)
         context.emit('clickNum', num)
      }
      // const showModalExpression = () => {
      //    context.emit('toggleTimer')
      //    show.value.showExpression = !show.value.showExpression
      //    store.dispatch('showLeftIdentity')
      // }
      // const closeModalExpression = () => {
      //    context.emit('toggleTimer')
      //    show.value.showExpression = !show.value.showExpression
      // }
      // const checkSolution = () => {
      //    context.emit('toggleTimer')
      //    store.dispatch('CHECK_SOLUTION')
      //    show.value.showSolution = !show.value.showSolution
      // }
      // const closeCheckSolution = () => {
      //    context.emit('toggleTimer')
      //    show.value.showSolution = !show.value.showSolution
      //    store.dispatch('generateExpressions')
      // }
      const prevInput = () => {
         // store.dispatch('prevInput')
         context.emit('prev')
      }
      const nextInput = () => {
         // store.dispatch('nextInput')
         context.emit('next')

      }
      return {
         keys,
         prevInput,
         nextInput,
         clickNum,
         show,
      }
   },
}
</script>

<style scoped></style>
