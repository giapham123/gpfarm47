<template>
  <v-container>
    <div>
      <v-row>
        <v-col cols="12">
          <v-layout row>
            <div
              v-for="(item, index) in lsProducts"
              :key="index"
              max-width="300"
              class="mx-auto mt-6 d-inline-flex pa-2"
              max-height="350"
              tile
            >
              <v-row @click="moreImages(item)">
                <div style="cursor: pointer">
                  <div class="parent">
                    <v-img
                      max-width="250"
                      max-height="300"
                      class="child"
                      :src="item.file"
                    >
                    </v-img>
                  </div>
                  <div>
                    <v-card-text class="text-center" v-if="item.quantity != 0">
                      <div
                        class="d-inline-block text-truncate"
                        style="max-width: 150px; margin-bottom: -10px"
                      >
                        {{ item.name }}
                      </div>
                      <p class="stylePrice">
                        {{ new Intl.NumberFormat().format(item.price) }}đ
                      </p>
                    </v-card-text>
                    <v-card-text class="text-center" v-else>
                      <div>HẾT HÀNG</div>
                    </v-card-text>
                  </div>
                </div>
              </v-row>
            </div>
          </v-layout>
        </v-col>
      </v-row>
    </div>
    <moreImage :dialog="showDialog" @close="closeDialog" :imagesParam="paramImage"/>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import moreImage from "./moreImage.vue"
export default {
   components: {
    moreImage
  },
  data: () => ({
    sortPrice: "newest",
    page: 1,
    paramImage: [],
    showDialog: false,
    selectedItem: 1,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
    lsProducts: [
      {
        file:"https://media-cdn-v2.laodong.vn/storage/newsportal/2021/1/27/874754/Tinh-Bot-Nghe-2-01.jpg",
        name:"Bột Nghệ",
        price:100000,
        code:1
      }
    ],
    searhPrice: null
  }),
  watch: {
  },
  computed: {
  
  },
  created() {
  
  },
  methods: {
    moreImages(item){
      if(item.code == 1){
        this.paramImage = [
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg'
        ]
      }
      this.showDialog = true
    },
    closeDialog(){
      this.showDialog = false
    }
  },
};
</script>
  <style>
</style>
