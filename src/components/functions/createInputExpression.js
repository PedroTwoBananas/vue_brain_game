export const createInputExpression = (expression) => {
   return expression.map((sign) => {
      if (sign.hidden && sign.type === 'number') {
         const newSign = { ...sign }
         newSign.value = null
         return newSign
      }
      return sign
   })
}
