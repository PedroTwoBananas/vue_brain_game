import { createStore } from 'vuex'

export const store = createStore({
   state() {
      return {
         configs: null,
      }
   },

   mutations: {
      ADD_GAME_CONFIGS: (state, payload) => {
         state.configs = payload
      },
   },

   getters: {
      storeGameConfigs: (state) => state.configs,
   },

   actions: {
      addGameConfigs: (context, payload) => {
         context.commit('ADD_GAME_CONFIGS', payload)
      },
   },
})
