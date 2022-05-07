<template>
  <v-dialog v-model="dialog" max-width="1200px" persistent>
    <v-card elevation="2">
      <v-card-title>
        <span class="headline">Chi Tiết Hóa Đơn</span>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listDataProduct"
        class="elevation-1"
        @click:row="displayimage"
        dense
      >
        <template v-slot:top>
          <v-toolbar flat>
            {{customerNm}} - {{customerPhone}}
            <v-spacer></v-spacer>

            <!-- <v-btn color="blue darken-1" text @click="download">
              Download Excel
            </v-btn> -->

            <v-btn outlined small
                color="indigo" text @click="close">
              Cancel
            </v-btn></v-toolbar
          >
        </template>
        <template v-slot:item.thanhtien="item">
          {{ new Intl.NumberFormat().format(item.item.thanhtien) }}
        </template>
        <template v-slot:item.actions="item" v-if="is_pay != 'Thanh Toán Rồi'">
          <v-icon
            v-if="item.item.actions != 'no'"
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <v-card-text>
        <v-row style="width: 700px; height: 200px">
          <v-col cols="4" sm="4" v-for="(url, index) in images" :key="index">
            <v-img
              :src="url.file"
              gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <deletePopup
      @finished="finishDelete"
      :dialogDelete="isdeleteShow"
      @closeDelete="closePopupDelete"
      :params="paramsToDelete"
    ></deletePopup>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import deletePopup from './popupDelete'
export default {
  components: {
    deletePopup
  },
  props: {
    dialog: false,
    dataInWarehouse: Object
  },
  data: () => ({
    is_pay: 'Chưa Thanh Toán',
    paramsToDelete: {},
    isdeleteShow: false,
    images: [],
    headers: [
      { text: 'TÊN', value: 'name', width: '200px', sortable: false, class: 'primary white--text' },
      { text: 'SIZE', value: 'size', width: '100px', sortable: false, class: 'primary white--text' },
      { text: 'MÀU SẮC', value: 'color_nm', width: '200px', sortable: false, class: 'primary white--text' },
      { text: 'SỐ LƯỢNG', value: 'quantity', width: '100px', sortable: false, class: 'primary white--text' },
      { text: 'GIÁ (VND)', value: 'price', width: '100px', sortable: false, class: 'primary white--text' },
      {
        text: 'THÀNH TIỀN (VND)',
        value: 'thanhtien',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      }, {
        text: 'Hành động',
        value: 'actions',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      }
    ],
    listDataProduct: [],
    order_cd: '',
    customerNm: '',
    customerPhone: ''
  }),
  computed: {},
  watch: {
    dataInWarehouse () {
      this.order_cd = this.dataInWarehouse.order_cd
      this.is_pay = this.dataInWarehouse.is_payment
      this.customerNm = this.dataInWarehouse.customer_name
      this.customerPhone = this.dataInWarehouse.customerPhone

      this.detailBill(this.order_cd)
    }
  },
  created () {},
  methods: {
    ...mapActions('quanlyhoadon', ['getBillInOrder', 'layhinh', 'exportExcelBillInOrder']),
    async detailBill () {
      this.images = []
      var tongtien = 0
      var result = await this.getBillInOrder({
        order_cd: this.dataInWarehouse.order_cd
      })
      for (var i = 0; i < result.data.length; i++) {
        result.data[i].thanhtien =
          result.data[i].quantity * result.data[i].price
        tongtien += result.data[i].thanhtien
      }
      if (this.is_pay != 'Thanh Toán Rồi') {
        // this.headers.push({
        //   text: "Hành động",
        //   value: "actions",
        //   width: "200px",
        //   sortable: false,class: "primary white--text"
        // });
        result.data.push({
          name: 'Tổng tiền',
          thanhtien: tongtien,
          actions: 'no'
        })
      } else {
        result.data.push({
          name: 'Tổng tiền',
          thanhtien: tongtien,
          actions: ''
        })
      }
      this.listDataProduct = result.data
    },
    async displayimage (row) {
      this.images = []
      var result = await this.layhinh({ product_id: row.product_code })

      for (var i = 0; i < result.data.length; i++) {
        result.data[i].file = process.env.VUE_APP_SERVER + result.data[i].file
      }
      this.images = result.data
    },
    close () {
      this.$emit('close')
    },
    deleteItem (item) {
      item.item.order_cd = this.order_cd
      this.paramsToDelete = item.item
      this.isdeleteShow = true
    },
    closePopupDelete () {
      this.isdeleteShow = false
    },
    async finishDelete () {
      this.images = []
      this.listDataProduct = []
      var result = await this.getBillInOrder({
        order_cd: this.order_cd
      })
      this.listDataProduct = result.data
      this.detailBill(this.order_cd)
    },
    async download () {
      var result = await this.exportExcelBillInOrder({
        order_cd: this.dataInWarehouse.order_cd,
        customer_name: this.dataInWarehouse.customer_name,
        created_dt: this.dataInWarehouse.created_dt,
        phone: this.dataInWarehouse.customerPhone
      })

      var raw = window.atob(result.data)
      var uInt8Array = new Uint8Array(raw.length)
      for (var i = 0; i < raw.length; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      const link = document.createElement('a')
      const blob = new Blob([uInt8Array], { type: 'application/vnd.ms-excel' })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', 'HoaDon')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>
<style scoped>
.elevation-1 tr th:first-of-type, td:first-of-type {
  background-color: blue;
}
</style>
