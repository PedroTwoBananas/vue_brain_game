import { createStore } from 'vuex'
import { StatisticsStore } from '../services/StatisticsStore'
import { ConfigsStore } from '@/components/services/ConfigsStore'
import { defaultConfigs } from '@/components/data/configs'
import { ConfigsInterface } from '@/components/interfaces/ConfigsInterface'
import { ExpressionInterface } from '@/components/interfaces/ExpressionInterface'

interface GameState {
   configs: ConfigsInterface | null
   statistics: ExpressionInterface[]
}

export const store = createStore({
   state(): GameState {
      return {
         configs: null,
         statistics: [],
      }
   },

   mutations: {
      LOAD_STATISTICS: (state: GameState, payload) => {
         state.statistics = payload
      },

      LOAD_CONFIGS: (state: GameState, payload) => {
         state.configs = payload
         if (!state.configs) return
         state.configs.entrances++
      },

      ADD_GAME_CONFIGS: (state: GameState, payload) => {
         state.configs = payload
         state.statistics = []
      },

      ADD_TO_STATISTICS: (state: GameState, payload: ExpressionInterface) => {
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
         // @ts-ignore
         StatisticsStore.addToStatistics(context.state.statistics)
      },
   },
})
