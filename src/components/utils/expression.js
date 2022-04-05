import { getRandomNum } from '@/components/utils/getRundomNum'
import uniqid from 'uniqid'

export class Expression {
   constructor(configs) {
      this.configs = configs
      this.minNum = 1
      this.maxNum = 9
   }

   addNumber = (exp, isHidden, id) => {
      const number = getRandomNum(this.minNum, this.maxNum)
      const createNumSign = (inputValue) => {
         return {
            type: 'number',
            value: number,
            inputValue: inputValue,
            hidden: isHidden,
            id: id,
         }
      }
      isHidden ? exp.push(createNumSign('')) : exp.push(createNumSign(number))
   }

   addOperator = (exp, configs, id) => {
      const operator = configs[getRandomNum(0, configs.length - 1)]
      return exp.push({
         type: 'operator',
         value: operator,
         inputValue: operator,
         hidden: false,
         id: id,
      })
   }

   addSolution = (exp, fullExp, id) => {
      const solution = eval(fullExp)
      return exp.push({
         type: 'total',
         value: solution,
         inputValue: solution,
         hidden: false,
         id: id,
      })
   }

   generateExpression = () => {
      const difficulty = +this.configs.difficulty
      const operators = this.configs.selectedOperators
      const expression = []

      this.addNumber(expression, false, uniqid())
      this.addOperator(expression, operators, uniqid())

      for (let i = 0; i < difficulty; i++) {
         this.addNumber(expression, true, i)

         if (i !== difficulty - 1) {
            this.addOperator(expression, operators, uniqid())
         }
      }

      const fullExpression = expression
         .map((elem) => elem.value.toString())
         .join('')

      this.addSolution(expression, fullExpression, uniqid())

      return expression
   }
}
