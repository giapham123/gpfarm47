import Vue from 'vue'
import Vuex from 'vuex'
import login from '../views/login/store'
import quanlysanpham from '../views/quanlysanpham/store'
import quanlytonkho from '../views/quanlytonkho/store'
import quanlyhoadon from '../views/quanlyhoadon/store'
import quanlybanle from '../views/quanlybanle/store'
import quanlyno from '../views/quanlyno/store'
import quanlycongno from '../views/quanlycongno/store'
import views from '../views/views/store'
import quanlyhethong from '../views/quanlyhethong/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login,
    quanlysanpham,
    quanlytonkho,
    quanlyhoadon,
    quanlybanle,
    quanlyno,
    quanlycongno,
    views,
    quanlyhethong
  }
})
