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

export const store = createStore<GameState>({
   state: {
      configs: null,
      statistics: [],
   },

   mutations: {
      LOAD_STATISTICS: (state, payload: ExpressionInterface[]) => {
         state.statistics = payload
      },

      LOAD_CONFIGS: (state, payload: ConfigsInterface) => {
         state.configs = payload
         if (!state.configs) return
         state.configs.entrances++
      },

      ADD_GAME_CONFIGS: (state, payload: ConfigsInterface) => {
         state.configs = payload
         state.statistics = []
      },

      ADD_TO_STATISTICS: (state, payload: ExpressionInterface) => {
         state.statistics.push(payload)
      },
   },

   actions: {
      loadStatistics: (context) => {
         const statistic: ExpressionInterface[] =
            StatisticsStore.loadStatistics() || []
         context.commit('LOAD_STATISTICS', statistic)
      },

      loadConfigs: (context) => {
         const configs: ConfigsInterface =
            ConfigsStore.loadConfigs() || defaultConfigs
         context.commit('LOAD_CONFIGS', configs)
      },

      addGameConfigs: (context, payload: ConfigsInterface) => {
         context.commit('ADD_GAME_CONFIGS', payload)
         ConfigsStore.addConfigs(payload)
         StatisticsStore.removeStatistics()
      },

      addToStatistics: (context, payload: ExpressionInterface) => {
         context.commit('ADD_TO_STATISTICS', payload)
         StatisticsStore.addToStatistics(context.state.statistics)
      },
   },
})
