<template>
  <v-app id="app">
    <div v-if="show">
      <v-row no-gutters>
        <v-col md="2" sm="2" xs="2">
          <v-navigation-drawer permanent height="720">
            <v-toolbar flat>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    GP Management
                    <!-- <v-icon @click="logoutSys"
                      >mdi-logout</v-icon
                    > -->
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item></v-toolbar
            >
            <v-divider></v-divider>
            <v-list dense nav>
              <v-list-item-group
                v-model="selectedItem"
                mandatory
                color="primary"
              >
                <v-list-item v-for="item in items" :key="item.title" link>
                  <v-row @click="directlink(item.path)">
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content class="text-h6">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content></v-row
                  >
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-card class="d-flex justify-center mb-6" flat tile>
              <v-card class="pa-2" outlined tile @click="OpenPopupChangePass">
                Thay đổi mật khẩu
              </v-card>
            </v-card>
            <v-card class="d-flex justify-center mb-6" flat tile>
              <v-card class="pa-2" outlined tile @click="logoutSys">
                Đăng xuất
                <v-icon>mdi-logout</v-icon>
              </v-card>
            </v-card>
          </v-navigation-drawer></v-col
        >
        <v-col md="10" sm="10" xs="10"
          ><router-view />
          <v-snackbar
            v-model="successMes"
            timeout="2000"
            absolute
            :color="colorMess"
            outlined
            right
            top
          >
            {{ text }}
          </v-snackbar></v-col
        >
      </v-row>
    </div>
    <div v-else>
      <Header />
      <router-view style="padding-bottom:200px"/>
      <Footer style="position: absolute; bottom: 0; width: 100%" />
    </div>
    <changepass :dialog="isShow" @close="closeChangePass"></changepass>
  </v-app>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import changepass from './views/login/changePassword'
import jwtDecode from 'jwt-decode'
import Header from './views/views/Header.vue'
import Footer from './views/views/Footer.vue'

export default {
  components: {
    changepass,
    Footer,
    Header
  },
  data: () => ({
    selectedItem: 0,
    items: [],
    right: null,
    isShow: false,
    successMes: false,
    text: '',
    timeout: 2000,
    colorMess: 'success'
  }),
  watch: {},
  computed: {
    ...mapState('login', ['is_login']),
    show () {
      var pathTru = false
      if (JSON.parse(localStorage.getItem('path')) != null) {
        for (
          var i = 0;
          i < JSON.parse(localStorage.getItem('path')).length;
          i++
        ) {
          if (
            window.location.pathname ==
            JSON.parse(localStorage.getItem('path'))[i].path
          ) {
            pathTru = true
            break
          }
        }
      }
      if (!pathTru) {
        this.$router.push({ path: '/' })
      }
      this.is_login
      if (localStorage.getItem('refresh_token') != null) {
        this.items = JSON.parse(localStorage.getItem('path'))
        return true
      }
      return false
    }
  },
  created () {
    if (JSON.parse(localStorage.getItem('path')) != null) {
      for (
        var i = 0;
        i < JSON.parse(localStorage.getItem('path')).length;
        i++
      ) {
        if (
          JSON.parse(localStorage.getItem('path'))[i].path ==
          window.location.pathname
        ) {
          this.selectedItem = i
        }
      }
    }
  },
  methods: {
    ...mapActions('login', ['logout']),
    directlink (item) {
      const decodedToken = jwtDecode(localStorage.getItem('refresh_token'))
      var expriedToken = decodedToken.exp * 1000 > new Date().getTime()
      if (localStorage.getItem('refresh_token') == null || !expriedToken) {
        this.logoutSys()
      }
      this.$router.push({ path: item })
    },
    logoutSys () {
      this.logout()
      this.$router.push({ name: 'login' })
    },
    OpenPopupChangePass () {
      this.isShow = true
    },
    closeChangePass (param, isClose) {
      if (isClose) {
        if (param.success) {
          this.text = param.message
          this.successMes = true
          this.colorMess = 'success'
          this.isShow = false
        } else {
          this.text = param.message
          this.successMes = true
          this.colorMess = 'red'
        }
      } else {
        this.isShow = false
      }
    }
  }
}
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  /* color: #2c3e50; */
  color: #2c3e50;
  background-color: white;
  font-family: "Roboto", sans-serif;
  /* font-family: 'Quicksand', sans-serif; */
  font-weight: 400;
  font-display: swap;
  font-style: normal;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
