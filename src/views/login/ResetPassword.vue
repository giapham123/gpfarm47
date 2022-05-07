<template>
  <v-container class="lighten-5">
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-icon style="margin-top:-3px">keyboard_backspace</v-icon>Back to aution house main page
      </v-col>
      <v-col cols="12" sm="4" align="center">Aution House Logo</v-col>
    </v-row>
    <v-row align="center" style="height: 700px">
      <v-col align="center">
        <div style="font-size: 30px">Password reset</div>
        <v-col>
          <v-col align="center" cols="12" sm="5">
            <v-text-field v-model="account.email" label="Email" solo class="changeColorInText"></v-text-field>
          </v-col>
        </v-col>
        <v-col align="center" style="margin-top:-40px">
          <a @click="backSignIn"><u>Back to sign in form</u></a>
        </v-col>
        <v-col align="center">
          <div class="my-2">
            <v-btn dark width="200">Reset password</v-btn>
          </div>
        </v-col>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col align="center">
        Don't have an account?
        <a @click="signUp"><u>Sign up</u></a>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    account: {
      email: null,
      password: null
    }
  }),
  watch: {
  },
  methods: {
    signUp () {
      this.$router.push({ name: 'regis' })
    },
    backSignIn () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style >
.changeColorInText div.v-input__slot {
  background-color: #dcdcdc !important;
}
</style>
