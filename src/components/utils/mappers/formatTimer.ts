export const formatTimer = (time) => {
   let minutes = (Math.trunc(time / 60)).toString()
   let seconds = (time % 60).toString()
   return [minutes, seconds].map(time => time.length === 1 ? '0' + time : time).join(':')
}
