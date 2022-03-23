<template>
   <div class="keyboard-section">
      <div class='keyboard-numbers'>
         <button class="keyboard-button num" @click="clickNum(key)" v-for="key in keys" :key="key">
            {{ key }}
         </button>
      </div>
      <div class="keyboard-actions">
         <button class="keyboard-button" @click="prevInput">&lt;</button>
         <button class="keyboard-button" @click="nextInput">&gt;</button>
         <button class="keyboard-button" @click="toggleModalExpression">?</button>
         <button class="keyboard-button" @click="checkSolution">=</button>
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

      const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
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

<style scoped>
.keyboard-section {
   display: flex;
   flex-direction: row;
   gap: 15px;
}

.keyboard-button {
   font-size: 16px;
   font-weight: bolder;
   width: 50px;
   height: 50px;
   border-radius: 50%;
   background-color: #7A7A7A;
   border: 1px solid transparent
}

.num {
   background-color: #FF6F42;
}

.keyboard-numbers {
   display: flex;
   flex-direction: row;
   justify-content: center;
   gap: 15px;
   flex-wrap: wrap;
   width: 200px;
}

.keyboard-actions {
   display: flex;
   flex-direction: column;
   gap: 15px;
}
</style>
