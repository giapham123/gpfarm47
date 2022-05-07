<template>
  <v-card elevation="2" width="100%"  height="100%">
    <v-toolbar flat>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Quản Lý Sản Phẩm
          </v-list-item-title>
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
          @click:row="displayimage"
          dense
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-col cols="12" sm="6" md="3">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="dates"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <v-date-picker
                    locale="vi"
                    v-model="dates"
                    range
                  ></v-date-picker
                  ><v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(dates)">
                    OK
                  </v-btn>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      dense
                      v-model="dateRangeText"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field
                  ></template>
                </v-menu> </v-col
              ><v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="name_search"
                  label="Tên Sản Phẩm"
                  dense
                ></v-text-field
              ></v-col>
              <v-btn
                small
                color="primary"
                dark
                class="mb-2"
                @click="searchData"
              >
                Tìm Kiếm
              </v-btn>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.price="item">
            {{ new Intl.NumberFormat().format(item.item.price) }}
          </template>
          <template v-slot:item.view="item" >
            <v-checkbox
              hide-details
              :input-value="item.item.viewProduct"
              @change="ViewDataCheck(item.item)"
              class="shrink mr-2 mt-0"
            ></v-checkbox>
          </template>
          <template v-slot:item.actions="item">
            <v-btn
              :disabled="item.item.is_sell != '1' ? false : true"
              small
              @click="deleteItem(item)"
              color="primary"
            >
              Delete
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
    <v-row style="width: 700px">
      <v-col cols="4" sm="4" v-for="(url, index) in images" :key="index">
        <v-img
          :src="url.file"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        ></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    Loading,
  },
  data: () => ({
    color: {
      selected: [],
      item: [],
    },
    loading: false,
    name_search: "",
    menu: false,
    dates: [
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .substr(0, 10),
      new Date().toISOString().substr(0, 10),
    ],
    ishowimage: false,
    unit: 0,
    displayImg: [],
    images: [],
    url: null,
    files: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "MÃ SP",
        align: "start",
        sortable: false,
        value: "product_code",
        width: "50px",
        class: "primary white--text",
      },
      {
        text: "TÊN",
        value: "name",
        width: "200px",
        sortable: false,
        class: "primary white--text",
      },
      {
        text: "KÍCH THƯỚC",
        value: "size",
        width: "200px",
        sortable: false,
        class: "primary white--text",
      },
      {
        text: "SỐ LƯỢNG NHẬP",
        value: "quantity",
        width: "200px",
        sortable: false,
        class: "primary white--text",
      },
      {
        text: "GIÁ",
        value: "price",
        width: "100px",
        sortable: false,
        class: "primary white--text",
      },
      {
        text: "NGƯỜI NHẬP",
        value: "created_by",
        width: "100px",
        sortable: false,
        class: "primary white--text",
      },
      {
        text: "View",
        value: "view",
        width: "100px",
        sortable: false,
        class: "primary white--text",
      },
      {
        text: "HÀNH ĐỘNG",
        value: "actions",
        width: "100px",
        sortable: false,
        class: "primary white--text",
      },
    ],
    listDataProduct: [],
    product_code: "",
    name: "",
    size: {
      selected: "",
      item: [],
    },
    quantity: "",
    price: "",
    category: {
      selected: "",
      item: [
        {
          category_cd: "F",
          name: "Thời Trang Bé Gái",
        },
        {
          category_cd: "M",
          name: "Thời Trang Bé Trai",
        },
      ],
    },
    product_codeDel: "",
  }),

  computed: {
    dateRangeText() {
      if (this.dates[0] < this.dates[1]) {
        return (
          moment(this.dates[0]).format("L") +
          " ~ " +
          moment(this.dates[1]).format("L")
        );
      } else {
        return (
          moment(this.dates[1]).format("L") +
          " ~ " +
          moment(this.dates[0]).format("L")
        );
      }
    },
  },

  watch: {
    listDataProduct() {
      for (let i = 0; i < this.listDataProduct.length; i++) {
        if (this.listDataProduct[i].view == 1) {
          this.listDataProduct[i].viewProduct = true;
        } else {
          this.listDataProduct[i].viewProduct = false;
        }
      }
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions("quanlysanpham", [
      "themSanPham",
      "laytatcasanpham",
      "laysize",
      "layhinh",
      "deleteProduct",
      "getcolor",
      'updateView'
    ]),
    async initialize() {
      var param = {
        from_dt: this.dates[0],
        to_dt: this.dates[1],
        name: this.name_search,
      };
      var resultColor = await this.getcolor();
      var resultSize = await this.laysize();
      var result = await this.laytatcasanpham(param);
      this.listDataProduct = result.data;
      this.size.item = resultSize.data;
      this.color.item = resultColor.data;
    },

    editItem(item) {
      this.ishowimage = true;
      this.product_code = item.item.product_code;
      this.name = item.item.name;
      this.category.selected = item.item.category_id;
      this.size.selected = item.item.size_id;
      this.quantity = item.item.quantity;
      this.price = item.item.price;
      this.dialog = true;
    },

    deleteItem(item) {
      this.product_codeDel = item.item.product_code;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.closeDelete();
    },

    close() {
      this.color.selected = [];
      this.dialog = false;
      this.product_code = "";
      this.name = "";
      this.category.selected = "";
      this.size.selected = "";
      this.quantity = "";
      this.price = "";
      this.ishowimage = false;
      this.$nextTick(() => {
        this.initialize();
        this.formHasErrors = false;

        Object.keys(this.form).forEach((f) => {
          this.$refs[f].reset();
        });
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.removeProduct();
        this.initialize();
      });
    },
    async removeProduct() {
      var result = await this.deleteProduct(this.product_codeDel);
    },

    async displayimage(row) {
      var result = await this.layhinh({ product_id: row.product_code });
      for (var i = 0; i < result.data.length; i++) {
        result.data[i].file = process.env.VUE_APP_SERVER + result.data[i].file;
      }
      this.images = result.data;
    },
    async searchData() {
      this.loading = true;
      var param = {
        from_dt: this.dates[0],
        to_dt: this.dates[1],
        name: this.name_search,
      };
      var result = await this.laytatcasanpham(param);
      this.listDataProduct = result.data;
      this.loading = false;
    },
    async ViewDataCheck(item){
      if(item.viewProduct == true){
        item.viewProduct = 0
      }else{
        item.viewProduct = 1
      }
      await this.updateView(item)
    }
  },
};
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
