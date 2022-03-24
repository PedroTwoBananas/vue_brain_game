import { createStore } from 'vuex'

export const store = createStore({
   state() {
      return {
         configs: null,
         statistics: [],
      }
   },

   mutations: {
      SET_STATISTICS: (state, payload) => {
         state.statistics = payload
      },

      ADD_GAME_CONFIGS: (state, payload) => {
         state.configs = payload
      },

      ADD_TO_STATISTICS: (state, payload) => {
         state.statistics.push(payload)
         localStorage.setItem('statistics', JSON.stringify(state.statistics))
      },
   },

   actions: {
      setStatistics: (context) => {
         const statistic = JSON.parse(localStorage.getItem('statistics')) || []
         context.commit('SET_STATISTICS', statistic)
      },

      addGameConfigs: (context, payload) => {
         context.commit('ADD_GAME_CONFIGS', payload)
         localStorage.setItem('configs', JSON.stringify(payload))
         localStorage.removeItem('statistics')
      },

      addToStatistics: (context, payload) => {
         context.commit('ADD_TO_STATISTICS', payload)
      },
   },
})
