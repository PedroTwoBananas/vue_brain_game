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
         <button @click="toggleModalExpression">?</button>
         <button @click="checkSolution">=</button>
      </div>
      
         <Modal v-if="show.showExpression" @ok="toggleModalExpression">
            {{ leftIdentity }}
         </Modal>
      
      <teleport to="body" v-if="show.showSolution">
         <Modal @ok="closeCheckSolution">
            {{generatedExpression.isSolved ? "Правильно" : 'Неправильно'}}
         </Modal>
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
      leftIdentity: String,
      generatedExpression: Object
   },
   components: {
      Modal,
   },
   setup(props, context) {
      const store = useStore()

      const keys = [...Array(10).keys()]
      const show = ref({
         showExpression: false,
         showSolution: false,
      })

      const prevInput = () => {
         context.emit('prev')
      }

      const nextInput = () => {
         context.emit('next')
      }

      const clickNum = (num) => {
         context.emit('clickNum', num)
      }
      const toggleModalExpression = () => {
         context.emit('toggleTimer')
         show.value.showExpression = !show.value.showExpression
      }
      
      const checkSolution = () => {
         context.emit('toggleTimer')
         show.value.showSolution = true
         context.emit('checkSolution')
      }
      const closeCheckSolution = () => {
         context.emit('toggleTimer')
         show.value.showSolution = false
         context.emit('generateExpression')
         // store.dispatch('generateExpressions')
      }

      return {
         keys,
         prevInput,
         nextInput,
         clickNum,
         show,
         toggleModalExpression,
         checkSolution,
         closeCheckSolution
      }
   },
}
</script>

<style scoped></style>
