export interface SignInterface {
   type: 'number' | 'operator' | 'total'
   value: string
   inputValue: string
   hidden: boolean
   id: number | string
}