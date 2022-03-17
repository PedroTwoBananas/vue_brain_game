import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/components/pages/Main'
// import Game from '@/components/pages/Game'
import NewGame from '@/components/gamePage/NewGame'
const routes = [
   {
      name: 'main',
      path: '/',
      component: Main,
   },

   {
      name: 'game',
      path: '/game',
      component: NewGame,
   },
]

const router = createRouter({
   routes,
   history: createWebHistory(process.env.BASE_URL),
})

export default router
