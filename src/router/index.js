import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import quanlysanpham from '@/views/quanlysanpham'
import quanlytonkho from '@/views/quanlytonkho'
import quanlyhoadon from '@/views/quanlyhoadon'
import quanlybanle from '@/views/quanlybanle'
import quanlyhoadonle from '@/views/quanlyhoadonle'
import quanlyno from '@/views/quanlyno'
import quanlycongno from '@/views/quanlycongno'
import quanlyhethong from '@/views/quanlyhethong'
import lsProduct from '@/views/views/lsMatOng'
import lsNghe from '@/views/views/lsNghe'
import home from '@/views/views/Home'
import jwtDecode from 'jwt-decode'
import lsTieu from '@/views/views/lsTieu'
import lsCacao from '@/views/views/lsCacao'
import lsNongSanKhac from '@/views/views/lsNongSanKhac'
import moreImage from '@/views/views/moreImage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/quanlysanpham',
    name: 'quanlysanpham',
    component: quanlysanpham,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/quanlytonkho',
    name: 'quanlytonkho',
    component: quanlytonkho,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quanlyhoadon',
    name: 'quanlyhoadon',
    component: quanlyhoadon,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quanlybanle',
    name: 'quanlybanle',
    component: quanlybanle,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quanlyhoadonle',
    name: 'quanlyhoadonle',
    component: quanlyhoadonle,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quanlyno',
    name: 'quanlyno',
    component: quanlyno,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quanlycongno',
    name: 'quanlycongno',
    component: quanlycongno,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quanlyhethong',
    name: 'quanlyhethong',
    component: quanlyhethong,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/mat-ong',
    name: 'lsProduct',
    component: lsProduct,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/nghe',
    name: 'lsNghe',
    component: lsNghe,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/tieu',
    name: 'lsTieu',
    component:lsTieu,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/cacao',
    name: 'lsCacao',
    component: lsCacao,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/nong-san-khac',
    name: 'lsNongSanKhac',
    component: lsNongSanKhac,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'home',
    component: home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/moreImage',
    name: 'moreImage',
    component: moreImage,
    meta: {
      requiresAuth: false
    }
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('refresh_token') == null) {
      console.log('1')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('path')
      next({ name: '' })
    } else if (localStorage.getItem('refresh_token') != null) {
      const decodedToken = jwtDecode(localStorage.getItem('refresh_token'))
      var expriedToken = (decodedToken.exp * 1000) > new Date().getTime()
      if (!expriedToken) {
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('path')
        next({ name: '' })
      } else {
        next()
      }
    } else {
      next()
    }
  } else if (!to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('refresh_token') != null) {
      const decodedToken = jwtDecode(localStorage.getItem('refresh_token'))
      var expriedToken = (decodedToken.exp * 1000) > new Date().getTime()
      if (!expriedToken) {
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('path')
        next({ name: '' })
      } else if (expriedToken) {
        next({ path: '/quanlysanpham' })
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
