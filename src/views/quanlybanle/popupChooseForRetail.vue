<template>
  <v-dialog v-model="dialog" max-width="1200px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Xuất hàng hóa</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-card elevation="2">
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="listDataProduct"
              group-by="name"
              class="elevation-1"
              @click:row="displayimage"
              key="stt"
              dense
            >
              <template v-slot:top>
                <v-toolbar flat>
                  Danh Sách Hàng Trong Kho
                  <v-spacer></v-spacer>
                  <v-btn outlined small color="indigo" text @click="close">
                    Cancel
                  </v-btn>
                </v-toolbar>
              </template>
              <template v-slot:item.price="item">
                {{ new Intl.NumberFormat().format(item.item.price) }}
              </template>
              <template v-slot:item.actions="item">
                <v-btn
                  outlined
                  x-small
                  color="indigo"
                  @click="GetForSaleRetail(item)"
                >
                  Lấy Hàng Lẻ</v-btn
                >
              </template>
            </v-data-table></v-card
          >
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
  props: {
    dialog: false
  },
  data: () => ({
    selected: [],
    images: [],
    headers: [
      {
        text: 'TÊN',
        value: 'name',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'SIZE',
        value: 'size',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      },
      // { text: "SỐ LƯỢNG", value: "quantity", width: "200px", sortable: false ,class: "primary white--text"},
      {
        text: 'MÀU SẮC',
        value: 'color_nm',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'GIÁ',
        value: 'price',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'Block',
        value: 'block',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'HÀNH ĐỘNG',
        value: 'actions',
        width: '200px',
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
        this.listDataProduct[i].stt = i
      }
    }
  },
  created () {
    this.loading()
    this.selected = []
  },
  methods: {
    ...mapActions('quanlybanle', [
      'getAllProductInWarehouseAndBlock',
      'layhinh',
      'getForRetail'
    ]),
    close () {
      this.$emit('close')
    },
    async loading () {
      var result = await this.getAllProductInWarehouseAndBlock()
      this.listDataProduct = result.data
    },
    async save () {
      this.$emit('close')
    },
    async displayimage (row) {
      var result = await this.layhinh({ product_id: row.product_code })

      for (var i = 0; i < result.data.length; i++) {
        result.data[i].file = process.env.VUE_APP_SERVER + result.data[i].file
      }
      this.images = result.data
    },
    async GetForSaleRetail (item) {
      var params = {
        id: item.item.id
      }
      var result = await this.getForRetail(params)
      this.loading()
      this.$emit('dataForRetail')
    }
  }
}
</script>
<style scoped>
.elevation-1 tr th:first-of-type,
td:first-of-type {
  background-color: blue;
}
</style>
