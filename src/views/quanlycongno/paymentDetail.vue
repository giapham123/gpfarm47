<template>
  <v-dialog v-model="dialog" max-width="1200px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Chi Tiết Thanh Toán</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined small
                color="indigo" text @click="close"> Cancel </v-btn>
          </v-card-actions>
          <v-card elevation="2">
            <v-data-table
              :headers="headers"
              :items="listDataPaymentDetails"
              class="elevation-1"
              dense
            >
              <template v-slot:top>
                <v-toolbar flat>
                  Danh Sách Hàng Tồn Kho
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>
                <template v-slot:item.money_payment="item">
             {{new Intl.NumberFormat().format(item.item.money_payment)}}
          </template></v-data-table
          ></v-card>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    dialog: false,
    param: Object
  },
  data: () => ({
    selected: [],
    new: 1,
    orderComplete: [],
    images: [],
    headers: [
      { text: 'STT', value: 'stt', width: '50px', sortable: false, class: 'primary white--text' },
      { text: 'SỐ TIỀN ĐÃ THANH TOÁN', value: 'money_payment', width: '200px', sortable: false, class: 'primary white--text' },
      {
        text: 'NGÀY THANH TOÁN',
        value: 'createddate',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      }
    ],
    listDataPaymentDetails: [],
    customer_phone: ''
  }),
  computed: {},
  watch: {
    param () {
      this.customer_phone = this.param.item.phone
      this.getDetailPayment({ customer_phone: this.customer_phone })
    },
    listDataPaymentDetails () {
      for (var i = 0; i < this.listDataPaymentDetails.length; i++) {
        this.listDataPaymentDetails[i].stt = i + 1
      }
    }
  },
  created () {
  },
  methods: {
    ...mapActions('quanlycongno', ['getAllDetailPayment']),
    close () {
      this.$emit('close')
    },
    async getDetailPayment (param) {
      var result = await this.getAllDetailPayment(param)
      this.listDataPaymentDetails = result.data
    }

  }
}
</script>
<style scoped>

.elevation-1 tr th:first-of-type, td:first-of-type {
  background-color: blue;
}
</style>
