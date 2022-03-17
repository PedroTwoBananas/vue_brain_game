export const focusInput = (inputNum, inputs) => {
    return  inputs.map((input) => {
        if (input.id == inputNum) {
           input.focus()
        }
     })
}
