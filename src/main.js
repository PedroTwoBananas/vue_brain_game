import { createApp } from 'vue'
import App from './components/App.vue'
import router from '@/components/router/router'
import { store } from '@/components/store'

createApp(App).use(store).use(router).mount('#app')
