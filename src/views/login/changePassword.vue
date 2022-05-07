<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Thay đổi mật khẩu</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="btnchangePassword"> Save </v-btn>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          </v-card-actions>
          <v-card>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="oldPass"
                label="Mật khẩu cũ"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field
                v-model="newPass"
                label="Mật khẩu mới"
                dense
              ></v-text-field>
            </v-col>
          </v-card>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    dialog: false
  },
  data: () => ({
    oldPass: '',
    newPass: ''
  }),
  computed: {},
  watch: {},
  created () {},
  methods: {
    ...mapActions('login', ['changePassword']),
    close (param, isClose) {
      this.$emit('close', param, isClose)
    },
    async btnchangePassword () {
      var param = {
        username: localStorage.getItem('user'),
        password: this.oldPass,
        newPassword: this.newPass
      }
      var result = await this.changePassword(param)
      if (result.success) {
        this.oldPass = ''
        this.newPass = ''
      }
      this.close(result, true)
    }
  }
}
</script>
