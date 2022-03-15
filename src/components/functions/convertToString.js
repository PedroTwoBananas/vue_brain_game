export const convertToString = (time) => {
   let minutes = String(Math.trunc(time / 60))
   let seconds = String(time % 60)
   if (minutes.length === 1) {
      minutes = '0' + minutes
   }
   if (seconds.length === 1) {
      seconds = '0' + seconds
   }
   return minutes + ':' + seconds
}
