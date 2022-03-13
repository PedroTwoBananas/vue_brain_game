<template>
   <div>
      <div><h1>Привет!</h1></div>
      <div>
         <p>
            Добро пожаловать на 24 тренировочный день. Ваш последний результат -
            решено "заглушка" из "заглушка". Общая точность - "заглушка"%.
         </p>
      </div>
      <div>
         <h2>Настройки</h2>
         <div>
            <input
               type="range"
               min=1
               max=10
               step=1
               v-model="configs.time"
            />
            <span>Длительность {{ configs.time }} минут</span>
         </div>
         <div>
            <input
               type="range"
               min=1
               max=10
               step=1
               v-model="configs.difficulty"
            />
            <span>Сложность {{ configs.difficulty }}</span>
         </div>
      </div>
      <div>
         {{ configs.selectedOperators }}
         <div v-for="operator in operators" :key="operator.id">
            <input
               type="checkbox"
               @change="selectOperator(operator)"
               v-model="operator.isChecked"
            />
            <span>{{ operator.name }}</span>
         </div>
      </div>
      <button @click="playGame">Play!</button>
   </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
   setup() {
      const store = useStore()

      const router = useRouter()

      const operators = ref([
         { id: 1, isChecked: false, name: 'Суммирование', sign: '+' },
         { id: 2, isChecked: false, name: 'Разность', sign: '-' },
         { id: 3, isChecked: false, name: 'Умножение', sign: '*' },
         { id: 4, isChecked: false, name: 'Деление', sign: '/' },
         {
            id: 5,
            isChecked: false,
            name: 'Возведение в степень',
            sign: '^',
         },
      ])

      const configs = ref({
         difficulty: 5,
         time: 5,
         selectedOperators: [],
      })

      const selectOperator = (operator) => {
         operator.isChecked
            ? configs.value.selectedOperators.push(operator.sign)
            : (configs.value.selectedOperators =
                 configs.value.selectedOperators.filter(
                    (sign) => sign !== operator.sign
                 ))
      }

      const playGame = () => {
         if (configs.value.selectedOperators.length > 0) {
            store.dispatch('addGameConfigs', configs.value)
            router.push({ name: 'game' })
         } else alert('Выберите минимум один оператор!')
      }

      return { operators, configs, selectOperator, playGame }
   },
}
</script>

<style scoped></style>
