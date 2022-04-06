export class Timer {
   constructor(countDown, goToMain) {
      this.id = null
      this.countDown = countDown
      this.isRunning = false
      this.goToMain = goToMain
   }

   start() {
      if (this.isRunning) {
         return
      }
      this.id = setInterval(() => {
         this.countDown.value--
         if (this.countDown.value === 0) {
            this.stop()
            this.goToMain()
         }
      }, 1000)
      this.isRunning = true
   }

   stop() {
      clearInterval(this.id)
      this.isRunning = false
   }
}
