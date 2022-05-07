<template>
  <v-dialog v-model="dialog" max-width="1200px" persistent>
    <v-card>
      <loading :active.sync="loading" :can-cancel="false" color="#009688" />
      <v-card-title>
        <span class="headline">Xuất hàng hóa</span>
      </v-card-title>
      <v-alert :value="errorvalue" dense outlined type="error">
        {{ error }}
      </v-alert>
      <v-card-text>
        <v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined small
                color="indigo" text @click="close"> Cancel </v-btn>
            <v-btn outlined small
                color="indigo" text @click="save"> Xuất Hàng </v-btn>
          </v-card-actions>
          <v-card elevation="2">
            <v-data-table
              v-model="selected"
              item-key="stt"
              :headers="headers"
              :items="listDataProduct"
              show-select
              class="elevation-1"
              @click:row="displayimage"
              dense
            >
              <template v-slot:top>
                <v-toolbar flat ref="form">
                  Danh Sách Hàng Tồn Kho
                  <v-spacer></v-spacer>
                  <v-col cols="2" sm="2">
                    <v-text-field
                      ref="customer_name"
                      :rules="[() => !!customer_name || 'Bắt buộc']"
                      v-model="customer_name"
                      label="Tên Khách Hàng"
                      dense
                    ></v-text-field
                  ></v-col>
                  <v-col cols="2" sm="2"
                    ><v-text-field
                      ref="phone"
                      :rules="[() => !!phone || 'Bắt buộc']"
                      v-model="phone"
                      label="Số Điện Thoại"
                      dense
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6" sm="6"
                    ><v-text-field
                      ref="address"
                      :rules="[() => !!address || 'Bắt buộc']"
                      v-model="address"
                      label="Địa Chỉ"
                      dense
                    ></v-text-field
                  ></v-col>
                </v-toolbar>
              </template>
              <template v-slot:item.price="item">
                {{ new Intl.NumberFormat().format(item.item.price) }}
              </template>
              <template v-slot:item.out_quantity="props">
                <v-select
                  :items="props.item.input"
                  label="Chọn số lượng"
                  dense
                  solo
                  v-model="props.item.out_quantity"
                  style="margin-bottom:-25px !important"
                ></v-select>
              </template> </v-data-table
          ></v-card>
        </v-container>
      </v-card-text>
      <v-row style="width: 700px">
        <v-col cols="4" sm="4" v-for="(url, index) in images" :key="index">
          <v-img
            :src="url.file"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          ></v-img>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: {
    Loading
  },
  props: {
    dialog: false,
    dataInWarehouse: Array
  },
  data: () => ({
    error: '',
    errorvalue: false,
    loading: false,
    formHasErrors: false,
    customer_name: '',
    phone: '',
    address: '',
    selected: [],
    new: 1,
    orderComplete: [],
    images: [],
    order: {
      selected: [],
      items: []
    },
    product: {
      selected: [],
      items: []
    },
    quantity: [],
    // order_cd: "",
    headers: [
      { text: 'TÊN', value: 'name', width: '200px', sortable: false, class: 'primary white--text' },
      { text: 'SIZE', value: 'size', width: '50px', sortable: false, class: 'primary white--text' },
      // { text: "Số lượng", value: "quantity", width: "200px", sortable: false },
      { text: 'MÀU', value: 'color_nm', width: '100px', sortable: false, class: 'primary white--text' },
      {
        text: 'SỐ LƯỢNG TỒN KHO',
        value: 'quantityUnit',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      },
      { text: 'GIÁ', value: 'price', width: '100px', sortable: false, class: 'primary white--text' },
      {
        text: 'CHỌN SỐ LƯỢNG XUẤT',
        value: 'out_quantity',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      }
    ],
    listDataProduct: [],
    selectedTable: []
  }),
  computed: {
    form () {
      return {
        customer_name: this.customer_name,
        phone: this.phone,
        address: this.address
      }
    }
  },

  watch: {
    dataInWarehouse () {
      this.product.items = this.dataInWarehouse
      this.listDataProduct = this.dataInWarehouse
    },
    listDataProduct () {
      for (var i = 0; i < this.listDataProduct.length; i++) {
        this.listDataProduct[i].input = []
        for (var j = 1; j <= this.listDataProduct[i].quantityUnit; j++) {
          this.listDataProduct[i].input.push(j)
        }
      }
    }
  },
  created () {
    // this.loadingData();
    this.selected = []
  },
  methods: {
    ...mapActions('quanlytonkho', [
      'layTatCaOrder',
      'luuOrder',
      'createOrder',
      'layhinh',
      'exportExcelBillInOrder'
    ]),
    close () {
      this.selected = []
      this.customer_name = ''
      this.address = ''
      this.phone = ''
      this.$emit('close')
      this.errorMessages = []
      this.formHasErrors = false
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset()
      })
    },
    async loadingData () {
      var resultOrder = await this.layTatCaOrder()
      this.order.items = resultOrder.data
      var result = await this.laytatcasanphamtrongkho(param)
      this.listDataProduct = result.data
    },
    async save () {
      this.loading = true
      this.formHasErrors = false
      if (this.selected.length == 0) {
        this.error = 'Bạn chưa chọn sản phẩm'
        this.errorvalue = true
        this.loading = false
        setTimeout(() => {
          this.errorvalue = false
        }, 5000)
        return
      }
      for (let i = 0; i < this.selected.length; i++) {
        if (!this.selected[i].hasOwnProperty('out_quantity')) {
          this.error = 'Nhập số lượng muốn xuất'
          this.errorvalue = true
          this.loading = false
          setTimeout(() => {
            this.errorvalue = false
          }, 5000)
          return
        }
      }
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true)
        if (!this.form[f]) {
          this.formHasErrors = true
          this.loading = false
        }
      })
      if (!this.formHasErrors) {
        var resultOrder = await this.createOrder({
          customer_name: this.customer_name,
          address: this.address,
          phone: this.phone
        })
        var result = await this.luuOrder(this.selected)
        if (resultOrder.status = 200) {
          this.selected = []
          var today = new Date()
          var dd = String(today.getDate()).padStart(2, '0')
          var mm = String(today.getMonth() + 1).padStart(2, '0')
          var yyyy = today.getFullYear()

          today = mm + '/' + dd + '/' + yyyy
          var resultExcel = await this.exportExcelBillInOrder({
            order_cd: resultOrder.data.order_cd,
            customer_name: resultOrder.data.customer_name,
            created_dt: today,
            phone: this.phone
          })

          var raw = window.atob(resultExcel.data)
          var uInt8Array = new Uint8Array(raw.length)
          for (var i = 0; i < raw.length; ++i) {
            uInt8Array[i] = raw.charCodeAt(i)
          }
          const link = document.createElement('a')
          const blob = new Blob([uInt8Array], {
            type: 'application/vnd.ms-excel'
          })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.setAttribute('download', 'HoaDon')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.loading = false
        }
        this.$emit('close', result)
      }
    },
    async displayimage (row) {
      var result = await this.layhinh({ product_id: row.product_code })

      for (var i = 0; i < result.data.length; i++) {
        result.data[i].file = process.env.VUE_APP_SERVER + result.data[i].file
      }
      this.images = result.data
    }
  }
}
</script>

<style scoped>
.elevation-1 tr th:first-of-type, td:first-of-type {
  background-color: blue;
}
</style>
