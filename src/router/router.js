import { createRouter, createWebHistory } from 'vue-router'


const routes = [

  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue'),
    meta: {
      layout: 'AppLayoutSite'
    },
  },

  {
    path: '/entrar',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home/Login.vue'),
    meta: {
      layout: 'AppLayoutSite'
    },
  },

  {
    path: '/cadastrar',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home/Register.vue'),
    meta: {
      layout: 'AppLayoutSite'
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
