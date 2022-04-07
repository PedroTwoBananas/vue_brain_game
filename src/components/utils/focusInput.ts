export const focusInput = (inputNum: number, inputs: HTMLInputElement[]) => {
   return inputs.map((input) => {
      if (+input.id === inputNum) {
         input.focus()
      }
   })
}
