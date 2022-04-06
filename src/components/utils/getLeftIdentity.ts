export const getLeftIdentity = (expression) => {
   return expression
      .filter((sign) => sign.type !== 'total')
      .map((sign) => Number(sign.value).toString() && sign.value.toString())
      .join('')
}

export const getUserLeftIdentity = (expression) => {
   return expression
      .filter((sign) => sign.type !== 'total')
      .map((sign) => Number(sign.inputValue).toString() && sign.inputValue.toString())
      .join('')
}

