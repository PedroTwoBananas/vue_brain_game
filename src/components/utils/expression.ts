import { getRandomNum } from '@/components/utils/getRundomNum'
import uniqid from 'uniqid'
import { ConfigsInterface } from '@/components/interfaces/ConfigsInterface'
import { SignInterface } from '@/components/interfaces/SignInterface'

export class Expression {
   minNum: number
   maxNum: number
   configs: ConfigsInterface

   constructor(configs: ConfigsInterface) {
      this.configs = configs
      this.minNum = 1
      this.maxNum = 9
   }

   addNumber(exp: SignInterface[], isHidden: boolean, id: string | number) {
      const number = getRandomNum(this.minNum, this.maxNum).toString()
      const createNumSign = (inputValue: string) => {
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

   addOperator = (
      exp: SignInterface[],
      configs: string[],
      id: string | number
   ) => {
      const operator = configs[getRandomNum(0, configs.length - 1)]
      exp.push({
         type: 'operator',
         value: operator,
         inputValue: operator,
         hidden: false,
         id: id,
      })
   }

   addSolution = (
      exp: SignInterface[],
      fullExp: string,
      id: string | number
   ) => {
      const solution = eval(fullExp).toString()
      exp.push({
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
      const expression: SignInterface[] = []

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
