<template>
  <v-dialog v-model="dialog" max-width="1200px" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Chi Tiết Hàng Hóa</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-card elevation="2">
            <v-data-table
              :headers="headers"
              :items="listDataProduct"
              class="elevation-1"
              @click:row="displayimage"
              dense
            >
              <template v-slot:top>
                <v-toolbar flat>
                  Danh Sách Hàng Chi Tiết
                  <v-spacer></v-spacer>
                  <v-btn outlined small
                color="indigo" text @click="close">
                    Cancel
                  </v-btn>
                </v-toolbar>
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
export default {
  props: {
    dialog: false,
    params: Object
  },
  data: () => ({
    images: [],
    headers: [
      { text: 'STT', value: 'id', width: '50px', sortable: false },
      { text: 'Mã SP', value: 'product_cd', width: '50px', sortable: false },
      { text: 'Tên', value: 'name', width: '200px', sortable: false },
      { text: 'Block', value: 'block', width: '150px', sortable: false },
      { text: 'Kích thước', value: 'size_cd', width: '200px', sortable: false }
    ],
    listDataProduct: []
  }),
  computed: {},
  watch: {
    listDataProduct () {
      for (var i = 0; i < this.listDataProduct.length; i++) {
        this.listDataProduct[i].id = i
      }
    },
    params () {
      this.loading(this.params.product_code)
    }
  },
  created () {},
  methods: {
    ...mapActions('quanlytonkho', ['detailproduct', 'layhinh']),
    close () {
      this.$emit('close')
    },
    async loading (item) {
      var result = await this.detailproduct({ product_cd: item })
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
