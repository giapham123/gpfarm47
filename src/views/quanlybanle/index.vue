<template>
  <v-card elevation="2" height="100%">
    <!-- <loading :active.sync="loading" :can-cancel="false" color="#009688" /> -->
    <v-toolbar flat>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Quản Lý Bán Lẻ </v-list-item-title>
        </v-list-item-content>
      </v-list-item></v-toolbar
    >
    <v-divider></v-divider>
    <v-container>
      <v-card elevation="2">
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
              <v-row style="padding-left: 5px">
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Tên Sản Phẩm"
                    dense
                    v-model="name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-btn
                    outlined
                    small
                    color="indigo"
                    @click="searchDataForRetail"
                  >
                    Tìm Kiếm
                  </v-btn>
                </v-col></v-row
              >
              <v-spacer></v-spacer>
              <v-btn
                outlined
                small
                color="indigo"
                class="mr-2"
                @click="showdialogRetail"
              >
                Lấy Hàng Lẻ
              </v-btn>
              <v-badge :content="ordernum" color="green"
                ><v-icon @click="showCart">shopping_cart</v-icon>
              </v-badge>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="item">
            <v-btn outlined small color="indigo" @click="addtoorder(item)">
              Thêm vào giỏ
            </v-btn>
            <v-icon small @click="deleteRetailProduct(item.item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card></v-container
    >
    <v-row style="width: 700px">
      <v-col cols="4" sm="4" v-for="(url, index) in images" :key="index">
        <v-img
          :src="url.file"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        ></v-img>
      </v-col>
      <popupChooseForRetail
        :dialog="isShowgetRetail"
        @close="closeShowGetRetail"
        @dataForRetail="dataRetail"
      ></popupChooseForRetail>
      <detailProduct
        :dialog="isShowDetail"
        :params="dataShowDetail"
        @close="closedetail"
        @finishedExportRetail="finishedExportForRetail"
      ></detailProduct>
    </v-row>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'
import detailProduct from './detailProduct'
import popupChooseForRetail from './popupChooseForRetail'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: {
    detailProduct,
    popupChooseForRetail,
    Loading
  },
  data: () => ({
    loading: false,
    isShowgetRetail: false,
    isShowDetail: false,
    dataShowDetail: [],
    cart: [],
    ordernum: '0',
    name: '',
    size: {
      selected: '',
      item: []
    },
    images: [],
    headers: [
      {
        text: 'STT',
        align: 'start',
        sortable: false,
        value: 'stt',
        width: '50px',
        class: 'primary white--text'
      },
      // {
      //   text: 'Mã SP',
      //   align: 'start',
      //   sortable: false,
      //   value: 'product_cd',
      //   width: '100px'
      // },
      {
        text: 'TÊN',
        value: 'name',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'BLOCK',
        value: 'block',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'MÀU SẮC',
        value: 'color_nm',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'SIZE',
        value: 'size_cd',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'GIÁ',
        value: 'price',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'HÀNH ĐỘNG',
        value: 'actions',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      }
    ],
    listDataProduct: []
  }),

  computed: {},

  watch: {
    listDataProduct () {
      for (var i = 0; i < this.listDataProduct.length; i++) {
        this.listDataProduct[i].stt = i + 1
      }
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    ...mapActions('quanlybanle', [
      'searchDataInRetailView',
      'layhinh',
      'laysize',
      'getDataInRetailView',
      'deleteProductDetail'
    ]),
    showdialogRetail () {
      this.isShowgetRetail = true
    },

    closeShowGetRetail () {
      this.isShowgetRetail = false
    },
    closedetail () {
      this.isShowDetail = false
    },
    async deleteRetailProduct (item) {
      var result = await this.deleteProductDetail(item.id)
      if (result.statusText == 'OK') {
        this.initialize()
      }
    },
    async initialize () {
      this.loading = true
      var result = await this.getDataInRetailView()
      var resultSize = await this.laysize()
      this.listDataProduct = result.data
      this.size.item = resultSize.data
      this.loading = false
    },
    async displayimage (row) {
      var result = await this.layhinh({ product_id: row.product_cd })
      for (var i = 0; i < result.data.length; i++) {
        result.data[i].file = process.env.VUE_APP_SERVER + result.data[i].file
      }
      this.images = result.data
    },
    async searchDataForRetail () {
      this.loading = true
      var params = {
        name: this.name
      }
      var result = await this.searchDataInRetailView(params)
      this.listDataProduct = result.data
      this.loading = false
    },
    addtoorder (item) {
      this.cart.push(item.item)
      this.ordernum = this.cart.length
      this.listDataProduct.splice(this.listDataProduct.indexOf(item.item), 1)
    },
    showCart () {
      this.dataShowDetail = this.cart
      this.isShowDetail = true
    },
    dataRetail () {
      this.initialize()
    },
    finishedExportForRetail () {
      this.dataShowDetail = []
      this.cart = []
      this.ordernum = 0
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
