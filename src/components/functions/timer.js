export class Timer {
   constructor(countDown) {
      this.id = null;
      this.countDown = countDown;
      this.isRunning = false;
   }

   start() {
      if (this.isRunning) {
         return
      }
      this.id = setInterval(() => {
         this.countDown.value--;
      }, 1000);
      this.isRunning = true;
   }

   stop() {
      clearInterval(this.id);
      this.isRunning = false;
   }

}
