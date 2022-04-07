import { SignInterface } from '@/components/interfaces/SignInterface'

export const getLeftIdentity = (expression: SignInterface[]) => {
   return expression
      .filter((sign) => sign.type !== 'total')
      .map((sign) => Number(sign.value).toString() && sign.value.toString())
      .join('')
}

export const getUserLeftIdentity = (expression: SignInterface[]) => {
   return expression
      .filter((sign) => sign.type !== 'total')
      .map((sign) => Number(sign.inputValue).toString() && sign.inputValue.toString())
      .join('')
}

