import { createStore } from 'vuex'
import { StatisticsStore } from '../services/StatisticsStore'
import { ConfigsStore } from '@/components/services/ConfigsStore'
import { defaultConfigs } from '@/components/data/configs'


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

      LOAD_CONFIGS: (state, payload) => {
         state.configs = payload
         state.configs.entrances++
      },

      ADD_GAME_CONFIGS: (state, payload) => {
         state.configs = payload
         state.statistics = []
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

      loadConfigs: (context) => {
         const configs = ConfigsStore.loadConfigs() || defaultConfigs
         context.commit('LOAD_CONFIGS', configs)
      },

      addGameConfigs: (context, payload) => {
         context.commit('ADD_GAME_CONFIGS', payload)
         ConfigsStore.addConfigs(payload)
         StatisticsStore.removeStatistics()
      },

      addToStatistics: (context, payload) => {
         context.commit('ADD_TO_STATISTICS', payload)
         StatisticsStore.addToStatistics(context.state.statistics)
      },
   },
})
