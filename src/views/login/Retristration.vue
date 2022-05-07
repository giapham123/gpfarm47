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
        <div style="font-size: 30px">Registration</div>
        <v-col>
          <v-col align="center" cols="12" sm="5">
            <v-text-field v-model="account.email" label="Email" solo class="changeColorInText"></v-text-field>
            <v-text-field  v-model="account.password" label="Password" solo style="padding-top:-20px" class="changeColorInText"></v-text-field>
            <v-text-field  v-model="account.password" label="Confirm Password" solo style="padding-top:-20px" class="changeColorInText"></v-text-field>
          </v-col>
        </v-col>
        <v-col align="center">
          <div class="my-2">
            <v-btn dark width="200">Register</v-btn>
          </div>
        </v-col>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col align="center">
        Don't have an account?
        <a @click="signInAccount"><u>Sign in</u></a>
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
    signInAccount () {
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
