import { ExpressionInterface } from '@/components/interfaces/ExpressionInterface'

class LocalStorage {
   addToStatistics(data: ExpressionInterface) {
      return localStorage.setItem('statistics', JSON.stringify(data))
   }

   loadStatistics() {
      const value = localStorage.getItem('statistics')
      if (value) return JSON.parse(value)
   }

   removeStatistics() {
      return localStorage.removeItem('statistics')
   }
}

export const StatisticsStore = new LocalStorage()
