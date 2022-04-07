import { ConfigsInterface } from '@/components/interfaces/ConfigsInterface'

class LocalStorage {
   addConfigs(data: ConfigsInterface) {
      return localStorage.setItem('configs', JSON.stringify(data))
   }

   loadConfigs() {
      const value = localStorage.getItem('configs')
      if (value) return JSON.parse(value)
   }
}

export const ConfigsStore = new LocalStorage()
