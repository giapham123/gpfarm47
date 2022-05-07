<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-sheet rounded="lg" min-height="268">
          <carousel :starting-image="1" :images="lsImage"></carousel>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6">
        <v-sheet min-height="268" rounded="lg">
          <div class="mx-auto">
            <v-card-text>
              <p class="text-h4 text--primary">{{ details.name }}</p>
              <p class="text-h5 priceCss">
                {{ new Intl.NumberFormat().format(details.price) }}đ
              </p>
              <p>Kích thước</p>

              <v-chip-group active-class="deep-purple--text text--accent-4">
                <v-chip>L</v-chip>
                <v-chip>M</v-chip>
                <v-chip>S</v-chip>
              </v-chip-group>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="deep-purple accent-4">
                Thêm Vào Giỏ Hàng</v-btn
              >
            </v-card-actions>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-tabs v-model="tabs">
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#mobile-tabs-5-1" class="primary--text"> Mô Tả </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabs">
      <v-tab-item v-for="i in 3" :key="i" :value="'mobile-tabs-5-' + i">
        <v-card flat>
          <v-alert text color="info">
            <div>Nội dung đang cập nhật.</div>
          </v-alert>
          <!-- <v-card-text v-text="text"></v-card-text> -->
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-divider />
    <relatedProduct :param="paramRelatedProduct" />
  </v-container>
</template>
<script>
import relatedProduct from "./RelatedProduct.vue";
import carousel from "./Carousel.vue";
import bestSaleProduct from "./BestSale.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    carousel,
    bestSaleProduct,
    relatedProduct,
  },
  data: () => ({
    images: [],
    tabs: null,
    text: "  sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    page: 1,
    checkbox1: true,
    checkbox2: false,
    selectedItem: 1,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
    details: {},
    lsImage: [
      {
        id: 0,
        big: null,
        thumb: null,
      },
    ],
    paramRelatedProduct: {},
  }),
  watch: {},
  computed: {},
  created() {
    this.loadingData();
  },
  methods: {
    ...mapActions("views", ["getDetailProduct"]),
    async loadingData() {
      this.paramRelatedProduct = {
        product_code: this.$route.params.id,
        category: "Thời Trang Bé Gái",
      };
      var res = await this.getDetailProduct({ id: this.$route.params.id });
      var arrImg = [];
      this.details = res.data[0];
      for (let i = 0; i < res.data.length; i++) {
        arrImg.push({
          id: i,
          big: process.env.VUE_APP_SERVER + res.data[i].file,
          thumb: process.env.VUE_APP_SERVER + res.data[i].file,
        });
      }

      this.lsImage = arrImg;
    },
  },
};
</script>
<style>
.priceCss {
  color: brown !important ;
  font-weight: bold !important ;
}
</style>
