<template>
  <div>
    <v-card-title class="text-center py-6">
      <h1 class="font-weight-bold text-h5 basil--text">Sản Phẩm Liên Quan</h1>
    </v-card-title>
    <v-item-group v-model="selected" multiple>
      <v-row>
        <v-col v-for="(item, i) in lsProducts" :key="i" cols="6" md="2">
          <v-item>
            <div class="parent1" @click="moveToDetails(item)">
              <v-img
                :src="item.file"
                height="300"
                class="text-right pa-2 child"
              />
            </div>
          </v-item>
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
        </v-col>
      </v-row>
    </v-item-group>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    param: {
      category: null,
      product_code: null,
    },
  },
  data: () => ({
    lsProducts: [],
    model: null,
    colors: ["white"],
    slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    lsNewProduct: [],
  }),

  watch: {
    // async lsNewProduct(){
    //   var res = await this.getRelatedProduct(this.param);
    //   for (let i = 0; i < res.data.length; i++) {
    //     res.data[i].file = process.env.VUE_APP_SERVER + res.data[i].file;
    //   }
    //   this.lsNewProduct =  res.data;
    //   return  res.data;
    // }
  },
  computed: {},
  created() {
    this.lsNewProduct = [];
    this.loadingData();
    this.initialize("Thời Trang Bé Gái");
  },
  methods: {
    ...mapActions("views", [
      "getRelatedProduct",
      "getNewProduct",
      "getAllData",
    ]),

    moveToDetails() {
      this.$router.push({ path: "/detailsProduct" });
    },
    async loadingData() {
      var res = await this.getRelatedProduct(this.param);
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].file = process.env.VUE_APP_SERVER + res.data[i].file;
      }
      this.lsNewProduct = res.data;
      return res.data;
    },
    async initialize(item) {
      var res = await this.getAllData({
        category: item,
        page: 0,
      });
      for (let i = 0; i < 12; i++) {
        if (i < 12) {
          res.data[i].file = process.env.VUE_APP_SERVER + res.data[i].file;
          this.lsProducts.push(res.data[i]);
        }
      }
    },
  },
};
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
.stylePrice {
  color: brown !important;
  font-weight: bold !important;
}
</style>
