import { getRandomNum } from '@/components/utils/getRundomNum'
import uniqid from 'uniqid'

export class Exp {
   constructor(configs) {
      this.configs = configs
      this.minNum = 1
      this.maxNum = 9
   }

   addNumber = (exp, isHidden, id) => {
      return exp.push(
         {
            type: 'number',
            value: getRandomNum(this.minNum, this.maxNum),
            hidden: isHidden,
            id: id,
         },
      )
   }

   addOperator = (exp, configs, id) => {
      return exp.push({
         type: 'operator',
         value: configs[getRandomNum(0, configs.length - 1)],
         hidden: false,
         id: id,
      })
   }

   addSolution = (exp, fullExp, id) => {
      return exp.push({
         type: 'total',
         value: eval(fullExp),
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
