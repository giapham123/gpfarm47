<template>
  <div>
    <v-card-title class="text-center justify-center py-6">
      <v-divider/>
      <h1 class="font-weight-bold text-h5 basil--text">Sản Phẩm Mới</h1>
      <v-divider/>
    </v-card-title>
    <v-sheet>
      <v-slide-group v-model="model" show-arrows>
         <v-slide-item v-for="(item,index) in lsNewProduct" :key="index" v-slot="{ toggle }">
          <v-card class="ma-4" @click="toggle" outlined>
            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-card  outlined @click="moveToDetails(item)">
                  <div class="img">
                    <v-img
                     width="200"
                      height="250"
                      contain
                      class="child"
                      :src="item.file"
                    ></v-img>
                  </div>
                  <v-card-title class="d-inline-block text-truncate" style="max-width: 150px; margin-bottom: -10px"> {{item.name}} </v-card-title>
                  <v-card-subtitle class="stylePrice"> {{new Intl.NumberFormat().format(item.price)}}đ </v-card-subtitle>
                </v-card>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    model: null,
    colors: ['white'],
    slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    lsNewProduct: []
  }),
  watch: {},
  computed: {},
  created () {
    this.loadingHome()
  },
  methods: {
    ...mapActions('views', ['getNewProduct']),
    async loadingHome () {
      var res = await this.getNewProduct()
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].file = process.env.VUE_APP_SERVER + res.data[i].file
      }
      this.lsNewProduct = res.data
    },

    moveToDetails (item) {
      this.$router.push({ path: `/${item.product_cd}` })
    }
  }
}
</script>
<style>
.img {
  width: 100%;
  height: 100%;
}
.img {
  overflow: hidden;
  margin: 0 auto;
}
.img .child {
  transition: 0.5s all ease-in-out;
}
.img:hover .child {
  transform: scale(1.05);
}
.stylePrice{
  color: brown !important;
  font-weight: bold !important;
}
</style>
