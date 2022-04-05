class LocalStorage {

   addConfigs(data) {
      return localStorage.setItem('configs', JSON.stringify(data))
   }

   loadConfigs() {
      return JSON.parse(localStorage.getItem('configs'))
   }
}

export const ConfigsStore = new LocalStorage()