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
        <v-list-item>
          <v-list-item-content>
            <v-card-title class="text-center justify-center py-6">
              <h1 class="font-weight-bold text-h4 basil--text">GP FARM</h1>
            </v-card-title>
            <v-list-item-title class="text-center justify-center py-6"
              ><v-divider />
              <h2 class="font-weight-bold text-h6 basil--text">
                Chuyên các loại sản phẩm nông sản
              </h2>
              <v-divider />
            </v-list-item-title>
            <v-row>
              <v-treeview open-all :items="itemsMatOng" style="padding-right:30px"></v-treeview>
              <v-treeview open-all :items="itemsNghe" style="padding-right:30px"></v-treeview>
              <v-treeview open-all :items="itemsTieu" style="padding-right:30px"></v-treeview>
              <v-treeview open-all :items="itemsCacao" style="padding-right:30px"></v-treeview>
              <v-treeview open-all :items="itemsNongsan"></v-treeview>
            </v-row>
            <v-list-item-title class="text-center justify-center py-6"
              ><v-divider />
              <h2 class="font-weight-bold text-h6 basil--text">
                Liên Hệ Mua Hàng
              </h2>
              <v-divider
            /></v-list-item-title>
            <v-list-item-title>Phone & Zalo: 0965 399 389</v-list-item-title>
            <v-list-item-title
              >Page:
              <a href="https://www.facebook.com/gp.farm47" target="_blank"
                >facebook.com/gp.farm47 (Chuyên Nông Sản Sạch Tây Nguyên -
                GPFarm47)</a
              ></v-list-item-title
            >
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
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    itemsNongsan: [
      {
        id: 1,
        name: "Nông Sản Khác :",
        children: [
          { id: 2, name: "Bơ sáp, Bơ 034" },
          { id: 3, name: "Sầu Riêng Ri6" },
          { id: 4, name: "Xoài" },
        ],
      },
    ],
    itemsMatOng: [
      {
        id: 1,
        name: "Mật Ong :",
        children: [
          { id: 2, name: "Mật Ong Hoa Cà Phê" },
          { id: 3, name: "Mật Ong Hoa Bạc Hà" },
          { id: 4, name: "Mật Ong Hoa Cỏ Kim" },
          { id: 4, name: "Mật Ong Hoa Nhãn" },
        ],
      },
    ],
    itemsNghe: [
      {
        id: 1,
        name: "Nghệ :",
        children: [
          { id: 2, name: "Tinh Bột Nghệ" },
          { id: 3, name: "Viên Bột Nghệ" },
        ],
      },
    ],
    itemsTieu: [
      { id: 1, name: "Tiêu" },
      { id: 2, name: "Cacao" },
    ],
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
      this.$router.push({ path: "/listproduct/TTBG" });
      sessionStorage.setItem("tabs", window.location.pathname);
    },
    directlinkLsProductBoy() {
      this.changeURL("TTBT");
      this.$router.push({ path: "/listproduct/TTBT" });
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
