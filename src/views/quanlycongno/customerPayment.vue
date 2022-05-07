<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Chi Tiết Thanh Toán</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined small
                color="indigo" text @click="closePopup">
              Cancel
            </v-btn>
            <v-btn outlined small
                color="indigo" text @click="btnPayment">
              Save
            </v-btn>
          </v-card-actions>
          <v-card elevation="2">
            <v-col>
              <v-select
                label="Chọn SDT"
                v-model="customerSelected"
                :items="customer"
                item-text="phone"
                item-value="phone"
                dense
              ></v-select>
              <v-text-field
                label="Tên KH"
                dense
                v-model="customerNm"
                disabled
              ></v-text-field> </v-col
            ><v-col>
              <v-text-field
                label="Nhập Số Tiền"
                dense
                v-model="money_payment"
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
    dialog: false,
    param: Object
  },
  data: () => ({
    money_payment: '',
    customerSelected: '',
    customer: [],
    customerNm: ''
  }),
  computed: {},
  watch: {
    customerSelected () {
      for (var i = 0; i < this.customer.length; i++) {
        if (this.customer[i].phone == this.customerSelected) {
          this.customerNm = this.customer[i].customerNm
        }
      }
    }
  },
  created () {
    this.getAllCustomer()
  },
  methods: {
    ...mapActions('quanlycongno', ['detailPaymentViews', 'getAllCustomers']),
    closePopup () {
      this.$emit('close')
    },
    async getAllCustomer () {
      var result = await this.getAllCustomers()
      this.customer = result.data
    },
    async btnPayment () {
      var param = {
        customer_phone: this.customerSelected,
        money_payment: this.money_payment
      }
      var result = await this.detailPaymentViews(param)
      this.closePopup()
    }
  }
}
</script>
