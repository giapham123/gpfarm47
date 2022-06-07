<template>
  <v-container>
    <div>
      <v-row>
        <v-col cols="12">
          <v-layout row>
            <div
              v-for="(item, index) in lsProducts"
              :key="index"
              max-width="300"
              class="mx-auto mt-6 d-inline-flex pa-2"
              max-height="350"
              tile
            >
              <v-row @click="moreImages(item)">
                <div style="cursor: pointer">
                  <div class="parent">
                    <v-img
                      max-width="250"
                      max-height="300"
                      class="child"
                      :src="item.file"
                    >
                    </v-img>
                  </div>
                  <div>
                    <v-card-text class="text-center" v-if="item.quantity != 0">
                      <div
                        class="d-inline-block text-truncate"
                        style="max-width: 150px; margin-bottom: -10px"
                      >
                        {{ item.name }}
                      </div>
                      <p class="stylePrice">
                        {{ new Intl.NumberFormat().format(item.price) }}đ/lít
                      </p>
                    </v-card-text>
                    <v-card-text class="text-center" v-else>
                      <div>HẾT HÀNG</div>
                    </v-card-text>
                  </div>
                </div>
              </v-row>
            </div>
          </v-layout>
        </v-col>
      </v-row>
    </div>
    <moreImage :dialog="showDialog" @close="closeDialog" :imagesParam="paramImage"/>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import moreImage from './moreImage.vue'
export default {
  components: {
    moreImage
  },
  data: () => ({
    paramImage: [],
    showDialog: false,
    sortPrice: 'newest',
    page: 1,
    selectedItem: 1,
    items: [
      { text: 'Real-Time', icon: 'mdi-clock' },
      { text: 'Audience', icon: 'mdi-account' },
      { text: 'Conversions', icon: 'mdi-flag' }
    ],
    lsProducts: [
      {
        file: require('../../../assets/mat-ong/hoacf.jpg'),
        name: 'Mật Ong Hoa Cafe',
        price: 190000,
        code: 'MO1'
      },
      {
        file: require('../../../assets/mat-ong/bacha.jpg'),
        name: 'Mật Ong Hoa Bạc Hà',
        price: 360000,
        code: 'MO2'
      },

      {
        file: require('../../../assets/mat-ong/cokim.jpg'),
        name: 'Mật Ong Hoa Cỏ Kim',
        price: 210000,
        code: 'MO3'
      },
      {
        file: require('../../../assets/mat-ong/nhan.jpg'),
        name: 'Mật Ong Hoa Nhãn',
        price: 270000,
        code: 'MO4'
      }
    ],
    searhPrice: null
  }),
  watch: {
  },
  computed: {
    ...mapState('views', ['urlChange']),
    lsData () {
      if (this.urlChange == 'TTBT') {
        this.initialize('Thời Trang Bé Trai')
        return 'Thời Trang Bé Trai'
      } else if (this.urlChange == 'TTBG') {
        this.initialize('Thời Trang Bé Gái')
        return 'Thời Trang Bé Gái'
      }
    }
  },
  created () {
    if (this.$route.params.id == 'TTBT') {
      this.initialize('Thời Trang Bé Trai')
    } else if (this.$route.params.id == 'TTBG') {
      this.initialize('Thời Trang Bé Gái')
    }
  },
  methods: {
    ...mapActions('views', ['getAllData']),
    onPageChange () {
      if (this.$route.params.id == 'TTBT') {
        this.initialize('Thời Trang Bé Trai')
      } else if (this.$route.params.id == 'TTBG') {
        this.initialize('Thời Trang Bé Gái')
      }
    },
    moreImages (item) {
      if (item.code == 'MO1') {
        this.paramImage = [
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg'
        ]
      }
      if (item.code == 'MO2') {
        this.paramImage = [
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg'
        ]
      }
      if (item.code == 'MO3') {
        this.paramImage = [
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg',
          'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/10/16/mat-ong2-1634396262440751113159.jpg'
        ]
      }
      // this.showDialog = true
    },
    closeDialog () {
      this.showDialog = false
    }
  }
}
</script>
  <style>
.parent {
  height: 300px;
  overflow: hidden;
  position: relative;
  float: left;
  display: inline-block;
  cursor: pointer;
}

.child {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.parent:hover .child,
.parent:focus .child {
  -ms-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -webkit-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
}

.parent:hover .child:before,
.parent:focus .child:before {
  display: block;
}

.parent:hover a,
.parent:focus a {
  display: block;
}

.child:before {
  content: "";
  display: none;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  /* background-color: rgba(52,73,94,0.75); */
}

/* Media Queries */
@media screen and (max-width: 960px) {
  .parent {
    width: 100%;
    margin: 20px 0px;
  }
  .wrapper {
    padding: 20px 20px;
  }
}

.stylePrice {
  color: brown;
  font-weight: bold;
}
</style>
