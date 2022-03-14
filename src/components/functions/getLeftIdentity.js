export const getLeftIdentity = (expression) => {
   return expression
      .filter((sign) => sign.type !== 'total')
      .map((sign) => sign.value.toString())
      .join('')
}
