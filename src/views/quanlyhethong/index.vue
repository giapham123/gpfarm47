<template>
  <v-card elevation="2" width="100%" height="100%">
    <!-- <loading :active.sync="loading" :can-cancel="false" color="#009688" /> -->
    <v-toolbar flat>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Quản Lý Hệ Thống
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item></v-toolbar
    >
    <v-divider></v-divider>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in itemsCongNo" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card color="basil" flat>
          <quanlysize />
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card color="basil" flat>
          <quanlytheloai/>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import quanlysize from './quanlysize'
import quanlytheloai from './quanlytheloai'
export default {
  components: {
    quanlysize,
    quanlytheloai
  },
  data: () => ({
    tab: null,
    itemsCongNo: ['Danh Sách Size', 'Danh Sách Loại SP'],
    isShowCustomerPayment: false,
    paramCustomerPayment: {},
    isShowPaymentDetail: false,
    loading: false,
    headers: [
      {
        text: 'STT',
        align: 'start',
        sortable: false,
        value: 'stt',
        width: '50px',
        class: 'primary white--text'
      },
      {
        text: 'TÊN',
        value: 'customerNm',
        width: '150px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'SDT',
        value: 'phone',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'ĐỊA CHỈ',
        value: 'address',
        width: '400px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'TỔNG SỐ TIỀN',
        value: 'tongtien',
        width: '150px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'TỔNG SỐ TIỀN CÒN LẠI',
        value: 'congno',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'HÀNH ĐỘNG',
        value: 'actions',
        width: '150px',
        sortable: false,
        class: 'primary white--text'
      }
    ],
    listCustomers: [],
    paramPayment: {},
    customer_phone: ''
  }),
  created () {
    this.getCustomer()
  },
  watch: {
    listCustomers () {
      for (var i = 0; i < this.listCustomers.length; i++) {
        this.listCustomers[i].stt = i + 1
      }
    }
  },
  methods: {
    ...mapActions('quanlycongno', ['getAllCustomers', 'searchCustomer']),
    async getCustomer () {
      var result = await this.getAllCustomers()
      this.listCustomers = result.data
    },
    detailPayment (item) {
      this.paramPayment = item
      this.isShowPaymentDetail = true
    },
    closePaymentDetail () {
      this.isShowPaymentDetail = false
    },
    closeCustomerPayment () {
      this.getCustomer()
      this.isShowCustomerPayment = false
    },
    async searchCustomerPayment () {
      var result = await this.searchCustomer({
        customer_phone: this.customer_phone
      })
      this.listCustomers = result.data
    },
    showdialogPayment () {
      this.isShowCustomerPayment = true
    }
  }
}
</script>
<style scoped>
#preview {
  display: flex;
  justify-content: left;
  align-items: left;
}

#preview img {
  max-width: 100%;
  max-height: 100px;
}
.elevation-1 tr th:first-of-type,
td:first-of-type {
  background-color: blue;
}
</style>
