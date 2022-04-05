<template>
   <div class='expression'>
      <div
         class='expression-sign'
         v-for='sign in generatedExpression'
         :key='sign.id'
      >
         <span v-if="!sign.hidden && sign.type !== 'total'">
            {{ sign.inputValue }}
         </span>
         <input
            @click="$emit('selectInput', sign.id)"
            class='sign-input'
            :id='sign.id'
            type='number'
            :ref='(el) => (inputs[sign.id] = el)'
            v-model='sign.inputValue'
            v-if='sign.hidden'
         />
         <span v-if="sign.type === 'total'">= {{ sign.inputValue }}?</span>
      </div>
   </div>
</template>

<script>
import { onMounted } from 'vue'
import { ref } from 'vue'

export default {
   props: { generatedExpression: Array },
   setup(props, context) {
      const inputs = ref([])

      onMounted(() => {
         context.emit('setInputs', inputs.value)
      })

      return { inputs }
   },
}
</script>

<style scoped>
.expression {
   display: flex;
   flex-direction: row;
   font-size: 24px;
   font-family: Verdana;
}

.expression-sign {
   margin-right: 6px;
}

.sign-input {
   font-size: 22px;
   font-family: Verdana;
   width: 30px;
   border: none;
   border-bottom: 1px solid black;
}

.sign-input::-webkit-outer-spin-button,
.sign-input::-webkit-inner-spin-button {
   -webkit-appearance: none;
   margin: 0;
}
</style>
