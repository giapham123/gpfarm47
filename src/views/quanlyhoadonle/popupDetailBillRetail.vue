<template>
  <v-dialog v-model="dialog" max-width="1200px" persistent>
    <v-card elevation="2">
      <v-card-title>
        <span class="headline">Chi Tiết Hóa Đơn Bán Lẻ</span>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listDataProduct"
        class="elevation-1"
        @click:row="displayimage"
        dense
      >
        <template v-slot:item.price="item">
          {{ new Intl.NumberFormat().format(item.item.price) }}
        </template>
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-btn outlined small
                color="indigo" text @click="close">
              Cancel
            </v-btn></v-toolbar
          >
        </template>
        <!-- <template v-slot:item.actions="item">
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template> -->
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
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    dialog: false,
    dataInWarehouse: Object
  },
  data: () => ({
    images: [],
    headers: [
      {
        text: 'Tên Sản Phẩm',
        align: 'start',
        sortable: false,
        value: 'name',
        width: '50px',
        class: 'primary white--text'
      },
      { text: 'Kích Thước', value: 'size', width: '200px', sortable: false, class: 'primary white--text' },
      { text: 'Giá (VND)', value: 'price', width: '200px', sortable: false, class: 'primary white--text' },
      {
        text: 'Ngày xuất',
        value: 'created_dt',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      }
    ],
    listDataProduct: [],
    customer_name: ''
  }),
  computed: {},
  watch: {
    dataInWarehouse () {
      this.customer_name = this.dataInWarehouse.customer_name
      this.detailBill(this.customer_name)
    }
  },
  created () {},
  methods: {
    ...mapActions('quanlyhoadon', ['getDetailBillForRetail', 'layhinh']),
    async detailBill () {
      this.images = []
      var tongtien = 0
      var result = await this.getDetailBillForRetail({
        customer_name: this.dataInWarehouse.customer_name
      })
      this.listDataProduct = result.data
      for (var i = 0; i < this.listDataProduct.length; i++) {
        tongtien += this.listDataProduct[i].price
      }
      this.listDataProduct.push({ name: 'Tổng Tiền', price: tongtien })
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
    }
  }
}
</script>
<style scoped>
.elevation-1 tr th:first-of-type, td:first-of-type {
  background-color: blue;
}
</style>
