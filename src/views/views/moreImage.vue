<template>
  <v-dialog
    v-model="show"
    transition="dialog-bottom-transition"
    persistent
    max-width="800"
  >
    <v-card>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>More Images</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-col cols="auto">
        <v-row>
          <v-col v-for="(n, index) in images" :key="index" class="d-flex child-flex" cols="4">
            <v-img
              :src="n"
              :lazy-src="n"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col> </v-row></v-col></v-card
  ></v-dialog>
</template>
<script>
export default {
  props: {
    dialog: false,
    imagesParam:{
      default:[],
      type: Array
    }
  },
  data: () => ({
    images:[]
  }),
  computed:{
    show(){
        return this.dialog
    }
  },
  watch:{
    imagesParam(){
      this.images = this.imagesParam
    }
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
  },
};
</script>