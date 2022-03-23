import { createStore } from 'vuex'

export const store = createStore({
   state() {
      return {
         configs: null,
         statistics: [],
      }
   },

   mutations: {

      GET_STATISTICS: (state) => {
         const statistic = JSON.parse(localStorage.getItem('statistics'))
         statistic === null ? (state.statistics = []) : (state.statistics = statistic)
      },

      ADD_GAME_CONFIGS: (state, payload) => {
         state.configs = payload
         localStorage.setItem('configs', JSON.stringify(state.configs))
         localStorage.removeItem('statistics')
      },

      ADD_TO_STATISTICS: (state, payload) => {
         state.statistics.push(payload)
         localStorage.setItem('statistics', JSON.stringify(state.statistics))
      },
   },

   actions: {
      getStatistics: (context) => {
         context.commit('GET_STATISTICS')
      },

      addGameConfigs: (context, payload) => {
         context.commit('ADD_GAME_CONFIGS', payload)
      },

      addToStatistics: (context, payload) => {
         context.commit('ADD_TO_STATISTICS', payload)
      },
   },
})
