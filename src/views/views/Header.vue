<template>
  <v-app-bar style="position: sticky; top: 0" absolute color="white" dense>
    <v-img
      @click="directlinkHome"
      style="margin-top: 10px; cursor: pointer"
      max-height="50"
      max-width="250"
      aspect-ratio="1.7"
      contain
      :src="require('../../../assets/logo.jpg')"
    />
    <v-spacer></v-spacer>
    <!-- <v-subheader>Chất Lượng và Uy Tín Làm Hàng Đầu</v-subheader> -->
    <v-spacer></v-spacer>
    <v-subheader>Hotline Đặt Hàng: 0965 399 389</v-subheader>
    <!-- <v-subheader @click="directlinkLogin"
      ><v-btn x-small text>Tài Khoản</v-btn></v-subheader
    > -->
    <template v-slot:extension class="justify-center">
      <v-container>
        <v-tabs
          fixed-tabs
          show-arrows
          center-active
          class="text-h4"
          v-model="modelTabs"
        >
          <v-tab @click="directlinkHome" class="headerStyle">Trang Chủ</v-tab>
          <v-tab @click="directlinkLsProduct()" class="headerStyle"
            >Mật Ong</v-tab
          >
          <v-tab @click="directlinkLsProductNghe()" class="headerStyle"
            >Nghệ</v-tab
          >
            <v-tab @click="directlinkLsProductTieu()" class="headerStyle"
            >Tiêu<ul></ul></v-tab
          >
            <v-tab @click="directlinkLsProductCacao()" class="headerStyle"
            >Cacao</v-tab
          >
            <v-tab @click="directlinkLsProductNongSanKhac()" class="headerStyle"
            >Nông Sản Khác</v-tab
          >
                      <!-- <v-tab @click="directlinkLuckyCycle()" class="headerStyle"
            >Vòng Quay May Mắn</v-tab
          > -->
        </v-tabs>
      </v-container>
    </template>
  </v-app-bar>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({ modelTabs: null }),
  watch: {},
  computed: {},
  created () {
    if (sessionStorage.getItem('tabs') == '/listproduct/TTBG') {
      this.modelTabs = 1
      this.$router.push({ path: '/listproduct/TTBG' })
    } else if (sessionStorage.getItem('tabs') == '/listproduct/TTBT') {
      this.modelTabs = 2
      this.$router.push({ path: '/listproduct/TTBT' })
    }
  },
  methods: {
    ...mapActions('views', ['changeURL']),
    directlinkHome () {
      this.$router.push({ path: '/' })
      sessionStorage.setItem('tabs', window.location.pathname)
    },
    directlinkLsProduct () {
      this.$router.push({ path: '/mat-ong' })
    },
    directlinkLogin () {
      this.$router.push({ path: '/login' })
    },
    directlinkLsProductNghe () {
      this.$router.push({ path: '/nghe' })
    },
    directlinkLsProductTieu () {
      this.$router.push({ path: '/tieu' })
    },
    directlinkLsProductNongSanKhac () {
      this.$router.push({ path: '/nong-san-khac' })
    },
    directlinkLsProductCacao () {
      this.$router.push({ path: '/cacao' })
    },
    directlinkLuckyCycle () {
      this.$router.push({ path: '/lucky-cycle' })
    }
  }
}
</script>
<style scoped>
.headerStyle {
  color: black !important;
  /* font-weight:bold; */
  font-size: 15px;
}
</style>
