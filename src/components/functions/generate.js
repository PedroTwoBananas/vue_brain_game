export const generate = (configs) => {
   const getRandomInt = (min, max) => {
      const rand = min + Math.random() * (max + 1 - min)

      return Math.floor(rand)
   }

   const difficulty = +configs.difficulty

   const operators = configs.selectedOperators

   const expression = []

   expression.push({
      type: 'number',
      value: getRandomInt(1, 5),
      hidden: false,
   })

   expression.push({
      type: 'operator',
      value: operators[getRandomInt(0, operators.length - 1)],
   })

   for (let i = 0; i < difficulty; i++) {
      expression.push({
         type: 'number',
         value: getRandomInt(1, 5),
         hidden: true,
         id: i,
      })

      if (i !== difficulty - 1) {
         expression.push({
            type: 'operator',
            value: operators[getRandomInt(0, operators.length - 1)],
         })
      }
   }

   const fullExpression = expression
      .map((elem) => elem.value.toString())
      .join('')
   expression.push({
      type: 'total',
      value: eval(fullExpression),
   })

   return expression
}
