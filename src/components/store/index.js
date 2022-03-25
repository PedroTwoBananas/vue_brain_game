import { createStore } from 'vuex'
import { db } from '@/components/functions/db'

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
      },
   },

   actions: {
      setStatistics: (context) => {
         const statistic = db.get('statistics') || []
         context.commit('SET_STATISTICS', statistic)
      },

      addGameConfigs: (context, payload) => {
         context.commit('ADD_GAME_CONFIGS', payload)
         db.set('configs', payload)
         db.remove('statistics')
      },

      addToStatistics: (context, payload) => {
         context.commit('ADD_TO_STATISTICS', payload)
         db.set('statistics', context.state.statistics)
      },
   },
})
