<template>
  <v-card elevation="2"  width="100%" height="100%">
    <loading :active.sync="loading" :can-cancel="false" color="#009688" />
    <v-toolbar flat>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Quản Lý Sản Phẩm </v-list-item-title>
        </v-list-item-content>
      </v-list-item></v-toolbar
    >
    <v-divider></v-divider>
    <v-container>
      <v-card width="100%">
        <v-data-table
          :headers="headers"
          :items="listDataProduct"
          class="elevation-1"
          item-key="stt"
          @click:row="displayimage"
          dense

        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-col cols="12" sm="6" md="2">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="dates"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <v-date-picker locale="vi" v-model="dates" range type="month"></v-date-picker
                  ><v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(dates)">
                    OK
                  </v-btn>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      dense
                      v-model="dateRangeText"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field
                  ></template>
                </v-menu> </v-col
              ><v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="name"
                  label="Tên Sản Phẩm"
                  dense
                ></v-text-field></v-col
              ><v-btn
                small
                outlined
                color="indigo"
                dark
                class="mb-2"
                @click="searchData"
              >
                Tìm Kiếm
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn
                small
                outlined
                color="indigo"
                dark
                class="mr-2"
                @click="showErrorPupop"
              >
                Hàng lỗi
              </v-btn>
              <v-btn
                small
                outlined
                color="indigo"
                dark
                class="mr-2"
                @click="showDialogExport"
              >
                Xuất hàng hóa
              </v-btn>
              <v-btn
                small
                outlined
                color="indigo"
                dark
                class="mr-2"
                @click="showPopupAddProduct"
              >
                Thêm Hàng Hoá
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.price="item">
             {{new Intl.NumberFormat().format(item.item.price)}}
          </template>
          <template v-slot:item.actions="item">
            <v-btn color="primary" small @click="detailproduct(item)">
              Chi Tiết
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <v-row style="width: 700px">
      <v-col cols="4" sm="4" v-for="(url, index) in images" :key="index">
        <v-img
          :src="url.file"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        ></v-img>
      </v-col>
    </v-row>
    <popupExport
      :dialog="isShow"
      :dataInWarehouse="datawarehouse"
      @close="closeExport"
    ></popupExport>
    <errorProduct
      :dialog="isShowErrorPup"
      :dataInWarehouse="datawarehouse"
      @close="closeError"
    ></errorProduct>
    <detailProduct
      :dialog="isShowDetail"
      :params="dataShowDetail"
      @close="closedetail"
    ></detailProduct>
     <addProduct
      :dialog="isShowaddProduct"
      @close="closePopupAddProduct"
    ></addProduct>
  </v-card>
</template>
<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapActions } from 'vuex'
import popupExport from './popupExport'
import errorProduct from './errorProduct'
import detailProduct from './detailProduct'
import addProduct from './addProduct'
import moment from 'moment'
export default {
  components: {
    popupExport,
    errorProduct,
    detailProduct,
    Loading,
    addProduct
  },
  data: () => ({
    loading: false,
    name: '',
    menu: false,
    isShowaddProduct: false,
    dates: [
      new Date(Date.now() - 30 * 24 * 60 * 60 * 2000)
        .toISOString()
        .substr(0, 7),
      new Date().toISOString().substr(0, 7)
    ],
    isShowDetail: false,
    dataShowDetail: {},
    isShowErrorPup: false,
    datawarehouse: [],
    isShow: false,
    images: [],
    headers: [
      {
        text: 'MÃ SP',
        align: 'start',
        sortable: false,
        value: 'product_code',
        width: '50px',
        class: 'primary white--text'
      },
      { text: 'TÊN', value: 'name', width: '200px', sortable: false, class: 'primary white--text' },
      { text: 'KÍCH THƯỚC', value: 'size', width: '100px', sortable: false, class: 'primary white--text' },
      { text: 'MÀU SẮC', value: 'color_nm', width: '100px', sortable: false, class: 'primary white--text' },
      { text: 'SỐ LƯƠNG NHẬP', value: 'soluong', width: '100px', sortable: false, class: 'primary white--text', align: 'center' },
      { text: 'SỐ LƯỢNG TỒNG KHO', value: 'quantityUnit', width: '100px', sortable: false, class: 'primary white--text', align: 'center' },
      { text: 'GIÁ', value: 'price', width: '100px', sortable: false, class: 'primary white--text', align: 'center' }
      // { text: "HÀNH ĐỘNG", value: "actions", width: "50px", sortable: false ,class: "primary white--text" },
    ],
    listDataProduct: []
  }),

  computed: {
    dateRangeText () {
      if (this.dates[0] < this.dates[1]) {
        return (
          moment(this.dates[0]).format('MM/YYYY') +
          ' ~ ' +
          moment(this.dates[1]).format('MM/YYYY')
        )
      } else {
        return (
          moment(this.dates[1]).format('MM/YYYY') +
          ' ~ ' +
          moment(this.dates[0]).format('MM/YYYY')
        )
      }
    }
  },

  watch: {
    listDataProduct () {
      for (let i = 0; i < this.listDataProduct.length; i++) {
        this.listDataProduct[i].stt = i
      }
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    ...mapActions('quanlytonkho', ['laytatcasanphamtrongkho', 'layhinh']),
    async showDialogExport () {
      this.datawarehouse = this.listDataProduct
      this.isShow = true
    },
    showErrorPupop () {
      this.isShowErrorPup = true
    },
    closeError () {
      this.initialize()
      this.isShowErrorPup = false
    },
    closeExport (item) {
      this.loading = true
      this.initialize()
      // if (item.status == 200){
      //   this.isShow = false;
      //   this.loading = false;
      // }
      this.isShow = false
      this.loading = false
    },
    detailproduct (item) {
      this.dataShowDetail = item.item
      this.isShowDetail = true
    },
    closedetail () {
      this.isShowDetail = false
    },
    async initialize () {
      var param = {
        from_dt: this.dates[0],
        to_dt: this.dates[1],
        name: this.name
      }
      var result = await this.laytatcasanphamtrongkho(param)
      this.listDataProduct = result.data
    },
    async displayimage (row) {
      var result = await this.layhinh({ product_id: row.product_code })

      for (var i = 0; i < result.data.length; i++) {
        result.data[i].file = process.env.VUE_APP_SERVER + result.data[i].file
      }
      this.images = result.data
    },
    async searchData () {
      if (this.dates[0] > this.dates[1]) {
        var tempDates = null
        tempDates = this.dates[0]
        this.dates[0] = this.dates[1]
        this.dates[1] = tempDates
      }
      this.initialize()
    },
    showPopupAddProduct () {
      this.isShowaddProduct = true
    },
    closePopupAddProduct () {
      this.initialize()
      this.isShowaddProduct = false
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
.elevation-1 tr th:first-of-type, td:first-of-type {
  background-color: blue;
}
</style>
