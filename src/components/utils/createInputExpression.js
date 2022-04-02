export const createInputExpression = (expression) => {
   return expression.map((sign) => {
      if (sign.hidden && sign.type === 'number') {
         sign.value = ''
      }
      return sign
   })
}
