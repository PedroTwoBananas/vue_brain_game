<template>
   <div class="modal">
      <div class="modal-content">
         <slot></slot>
         <div class="button-block">
            <button @click="$emit('ok')">ОК</button>
         </div>
      </div>
   </div>
</template>

<script>
export default {}
</script>

<style scoped>
.modal {
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: rgba(0, 0, 0, 0.5);
   position: fixed;
   display: flex;
}
.modal-content {
   margin: auto;
   padding: 20px;
   background: white;
   min-height: 50px;
   min-width: 300px;
   display: flex;
   flex-direction: column;
   align-items: center;
   border: 2px solid black;
}
.button-block {
   margin-top: 10px;
   display: flex;
   flex-direction: row;
   gap: 20px;
}
</style>
