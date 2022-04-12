<template>
   <div class="keyboard-section">
      <div class="keyboard-numbers">
         <button
            class="keyboard-button num"
            @click="clickNum(key)"
            v-for="key in keys"
            :key="key"
         >
            {{ key }}
         </button>
      </div>
      <div class="keyboard-actions">
         <button class="keyboard-button" @click="prevInput">&lt;</button>
         <button class="keyboard-button" @click="nextInput">&gt;</button>
         <button class="keyboard-button" @click="toggleModalExpression">
            ?
         </button>
         <button class="keyboard-button" @click="checkSolution">=</button>
      </div>
      <Modal v-if="show.showExpression" @ok="toggleModalExpression">
         {{ leftIdentity }}
      </Modal>
      <Modal v-if="show.showSolution" @ok="closeCheckSolution">
         {{ generatedExpression.isSolved ? 'Правильно' : 'Неправильно' }}
      </Modal>
   </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Modal from '@/components/Modal.vue'

export default defineComponent({
   name: 'KeyBoard',
   props: {
      isBlockedTime: {
         type: Boolean,
         required: true,
      },
      leftIdentity: String,
      generatedExpression: Object,
   },
   components: {
      Modal,
   },
   setup(props, context) {
      const keys: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

      const show = ref<{ showExpression: boolean; showSolution: boolean }>({
         showExpression: false,
         showSolution: false,
      })

      const prevInput = () => {
         context.emit('prev')
      }

      const nextInput = () => {
         context.emit('next')
      }

      const clickNum = (num: number) => {
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
      }

      return {
         keys,
         prevInput,
         nextInput,
         clickNum,
         show,
         toggleModalExpression,
         checkSolution,
         closeCheckSolution,
      }
   },
})
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
   background-color: #7a7a7a;
   border: 1px solid transparent;
   box-shadow: 0px 3px 5px grey;
}

.num {
   background-color: #ff6f42;
}

.keyboard-numbers {
   display: flex;
   flex-direction: row;
   justify-content: center;
   gap: 30px;
   flex-wrap: wrap;
   width: 250px;
}

.keyboard-actions {
   display: flex;
   flex-direction: column;
   gap: 30px;
}
</style>
