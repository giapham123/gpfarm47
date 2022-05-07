<template>
  <v-dialog v-model="dialog" max-width="700px" persistent>
    <v-card elevation="2">
      <v-card-title>
        <span class="headline">Thêm Sản Phẩm</span>
      </v-card-title>
      <v-alert dense outlined type="error" :value="isShowError">
        Vui lòng điền đầy đủ thông tin!
      </v-alert>
      <v-card-text ref="form">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="name"
                label="Tên Sản Phẩm"
                dense
              ></v-text-field> </v-col
            ><v-col cols="12" sm="6" md="4">
              <v-select
                v-model="category.selected"
                :items="category.item"
                label="Loại Sản Phẩm"
                item-text="name"
                item-value="caregory_cd"
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :items="size.item"
                v-model="size.selected"
                label="Size"
                item-text="size"
                item-value="size_cd"
                dense
              ></v-select>
            </v-col>

            <v-col cols="12" sm="12" md="12">
              <v-select
                v-model="color.selected"
                :items="color.item"
                label="Màu sắc"
                item-text="color_nm"
                item-value="color_cd"
                multiple
                small-chips
                dense
                @change="selectedItems"
              ></v-select>
            </v-col>

            <div v-for="(item, k) in listItem" :key="k" class="flex">
              <v-row>
                <v-col cols="12" sm="4" md="4">
                  <v-chip class="ma-2" small> {{ item.colorNm }} </v-chip>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-text-field
                    v-model="item.quantity"
                    label="Số Lượng"
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3" md="3">
              <v-text-field v-model="price" label="Giá" dense></v-text-field>
            </v-col>
            <v-col sm="3" md="3">
              =
              <v-chip class="ma-2" color="primary" small>
                {{ suggestPrice }}
              </v-chip>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-file-input
                v-if="ishowimage == false"
                @change="onAddFiles"
                type="file"
                accept="image/*"
                small-chips
                multiple
                label="Chọn Images"
                dense
                prepend-icon="mdi-camera"
                ref="files"
              ></v-file-input> </v-col
          ></v-row>
          <v-row>
            <div v-for="(url, index) in displayImg" :key="index" id="preview">
              <img v-if="url" :src="url" /></div
          ></v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined small
                color="indigo"  text @click="close"> Cancel </v-btn>
        <v-btn outlined small
                color="indigo"  text @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
  props: {
    dialog: false
  },
  data: () => ({
    isShowError: false,
    listItem: [],
    active: false,
    color: {
      selected: [],
      item: []
    },
    loading: false,
    menu: false,
    ishowimage: false,
    unit: 0,
    displayImg: [],
    images: [],
    url: null,
    files: [],
    product_code: '',
    name: '',
    size: {
      selected: '',
      item: []
    },
    quantity: '',
    price: '',
    category: {
      selected: '',
      item: [
        {
          category_cd: 'F',
          name: 'Thời Trang Bé Gái'
        },
        {
          category_cd: 'M',
          name: 'Thời Trang Bé Trai'
        }
      ]
    }
  }),
  computed: {
    suggestPrice () {
      return new Intl.NumberFormat().format(this.price)
    }
  },
  watch: {},
  created () {
    this.initialize()
  },
  methods: {
    ...mapActions('quanlysanpham', [
      'themSanPham',
      'laysize',
      'layhinh',
      'getcolor'
    ]),

    async initialize () {
      var resultColor = await this.getcolor()
      var resultSize = await this.laysize()
      this.size.item = resultSize.data
      this.color.item = resultColor.data
    },
    close () {
      this.$emit('close')
      this.listItem = []
      this.color.selected = []
      this.product_code = ''
      this.name = ''
      this.category.selected = ''
      this.size.selected = ''
      this.quantity = ''
      this.price = ''
      this.ishowimage = false
      this.displayImg = []
      this.$refs.files.reset()
      this.$nextTick(() => {
        this.initialize()
        this.formHasErrors = false
        // Object.keys(this.form).forEach((f) => {
        //   this.$refs[f].reset()
        // })
      })
    },

    onAddFiles (files) {
      this.displayImg = []
      this.files = files
      for (var i = 0; i < files.length; i++) {
        var url = URL.createObjectURL(files[i])
        this.displayImg.push(url)
      }
    },
    async save () {
      if (this.validateData()) {
        this.loading = true

        var formData = new FormData()
        if (this.files.length > 0) {
          for (var i = 0; i < this.files.length; i++) {
            formData.append('file', this.files[i])
          }

          formData.append('product_code', this.product_code)
          formData.append('name', this.name)
          formData.append('price', this.price)
          formData.append('size_id', this.size.selected)
          formData.append('category_id', this.category.selected)
          formData.append('unit', this.unit)
          formData.append('created_by', localStorage.getItem('user'))
          formData.append('product_producer', 'gia')
          formData.append('color_product', JSON.stringify(this.listItem))
          var result = await this.themSanPham(formData)
          this.close()
        } else {
          this.loading = false
          return
        }
        this.loading = false
        this.isShowError = false
      } else {
        this.isShowError = true
        setTimeout(() => {
          this.isShowError = false
        }, 5000)
      }
    },

    validateData () {
      for (let i = 0; i < this.listItem.length; i++) {
        if (this.listItem[i].quantity == '') {
          return false
        }
      }
      if (
        this.name == '' ||
        this.price == '' ||
        this.files.length == 0 ||
        this.category.selected == '' ||
        this.size.selected == ''
      ) {
        return false
      }
      return true
    },

    selectedItems (item) {
      this.listItem = []
      for (let i = 0; i < item.length; i++) {
        var color = this.color.item.find((e) => item[i] == e.color_cd)
        this.listItem.push({
          colorNm: color.color_nm,
          quantity: '',
          color_cd: color.color_cd
        })
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
</style>
