<template>
  <div>
    <!-- <v-row>
      <v-col col="12">
        <v-carousel
          hide-delimiter-background
          show-arrows-on-hover
          cycle
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-img contain :src="slide"></v-img>
          </v-carousel-item> </v-carousel
      ></v-col>
    </v-row> -->
    <div max-width="100%" class="mx-auto">
      <v-container class="pa-1">
        <v-card-title class="text-center justify-center py-6">
          <h1 class="font-weight-bold text-h4 basil--text">
            Thông Tin Về Chúng Tôi
          </h1>
        </v-card-title>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              >GP FARMS Chúng tôi chuyên các loại sản phẩm sạch đến từ Tây
              Nguyên.<br>
              Một số sản phẩm có giá niêm yết.<br>
              Một số loại nông sản đặt hàng. <br>
              Phương thức đặt hàng:<br>
              Liên hệ trực tiếp: 0965 399 389<br>
              Fanpage: <a>https://www.facebook.com/gp.farm47</a>
              </v-list-item-title
            >
            <v-list-item-title class="text-center justify-center py-6"
              ><v-divider />
              <h2 class="font-weight-bold text-h6 basil--text">
                GP FARMS Chuyên các loại sản phẩm nông sản:
              </h2>
              <v-divider
            /></v-list-item-title>
            <v-list-item-subtitle>Mật Ong Các Loại</v-list-item-subtitle>
            <v-list-item-subtitle>Bột Nghệ</v-list-item-subtitle>
            <v-list-item-subtitle
              >Các Loại Nông Sản Từ Tây Nguyên</v-list-item-subtitle
            >
            <v-list-item-subtitle>Mật Ong Các Loại</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-container>
    </div>
    <v-container>
      <v-row>
        <v-col v-for="n in images" :key="n" class="d-flex child-flex" cols="4">
          <v-img :src="n" :lazy-src="n" aspect-ratio="1" class="grey lighten-2">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col> </v-row
    ></v-container>
  </div>
</template>
<script>
import newProduct from "./NewProduct.vue";
import bestSaleProduct from "./BestSale.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    newProduct,
    bestSaleProduct,
  },
  data: () => ({
    lsProductsBeTrai: [],
    lsProductsBeGai: [],
    model: null,
    colors: ["white"],
    slides: [
      require("../../../assets/back-ground.jpg"),
      "https://hetyma.vn/wp-content/uploads/2020/06/6-1.png",
      "https://matongvang.com/wp-content/uploads/2020/08/mat-ong-hoa-ca-phe5-min.jpg",
      "https://dankhang.vn/wp-content/uploads/2020/06/hat-tieu-den-co-nhieu-cong-dung-doi-voi-suc-khoe.jpg",
      "https://cdn.tgdd.vn/2021/06/content/1.1-800x450-4.jpg",
      "https://cdn.dayphache.edu.vn/wp-content/uploads/2018/01/bot-cacao.jpg",
      // "https://www.vietfuntravel.com.vn/image/data/Mien-tay-n/ben-tre/top-10-vuon-trai-cay-noi-tieng-o-ben-tre-khong-the-bo-qua-h1.jpg"
    ],
    images: [
      "https://hetyma.vn/wp-content/uploads/2020/06/6-1.png",
      "https://matongvang.com/wp-content/uploads/2020/08/mat-ong-hoa-ca-phe5-min.jpg",
      "https://dankhang.vn/wp-content/uploads/2020/06/hat-tieu-den-co-nhieu-cong-dung-doi-voi-suc-khoe.jpg",
      "https://cdn.tgdd.vn/2021/06/content/1.1-800x450-4.jpg",
      "https://cdn.dayphache.edu.vn/wp-content/uploads/2018/01/bot-cacao.jpg",
      "https://www.vietfuntravel.com.vn/image/data/Mien-tay-n/ben-tre/top-10-vuon-trai-cay-noi-tieng-o-ben-tre-khong-the-bo-qua-h1.jpg",
    ],
  }),
  watch: {},
  computed: {},
  created() {},
  methods: {
    ...mapActions("views", ["getAllData", "changeURL"]),

    directlinkLsProductGirl() {
      this.changeURL("TTBG");
      this.$router.push({ path: `/listproduct/TTBG` });
      sessionStorage.setItem("tabs", window.location.pathname);
    },
    directlinkLsProductBoy() {
      this.changeURL("TTBT");
      this.$router.push({ path: `/listproduct/TTBT` });
      sessionStorage.setItem("tabs", window.location.pathname);
    },
    moveToDetails(item) {
      this.$router.push({ path: `/${item.product_cd}` });
    },
  },
};
</script>
<style>
</style>
