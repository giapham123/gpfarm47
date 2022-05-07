<template>
    <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outlined small
                color="indigo" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn outlined small
                color="indigo" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    dialogDelete: false,
    params: Object
  },
  data: () => ({
  }),

  computed: {

  },

  watch: {
  },

  created () {
  },

  methods: {
    ...mapActions('quanlyhoadon', ['saveErrorProduct']),
    async deleteItemConfirm (item) {
      this.$emit('closeDelete')
      this.$nextTick(() => {
        this.saveError({ id: this.params.id })
        this.$emit('finished')
      })
    },
    async saveError (param) {
      var result = await this.saveErrorProduct(param)
    },
    closeDelete () {
      this.$emit('closeDelete')
      this.$nextTick(() => {

      })
    }
  }
}
</script>
