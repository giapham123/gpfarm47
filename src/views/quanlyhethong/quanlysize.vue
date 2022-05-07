<template>
  <v-card elevation="2" width="100%" height="100%">
    <loading :active.sync="loading" :can-cancel="false" color="#009688" />
    <v-container>
      <v-row
        ><v-col>
          <v-card width="100%">
            <v-data-table
              :headers="headers"
              :items="listSize"
              class="elevation-1"
              dense
            >
            </v-data-table> </v-card
        ></v-col>
        <v-col cols="12" sm="4" md="4" ref="form">
          <v-text-field
            ref="size_cd"
            :rules="[() => !!size_cd || 'This field is required']"
            label="Mã Size (ex: x-x)"
            dense
            required
            v-model="size_cd"
          ></v-text-field>
          <v-text-field
            ref="size_nm"
            required
            :rules="[() => !!size_nm || 'This field is required']"
            label="Tên Size"
            dense
            v-model="size_nm"
          ></v-text-field>
          <v-btn outlined small color="indigo" @click="insertSizeData">
            Lưu
          </v-btn>
        </v-col></v-row
      >
    </v-container>
  </v-card>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: { Loading },
  data: () => ({
    loading: false,
    size_cd: null,
    size_nm: null,
    formHasErrors: false,
    headers: [
      {
        text: "No",
        align: "start",
        sortable: false,
        value: "no",
        width: "5px",
        class: "primary white--text",
      },
      {
        text: "Mã Size",
        value: "size_cd",
        width: "200px",
        sortable: false,
        class: "primary white--text",
      },
      {
        text: "Size",
        value: "size",
        width: "100px",
        sortable: false,
        class: "primary white--text",
      },
    ],
    listSize: [],
  }),

  computed: {
    form() {
      return {
        size_cd: this.size_cd,
        size_nm: this.size_nm,
      };
    },
  },

  watch: {
    listSize() {
      for (let i = 0; i < this.listSize.length; i++) {
        this.listSize[i].no = i + 1;
      }
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions("quanlyhethong", ["saveSize"]),
    ...mapActions("quanlysanpham", ["laysize"]),
    async initialize() {
      var resultSize = await this.laysize();
      this.listSize = resultSize.data;
    },
    async insertSizeData() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
        return;
      });
      if (this.size_cd != null && this.size_nm != null) {
        var param = {
          size_cd: this.size_cd,
          size_nm: this.size_nm,
        };
        var resp = await this.saveSize(param);
        if (resp.data == "Save Success") {
          this.size_cd = null;
          this.size_nm = null;
          //
          this.errorMessages = [];
          this.formHasErrors = false;

          Object.keys(this.form).forEach((f) => {
            this.$refs[f].reset();
          });
          //
          this.initialize();
        }
      }
    },
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
