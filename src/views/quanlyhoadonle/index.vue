<template>
  <v-card elevation="2" width="100%" height="100%">
    <v-toolbar flat>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Quản Lý Hóa Đơn Bán Lẻ
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item></v-toolbar
    >
    <v-divider></v-divider>
    <v-container>
      <v-card width="100%">
        <v-data-table
          :headers="headersRetail"
          :items="listBillRetail"
          class="elevation-1"
          dense
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="6" md="3">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="dates1"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <v-date-picker locale="vi" v-model="dates1" range></v-date-picker
                  ><v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu1 = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu1.save(dates1)"
                  >
                    OK
                  </v-btn>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      dense
                      v-model="dateRangeText1"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field
                  ></template>
                </v-menu>
              </v-col>
              <v-btn
                outlined
                small
                color="indigo"
                class="mb-2"
                @click="searchData1"
              >
                Tìm Kiếm
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.tongtien="item">
            {{ new Intl.NumberFormat().format(item.item.tongtien) }}
          </template>
          <template v-slot:item.actions="item">
            <v-btn
              outlined
              small
              color="indigo"
              @click="showDialogDetailRetail(item)"
            >
              Chi tiết</v-btn
            >
          </template>
        </v-data-table></v-card
      ></v-container
    >
    <popupDetailBillRetail
      :dialog="isShowRetail"
      :dataInWarehouse="dataDetailRetail"
      @close="closeExportRetail"
    ></popupDetailBillRetail>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'
import popupDetailBillRetail from './popupDetailBillRetail'
import moment from 'moment'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: {
    popupDetailBillRetail
  },
  data: () => ({
    menu1: false,
    dates1: [
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .substr(0, 10),
      new Date().toISOString().substr(0, 10)
    ],
    isShowRetail: false,
    dataDetailRetail: {},
    images: [],
    listBillRetail: [],
    headersRetail: [
      {
        text: 'Tên khách hàng',
        align: 'start',
        sortable: false,
        value: 'customer_name',
        width: '50px',
        class: 'primary white--text'
      },
      {
        text: 'Tổng tiền (VND)',
        value: 'tongtien',
        width: '50px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'Ngày tạo',
        value: 'created_dt',
        width: '50px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'Hành động',
        value: 'actions',
        width: '50px',
        sortable: false,
        class: 'primary white--text'
      }
    ]
  }),

  computed: {
    dateRangeText1 () {
      if (this.dates1[0] < this.dates1[1]) {
        return (
          moment(this.dates1[0]).format('DD/MM/YYYY') +
          ' ~ ' +
          moment(this.dates1[1]).format('DD/MM/YYYY')
        )
      } else {
        return (
          moment(this.dates1[1]).format('DD/MM/YYYY') +
          ' ~ ' +
          moment(this.dates1[0]).format('DD/MM/YYYY')
        )
      }
    }
  },

  watch: {},

  created () {
    this.initialize()
  },

  methods: {
    ...mapActions('quanlyhoadon', ['layhinh', 'getBillRetail']),
    async initialize () {
      var param = {
        from_dt: this.dates1[0],
        to_dt: this.dates1[1]
      }
      var resultRetail = await this.getBillRetail(param)
      this.listBillRetail = resultRetail.data
    },
    showDialogDetailRetail (item) {
      this.isShowRetail = true
      this.dataDetailRetail = item.item
    },

    closeExportRetail () {
      this.isShowRetail = false
    },

    async searchData1 () {
      var param = {
        from_dt: this.dates1[0],
        to_dt: this.dates1[1]
      }
      var resultRetail = await this.getBillRetail(param)
      this.listBillRetail = resultRetail.data
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
