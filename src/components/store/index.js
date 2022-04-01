import { createStore } from 'vuex'
import { StatisticsStore } from '../services/StatisticsStore'

export const store = createStore({
   state() {
      return {
         configs: null,
         statistics: [],
      }
   },

   mutations: {
      LOAD_STATISTICS: (state, payload) => {
         state.statistics = payload
      },

      ADD_GAME_CONFIGS: (state, payload) => {
         state.configs = payload
      },

      ADD_TO_STATISTICS: (state, payload) => {
         state.statistics.push(payload)
      },
   },

   actions: {
      loadStatistics: (context) => {
         const statistic = StatisticsStore.loadStatistics() || []
         context.commit('LOAD_STATISTICS', statistic)
      },

      addGameConfigs: (context, payload) => {
         context.commit('ADD_GAME_CONFIGS', payload)
         StatisticsStore.removeStatistics()
      },

      addToStatistics: (context, payload) => {
         context.commit('ADD_TO_STATISTICS', payload)
         StatisticsStore.addToStatistics(context.state.statistics)
      },
   },
})
