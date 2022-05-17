<template>
  <v-card elevation="2" width="100%" height="100%">
    <loading :active.sync="loading" :can-cancel="false" color="#009688" />
    <v-container>
      <v-row
        ><v-col>
          <v-card width="100%">
            <v-data-table
              :headers="headers"
              :items="listCate"
              class="elevation-1"
              dense
            >
            </v-data-table> </v-card
        ></v-col>
        <v-col cols="12" sm="4" md="4" ref="form">
          <v-text-field
            ref="cate_cd"
            :rules="[() => !!cate_cd || 'This field is required']"
            label="Mã Thể Loại"
            dense
            required
            v-model="cate_cd"
          ></v-text-field>
          <v-text-field
            ref="name"
            required
            :rules="[() => !!name || 'This field is required']"
            label="Tên Thể Loại"
            dense
            v-model="name"
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
import { mapActions } from 'vuex'
import moment from 'moment'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: { Loading },
  data: () => ({
    loading: false,
    cate_cd: null,
    name: null,
    formHasErrors: false,
    headers: [
      {
        text: 'No',
        align: 'start',
        sortable: false,
        value: 'no',
        width: '5px',
        class: 'primary white--text'
      },
      {
        text: 'Mã Thể Loại',
        value: 'cate_cd',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'Tên Thể Loại',
        value: 'name',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      }
    ],
    listCate: []
  }),

  computed: {
    form () {
      return {
        cate_cd: this.cate_cd,
        name: this.name
      }
    }
  },

  watch: {
    listCate () {
      for (let i = 0; i < this.listCate.length; i++) {
        this.listCate[i].no = i + 1
      }
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    ...mapActions('quanlyhethong', ['getCate', 'saveCate']),
    async initialize () {
      var resultCate = await this.getCate()
      this.listCate = resultCate.data
    },
    async insertSizeData () {
      this.formHasErrors = false

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })
      if (this.cate_cd != null && this.name != null) {
        var param = {
          cate_cd: this.cate_cd,
          name: this.name
        }
        var resp = await this.saveCate(param)
        if (resp.data == 'Save Success') {
          this.cate_cd = null
          this.name = null
          //
          this.errorMessages = []
          this.formHasErrors = false

          Object.keys(this.form).forEach((f) => {
            this.$refs[f].reset()
          })
          //
          this.initialize()
        }
      }
    }
  }
}
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
