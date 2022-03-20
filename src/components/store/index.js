import { createStore } from 'vuex'
import { generate } from '@/components/functions/generate'
import { createInputExpression } from '@/components/functions/createInputExpression'
import { getLeftIdentity } from '../functions/getLeftIdentity'
import { focusInput } from '@/components/functions/focusInput'
export const store = createStore({
   state() {
      return {
         configs: null,
         // current
         generatedExpression: [],
         // history
         expressions: [],
         // input variany
         inputExpression: [],
         // help
         leftIdentity: '',
         
         inputs: [],
         currentInput: 1,
      }
   },

   mutations: {
      ADD_GAME_CONFIGS: (state, payload) => {
         state.configs = payload
      },

      GENERATE_EXPRESSIONS: (state) => {
         state.generatedExpression ={
            expression: generate(state.configs),
            isSolved: false
         }

         state.inputExpression = createInputExpression(
            state.generatedExpression.expression
         )
         focusInput(state.currentInput, state.inputs)
      },

      CLICK_NUM: (state, payload) => {
         state.inputExpression.map((sign) => {
            if (sign.id === state.currentInput) {
               sign.value = sign.value + '' + payload
            }
         })

         focusInput(state.currentInput, state.inputs)
      },

      SHOW_LEFT_IDENTITY: (state) => {
         state.leftIdentity = getLeftIdentity(state.generatedExpression.expression)

         focusInput(state.currentInput, state.inputs)
      },

      CHECK_SOLUTION: (state) => {
         const solution = state.generatedExpression.expression.find(
            (sign) => sign.type === 'total'
         ).value

         const leftIdentity = getLeftIdentity(state.inputExpression)

         const rightIdentity = eval(leftIdentity)

         if (rightIdentity === solution) {
            state.generatedExpression.isSolved = true
         }

         state.expressions.push(state.generatedExpression)

         state.currentInput = 1

         focusInput(state.currentInput, state.inputs)
      },

      SET_INPUTS: (state, payload) => {
         // state.inputs = payload
      },

      SELECT_INPUT: (state, payload) => {
         state.currentInput = payload
      },

      PREV_INPUT: (state) => {
         if (state.currentInput > 1) state.currentInput--
         focusInput(state.currentInput, state.inputs)
      },

      NEXT_INPUT: (state) => {
         if (state.currentInput < 5) {
            state.currentInput++
         }
         focusInput(state.currentInput, state.inputs)
      },
   },

   getters: {
      storeGameConfigs: (state) => state.configs,
      storeGenerate: (state) => state.generatedExpression,
      storeInputExpression: (state) => state.inputExpression,
      storeInputs: (state) => state.inputs,
      storeCurrentInput: (state) => state.currentInput,
      storeExpressions: state => state.expressions
   },

   actions: {
      addGameConfigs: (context, payload) => {
         context.commit('ADD_GAME_CONFIGS', payload)
      },

      generateExpressions: (context) => {
         context.commit('GENERATE_EXPRESSIONS')
      },

      clickNum: (context, payload) => {
         context.commit('CLICK_NUM', payload)
      },

      showLeftIdentity: (context) => {
         context.commit('SHOW_LEFT_IDENTITY')
      },

      CHECK_SOLUTION: (context) => {
         context.commit('CHECK_SOLUTION')
      },

      SET_INPUTS: (context, payload) => {
         context.commit('SET_INPUTS', payload)
      },

      selectInput: (context, payload) => {
         context.commit('SELECT_INPUT', payload)
      },

      prevInput: (context) => {
         context.commit('PREV_INPUT')
      },

      nextInput: (context) => {
         context.commit('NEXT_INPUT')
      },
   },
})
