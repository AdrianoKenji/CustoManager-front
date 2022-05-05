import { createRouter, createWebHistory } from 'vue-router'
import validatePerm from "./validatePerm";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue'),
    meta: {
      layout: 'AppLayoutSite'
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') == null) {
        return next();
      }
      else {
        next({ name: 'Dashboard' })
      }
    }
  },

  {
    path: '/cadastrar',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home/Register.vue'),
    meta: {
      layout: 'AppLayoutSite'
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') == null) {
        return next();
      }
      else {
        next({ name: 'Dashboard' })
      }
    }
  },

  {
    path: '/trocar-senha/:token',
    name: 'ResetPassword',
    component: () => import('@/views/Home/ResetPassword.vue'),
    meta: {
      layout: 'AppLayoutSite'
    },
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') == null) {
        return next();
      }
      else {
        next({ name: 'Dashboard' })
      }
    }
  },

  // Dashboard
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/Dashboard.vue'),
    meta: {
      layout: 'AppLayoutDashboard'
    },
    beforeEnter: (to, from, next) => {
      validatePerm.canEnterPage(next)
    }
  },

  // Usuários
  {
    path: '/usuarios',
    name: 'UserList',
    component: () => import('@/views/User/UserList.vue'),
    meta: {
      layout: 'AppLayoutDashboard'
    },
    beforeEnter: (to, from, next) => {
      validatePerm.canEnterAdminPage(next)
    }
  },

  // Empresas
  {
    path: '/empresas',
    name: 'CompanyList',
    component: () => import('@/views/Company/CompanyList.vue'),
    meta: {
      layout: 'AppLayoutDashboard'
    },
    beforeEnter: (to, from, next) => {
      validatePerm.canEnterAdminPage(next)
    }
  },
  {
    path: '/criar-empresa',
    name: 'AddCompany',
    component: () => import('@/views/Company/AddCompany.vue'),
    meta: {
      layout: 'AppLayoutDashboard'
    },
    beforeEnter: (to, from, next) => {
      validatePerm.canEnterPage(next)
    }
  },
  {
    path: '/editar-empresa/:id',
    name: 'CompanyEdit',
    component: () => import('@/views/Company/CompanyEdit.vue'),
    meta: {
      layout: 'AppLayoutDashboard'
    },
    beforeEnter: (to, from, next) => {
      validatePerm.canEnterPage(next)
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router