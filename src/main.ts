import { createApp } from 'vue'
import App from './components/App.vue'
import router from '@/components/router/router'
import { store, key } from '@/components/store'

createApp(App).use(store, key).use(router).mount('#app')
