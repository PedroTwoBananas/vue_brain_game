<template>
   <div class="expression">
      <div v-for="sign in inputExpression" :key="sign.id">
         <span v-if="!sign.hidden && sign.type !== 'total'">
            {{ sign.value }}
         </span>
         <input
            @click="$emit('selectInput', sign.id)"
            class="sign-input"
            :id="sign.id"
            type="number"
            :ref="(el) => (inputs[sign.id] = el)"
            v-model="sign.value"
            v-if="sign.hidden"
         />
         <span v-if="sign.type === 'total'">= {{ sign.value }}?</span>
      </div>
   </div>
</template>

<script>
import { onMounted } from 'vue'
import { ref } from 'vue'
export default {
   props: { inputExpression: Array, current: Number },
   setup(props, context) {
      const inputs = ref([])

      onMounted(() => {
         context.emit('getInputs', inputs.value)
      })

      return { inputs }
   },
}
</script>

<style scoped></style>
