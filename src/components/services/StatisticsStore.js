class LocalStorage {
   addToStatistics(data) {
      return localStorage.setItem('statistics', JSON.stringify(data))
   }

   loadStatistics() {
      return JSON.parse(localStorage.getItem('statistics'))
   }

   removeStatistics() {
      return localStorage.removeItem('statistics')
   }
}

export const StatisticsStore = new LocalStorage()
