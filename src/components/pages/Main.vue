<template>
   <div class='main-section'>
      <div class='main-wrapper'>
         <div class='greetings-block'>
            <div class='greeting-hello-block'>
               <span class='greeting-hello-text'>Привет!</span>
            </div>
            <p class='greetings-description'>
               Добро пожаловать на {{ configs.entrances }} тренировочный день. Ваш последний
               результат -
               {{ solvedExpressions }} из {{ expressions.length }}. <br />
               Общая точность {{ percent || 0 }}%.
            </p>
         </div>
         <div class='options-block'>
            <div class='options-title-block'>
               <span class='options-title-text'>Настройки</span>
            </div>
            <div class='options-input-block'>
               <div class='options-labels'>
                  <label>{{ defaultRanges.time.min }}</label>
                  <label>{{ defaultRanges.time.max }}</label>
               </div>
               <input
                  class='options-input-range'
                  type='range'

                  :min='defaultRanges.time.min'
                  :max='defaultRanges.time.max'
                  step='1'
                  v-model='configs.time'
               />
               <span class='options-input-title'>
                  Длительность {{ configs.time }} минут
               </span>
            </div>
            <div class='options-input-block'>
               <div class='options-labels'>
                  <label>{{ defaultRanges.difficulty.min }}</label>
                  <label>{{ defaultRanges.difficulty.max }}</label>
               </div>
               <input
                  class='options-input-range'
                  type='range'
                  :min='defaultRanges.difficulty.min'
                  :max='defaultRanges.difficulty.max'
                  step='1'
                  v-model='configs.difficulty'
               />
               <span class='options-input-title'>
                  Сложность {{ configs.difficulty }}
               </span>
            </div>
         </div>
         <div class='options-operators-block'>
            <div
               class='options-operator'
               v-for='operator in operators'
               :key='operator.id'
            >
               <label>
                  <input
                     class='options-operator-checkbox'
                     type='checkbox'
                     :value='operator.sign'
                     v-model='configs.selectedOperators'
                  />
                  <span class='options-operator-title'>
                     {{ operator.name }}
                  </span>
               </label>
            </div>
         </div>
         <div class='run-game-block'>
            <button class='run-game-button' @click='playGame'>Play!</button>
         </div>
         <teleport to='body' v-if='show'>
            <Modal @ok='closeModal'>Выберите минимум один оператор!</Modal>
         </teleport>
      </div>
   </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Modal from '@/components/Modal'
import { defaultRanges } from '@/components/data/configs'

export default {
   components: { Modal },
   setup() {
      const store = useStore()

      const router = useRouter()

      const show = ref(false)

      const operators = ref([
         { id: 1, isChecked: false, name: 'Суммирование', sign: '+' },
         { id: 2, isChecked: false, name: 'Разность', sign: '-' },
         { id: 3, isChecked: false, name: 'Умножение', sign: '*' },
         { id: 4, isChecked: false, name: 'Деление', sign: '/' },
         {
            id: 5,
            isChecked: false,
            name: 'Возведение в степень',
            sign: '**',
         },
      ])

      store.dispatch('loadConfigs')
      const configs = computed(() => store.state.configs)


      const expressions = computed(() => store.state.statistics)

      const solvedExpressions = computed(
         () =>
            expressions.value.filter((expression) => expression.isSolved).length,
      )

      const percent = computed(() =>
         Math.trunc((solvedExpressions.value * 100) / expressions.value.length),
      )

      const playGame = () => {
         if (configs.value.selectedOperators.length > 0) {

            store.dispatch('addGameConfigs', configs.value)
            router.push({ name: 'game' })
         } else show.value = true
      }

      const closeModal = () => {
         show.value = false
      }

      onMounted(() => {
         store.dispatch('loadStatistics')
      })

      return {
         operators,
         defaultRanges,
         configs,
         playGame,
         show,
         closeModal,
         expressions,
         percent,
         solvedExpressions,
      }
   },
}
</script>

<style scoped>
span,
label,
p {
   font-family: Verdana;
}

.main-section {
   display: flex;
   justify-content: center;
}

.main-wrapper {
   width: 800px;
   margin-top: 100px;
   padding-left: 50px;
   padding-top: 20px;
   padding-bottom: 100px;
   display: flex;
   flex-direction: column;
}

.greetings-hello-block {
   font-size: 14px;
}

.greeting-hello-text {
   font-size: 26px;
}

.greetings-description {
   width: 345px;
}

.options-title-block {
   margin-top: 50px;
   margin-bottom: 30px;
}

.options-title-text {
   font-weight: bold;
}

.options-input-block {
   margin-bottom: 30px;
   display: flex;
   flex-direction: column;
}

.options-labels {
   font-size: 14px;
   width: 155px;
   margin-bottom: 5px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
}

.options-input-range {
   margin-bottom: 20px;
   -webkit-appearance: none;
   height: 3px;
   width: 150px;
   border: 1px solid black;
   border-radius: 15px;
   outline: none;
}

.options-input-range::-webkit-slider-thumb {
   -webkit-appearance: none;
   background: #e1e1e1;
   width: 20px;
   height: 20px;
   border-top-left-radius: 6px;
   border-top-right-radius: 6px;
   border-bottom-left-radius: 10px;
   border-bottom-right-radius: 10px;
   cursor: pointer;
   border: 1px solid black;
}

.options-input-title {
   font-size: 14px;
   font-weight: bold;
}

.options-operator {
   margin-bottom: 10px;
}

.options-operator-checkbox {
   margin-right: 16px;
}

.options-operator-title {
   font-size: 14px;
   font-weight: bold;
}

.run-game-block {
   width: 500px;
   margin-top: 20px;
   display: flex;
   justify-content: flex-end;
}

.run-game-button {
   width: 80px;
   height: 40px;
   background-color: white;
   border: none;
   box-shadow: -1px 1px 3px grey;
}
</style>
