<template>
  <v-dialog v-model="dialog" max-width="1200px" persistent>
    <v-card>
      <loading :active.sync="loading" :can-cancel="false" color="#009688" />
      <v-card-title>
        <span class="headline">Giỏ Hàng</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn outlined small color="indigo" text @click="close">
              Cancel
            </v-btn>
            <v-btn outlined small color="indigo" text @click="save">
              Xuất Hàng
            </v-btn>
          </v-card-actions>
          <v-card elevation="2">
            <v-data-table
              :headers="headers"
              :items="listDataProduct"
              class="elevation-1"
              item-key="stt"
              @click:row="displayimage"
              dense
            >
              <template v-slot:top>
                <v-toolbar flat>
                  Danh Sách Bạn Chọn
                  <v-spacer></v-spacer>
                  <v-col cols="2" sm="2">
                    <v-text-field
                      ref="customer_name"
                      :rules="[() => !!customer_name || 'Bắt buộc']"
                      v-model="customer_name"
                      label="Tên Khách Hàng"
                      dense
                    ></v-text-field
                  ></v-col>
                  <v-col cols="2" sm="2"
                    ><v-text-field
                      ref="phone"
                      :rules="[() => !!phone || 'Bắt buộc']"
                      v-model="phone"
                      label="Số Điện Thoại"
                      dense
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6" sm="6"
                    ><v-text-field
                      ref="address"
                      :rules="[() => !!address || 'Bắt buộc']"
                      v-model="address"
                      label="Địa Chỉ"
                      dense
                    ></v-text-field
                  ></v-col>
                </v-toolbar>
              </template> </v-data-table
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
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: { Loading },
  props: {
    dialog: false,
    params: Array,
  },
  data: () => ({
    loading: false,
    formHasErrors: false,
    customer_name: "",
    phone: "",
    address: "",
    images: [],
    headers: [
      {
        text: "STT",
        align: "start",
        sortable: false,
        value: "stt",
        width: "100px",
      },
      {
        text: "Mã SP",
        align: "start",
        sortable: false,
        value: "product_cd",
        width: "100px",
      },
      { text: "Tên", value: "name", width: "400px", sortable: false },
      { text: "Tệp", value: "block", width: "200px", sortable: false },
      { text: "Kích thước", value: "size_cd", width: "200px", sortable: false },
      { text: "Giá", value: "price", width: "200px", sortable: false },
    ],
    listDataProduct: [],
  }),
  computed: {
    form() {
      return {
        customer_name: this.customer_name,
        phone: this.phone,
        address: this.address,
      };
    },
  },
  watch: {
    params() {
      this.listDataProduct = this.params;
      for (var i = 0; i < this.listDataProduct.length; i++) {
        this.listDataProduct[i].stt = i + 1;
      }
    },
  },
  created() {},
  methods: {
    ...mapActions("quanlybanle", ["layhinh", "SaveDataInRetailView"]),
    close() {
      this.$emit("close");
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    async displayimage(row) {
      var result = await this.layhinh({ product_id: row.product_cd });

      for (var i = 0; i < result.data.length; i++) {
        result.data[i].file = "http://127.0.0.1:8000" + result.data[i].file;
      }
      this.images = result.data;
    },
    async save() {
      this.loading = true;
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].validate(true);
        if (!this.form[f]) this.formHasErrors = true;
      });
      if (!this.formHasErrors) {
        for (var i = 0; i < this.listDataProduct.length; i++) {
          this.listDataProduct[i].customer_name = this.customer_name;
          this.listDataProduct[i].size = this.listDataProduct[i].size_cd;
          this.listDataProduct[i].customerPhone = this.phone;
          this.listDataProduct[i].customerAddress = this.address;
        }
        var result = await this.SaveDataInRetailView(this.listDataProduct);

        var raw = window.atob(result.data);
        var uInt8Array = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        const link = document.createElement("a");
        const blob = new Blob([uInt8Array], {
          type: "application/vnd.ms-excel",
        });
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "HoaDon");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.$emit("finishedExportRetail");
        this.$emit("close");
      }
      this.loading = false;
    },
  },
};
</script>
