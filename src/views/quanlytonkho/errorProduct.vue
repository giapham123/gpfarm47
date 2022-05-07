<template>
  <v-dialog v-model="dialog" max-width="1200px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Hàng Hóa Bị Lỗi</span>
      </v-card-title>

      <v-card-text>
          <v-container>
            <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined small
                color="indigo"  text @click="close"> Cancel </v-btn>
      </v-card-actions>
            <v-card elevation="2">
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="listDataProduct"
                class="elevation-1"
                @click:row="displayimage"
                dense
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    Danh Sách Hàng Tồn Kho
                    <v-spacer></v-spacer>
                  </v-toolbar>
                </template>
                </v-data-table
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
      <!-- {{orderComplete[0]}} -->

    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    dialog: false,
    dataInWarehouse: Array
  },
  data: () => ({
    selected: [],
    new: 1,
    orderComplete: [],
    images: [],

    headers: [
      { text: 'Mã SP', value: 'product_cd', width: '50px', sortable: false },
      { text: 'Tên', value: 'name', width: '200px', sortable: false },
      { text: 'Mã đơn hàng', value: 'order_cd', width: '150px', sortable: false },
      { text: 'Kích thước', value: 'size', width: '200px', sortable: false },
      {
        text: 'Ngày trả hàng',
        value: 'created_dt',
        width: '200px',
        sortable: false
      },
      {
        text: 'Lý do',
        value: 'comments',
        width: '200px',
        sortable: false
      },
      {
        text: 'Ngày nhận hàng lỗi',
        value: 'producterror_dt',
        width: '200px',
        sortable: false
      }
    ],
    listDataProduct: []
  }),
  computed: {
  },
  watch: {
    dataInWarehouse () {
    }
  },
  created () {
    this.loading()
  },
  methods: {
    ...mapActions('quanlytonkho', ['errorProduct',
      'layhinh'
    ]),
    close () {
      this.$emit('close')
    },
    async loading () {
      var result = await this.errorProduct()
      this.listDataProduct = result.data
    },
    async displayimage (row) {
      var result = await this.layhinh({ product_id: row.product_cd })

      for (var i = 0; i < result.data.length; i++) {
        result.data[i].file = 'http://127.0.0.1:8000' + result.data[i].file
      }
      this.images = result.data
    }
  }
}
</script>
