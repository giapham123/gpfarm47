<template>
  <v-container class="lighten-5">
    <v-row no-gutters>
      <!-- <v-col cols="12" sm="4" align="center">Login</v-col> -->
    </v-row>
    <v-row align="center" style="height: 700px">
      <v-col align="center">
        <div style="font-size: 30px">Sign In</div>
        <v-col>
          <v-col align="center" cols="12" sm="5">
            <v-alert dense outlined type="error" v-if="is_showAlert == true"
              >Sai tên đăng nhập hoặc mật khâu
            </v-alert>
            <v-text-field
              v-model="account.username"
              label="Tên đăng nhập"
              solo
              class="changeColorInText"
            ></v-text-field>
            <v-text-field
              v-model="account.password"
              label="Mật khẩu"
              type="password"
              solo
              style="padding-top: -20px"
              class="changeColorInText"
            ></v-text-field>
          </v-col>
        </v-col>
        <!-- <v-col align="center" style="margin-top:-40px">
          <a @click="forgotPassword"><u>Forgot password?</u></a>
        </v-col> -->
        <v-col align="center">
          <div class="my-2">
            <v-btn dark width="200" @click="login">Đăng nhập</v-btn>
          </div>
        </v-col>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <!-- <v-col align="center">
        Don't have an account?
        <a @click="signUp"><u>Sign up</u></a>
      </v-col> -->
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    is_showAlert: false,
    account: {
      username: null,
      password: null
    }
  }),
  watch: {},
  methods: {
    ...mapActions('login', ['loginForm']),
    async login () {
      var result = await this.loginForm(this.account)
      if (!result.is_login) {
        this.is_showAlert = true
      }
      setTimeout(() => {
        this.is_showAlert = false
      }, 5000)
    }
  }
}
</script>
<style >
.changeColorInText div.v-input__slot {
  background-color: #dcdcdc !important;
}
</style>
