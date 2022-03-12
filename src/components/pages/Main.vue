<template>
   <div>
      <div><h1>Привет!</h1></div>
      <div>
         <p>
            Добро пожаловать на 24 тренировочный день. Ваш последний результат -
            решено "заглушка" из "заглушка". Общая точность - 80%.
         </p>
      </div>
      <div>
         <h2>Настройки</h2>
         <div>
            <input type="range" />
            <span>Длительность "заглушка" минут</span>
         </div>
         <div>
            <input type="range" />
            <span>Сложность "заглушка"</span>
         </div>
      </div>
      <div>
         <div>
            <input type="checkbox" />
            <span>Суммирование</span>
         </div>
         <div>
            <input type="checkbox" />
            <span>Разность</span>
         </div>
         <div>
            <input type="checkbox" />
            <span>Умножение</span>
         </div>
         <div>
            <input type="checkbox" />
            <span>Деление</span>
         </div>
         <div>
            <input type="checkbox" />
            <span>Возведение в степень</span>
         </div>
      </div>
      <button @click="this.$router.push({ name: 'game' })">Play!</button>
   </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
