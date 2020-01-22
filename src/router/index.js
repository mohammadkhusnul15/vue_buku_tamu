import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Pengunjung.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: function() {
      return import('../views/Login.vue')
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: function() {
      return import('../views/Login.vue')
    }
  }, 
  {
    path: '/pegawai',
    name: 'pegawai',
    component: function() {
      return import('../views/Pegawai.vue')
    }
  },
  {
    path: '/pegawai/:id',
    name: 'pegawaiDetail',
    component: function() {
      return import('../views/PegawaiDetail.vue')
    }
  },
  {
    path: '/pegawai/add',
    name: 'pegawaiAdd',
    component: function() {
      return import('../views/PegawaiForm.vue')
    }
  },
  {
    path: '/tamu',
    name: 'tamu',
    component: function() {
      return import('../views/Tamu.vue')
    }
  },
  {
    path: '/tamu/:id',
    name: 'detailTamu',
    component: function() {
      return import('../views/TamuDetail.vue')
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: function() {
      return import('../views/Settings.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
