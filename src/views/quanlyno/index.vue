<template>
  <v-card elevation="2" width="100%"  height="100%">
    <loading :active.sync="loading" :can-cancel="false" color="#009688" />
    <v-container>
        <v-card width="100%">
          <v-data-table
            :headers="headers"
            :items="listBill"
            class="elevation-1"
            dense
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="6" md="2">
                  <v-checkbox
                    v-model="is_payment1"
                    label="Chưa Thanh Toán"
                    color="primary"
                    value="CHUA_THANH_TOAN"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="is_payment2"
                    label="Đã Thanh Toán"
                    color="primary"
                    value="THANH_TOAN"
                    hide-details
                  ></v-checkbox>
                </v-col>

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
                    <v-date-picker locale="vi" v-model="dates" range></v-date-picker
                    ><v-spacer></v-spacer>
                    <v-btn text
                color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text
                color="primary" @click="$refs.menu.save(dates)">
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
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    label="Tên Sản Phẩm"
                    dense
                    v-model="customer_name"
                  ></v-text-field>
                </v-col>
                <v-btn
                  outlined small
                color="indigo"
                  @click="searchData"
                >
                  Tìm Kiếm
                </v-btn>
              </v-toolbar>
            </template>
            <template v-slot:item.price="item">
             {{new Intl.NumberFormat().format(item.item.price)}}
          </template>
           <template v-slot:item.tongtien="item">
             {{new Intl.NumberFormat().format(item.item.tongtien)}}
          </template>
            <template v-slot:item.actions="item">
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-btn
                    :disabled="item.item.dis_payment"
                    outlined x-small
                color="indigo"

                    @click="payment(item)"
                  >
                    Thanh Toán</v-btn
                  ></v-col
                ></v-row
              >
            </template>
          </v-data-table>
        </v-card>
      </v-container
    >
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
    is_payment1: 'CHUA_THANH_TOAN',
    is_payment2: 'THANH_TOAN',
    customer_name: '',
    menu: false,
    dates: [
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .substr(0, 10),
      new Date().toISOString().substr(0, 10)
    ],
    isShowRetail: false,
    dataDetailRetail: {},
    dataDetail: {},
    isShow: false,
    images: [],
    headers: [
      {
        text: 'NHÀ PP',
        align: 'start',
        sortable: false,
        value: 'product_producer',
        width: '50px',
        class: 'primary white--text'
      },
      {
        text: 'TÊN SẢN PHẨM',
        value: 'name',
        width: '200px',
        sortable: false,
        class: 'primary white--text'
      }, {
        text: 'SIZE',
        value: 'size',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'SỐ LƯỢNG',
        value: 'quantity',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'GIÁ',
        value: 'price',
        width: '50px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'NGÀY TẠO',
        value: 'created_dt',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'THANH TOÁN',
        value: 'is_payment',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'NGÀY THANH TOAN',
        value: 'payment_dt',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      },
      {
        text: 'TỔNG TIỀN (VND)',
        value: 'tongtien',
        width: '100px',
        sortable: false,
        class: 'primary white--text'
      },
      { text: 'HÀNH ĐỘNG', value: 'actions', width: '100px', sortable: false, class: 'primary white--text' }
    ],
    listBill: []
  }),

  computed: {
    dateRangeText () {
      if (this.dates[0] < this.dates[1]) {
        return (
          moment(this.dates[0]).format('DD/MM/YYYY') +
          ' ~ ' +
          moment(this.dates[1]).format('DD/MM/YYYY')
        )
      } else {
        return (
          moment(this.dates[1]).format('DD/MM/YYYY') +
          ' ~ ' +
          moment(this.dates[0]).format('DD/MM/YYYY')
        )
      }
    }
  },

  watch: {
    is_payment1 () {
      if (this.is_payment1 == null && this.is_payment2 == null) {
        this.is_payment2 = 'THANH_TOAN'
      }
    },
    is_payment2 () {
      if (this.is_payment1 == null && this.is_payment2 == null) {
        this.is_payment1 = 'CHUA_THANH_TOAN'
      }
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    ...mapActions('quanlyno', [
      'allProductIsPay',
      'layhinh',
      'paymentProduct'
    ]),
    async initialize () {
      var param = {
        from_dt: this.dates[0],
        to_dt: this.dates[1],
        name: this.customer_name,
        is_payment1: this.is_payment1,
        is_payment2: this.is_payment2
      }
      var result = await this.allProductIsPay(param)
      this.listBill = result.data
      for (var i = 0; i < this.listBill.length; i++) {
        if (this.listBill[i].is_payment == 'CHUA_THANH_TOAN') {
          this.listBill[i].is_payment = 'Chưa Thanh Toán'
          this.listBill[i].dis_payment = false
        } else {
          this.listBill[i].is_payment = 'Đã Thanh Toán'
          this.listBill[i].dis_payment = true
        }
        this.listBill[i].tongtien = this.listBill[i].price * this.listBill[i].unit * this.listBill[i].quantity
      }
    },
    async searchData () {
      this.initialize()
    },
    async payment (item) {
      this.loading = true
      await this.paymentProduct(item.item)
      this.initialize()
      this.loading = false
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
.elevation-1 tr th:first-of-type, td:first-of-type {
  background-color: blue;
}
</style>
