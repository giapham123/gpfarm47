<template>
  <v-container>
     <span>Result: {{ result }}</span>
   <!-- <button
      type="button"
      @click="!rolling && prizeNumber < 8 && prizeNumber++"
      :disabled="rolling || prizeNumber === 8"
    >
      Add
    </button>
    <button
      type="button"
      @click="!rolling && prizeNumber > 2 && prizeNumber--"
      :disabled="rolling || prizeNumber === 2"
    >
      Remove
    </button> -->
    <div class="wheel-wrapper">
      <div class="wheel-pointer" @click="onClickRotate">Start</div>
      <div
        class="wheel-bg"
        :class="{ freeze: freeze }"
        :style="`transform: rotate(${wheelDeg}deg)`"
      >
        <div class="prize-list">
          <div
            class="prize-item-wrapper"
            v-for="(item, index) in prizeList"
            :key="index"
          >
            <div
              class="prize-item"
              :style="`transform: rotate(${
                (360 / prizeList.length) * index
              }deg)`"
            >
              <div class="prize-name">
                {{ item.name }}
              </div>
              <div class="prize-icon">
                <img :src="item.icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    result: 'Trống',
    freeze: false,
    rolling: false,
    wheelDeg: 0,
    prizeNumber: 8,
    prizeListOrigin: [
      {
        icon: 'https://picsum.photos/40?random=1',
        name: '50%'
      },
      {
        icon: 'https://picsum.photos/40?random=6',
        name: '20%'
      },
      {
        icon: 'https://picsum.photos/40?random=2',
        name: 'Mật Ong'
      },
      {
        icon: 'https://picsum.photos/40?random=3',
        name: 'Nghệ'
      },
      {
        icon: 'https://picsum.photos/40?random=6',
        name: 'Cacao'
      },
      {
        icon: 'https://picsum.photos/40?random=4',
        name: 'Sầu Riêng'
      },
      {
        icon: 'https://picsum.photos/40?random=5',
        name: '10k'
      },
      {
        icon: 'https://picsum.photos/40?random=6',
        name: 'Thank you!'
      }
    ]
  }),
  computed: {
    prizeList () {
      return this.prizeListOrigin.slice(0, this.prizeNumber)
    }
  },
  methods: {
    onClickRotate () {
      this.result = 'Trống'
      if (this.rolling) {
        return
      }
      const result = Math.floor(Math.random() * this.prizeList.length)
      this.roll(result)
    },
    roll (result) {
      this.rolling = true
      const { wheelDeg, prizeList } = this
      this.wheelDeg =
        wheelDeg -
        wheelDeg % 360 +
        6 * 360 +
        (360 - 360 / prizeList.length * result)
      setTimeout(() => {
        this.rolling = false
        this.result = prizeList[result].name
      }, 4500)
    }
  },
  watch: {
    prizeNumber () {
      this.freeze = true
      this.wheelDeg = 0

      setTimeout(() => {
        this.freeze = false
      }, 0)
    }
  }
}
</script>
<style>
html {
  background: #dd7c7d;
}

.wheel-wrapper {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.wheel-pointer {
  width: 60px;
  height: 60px;
  border-radius: 1000px;
  background: yellow;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 60px;
  z-index: 10;
  cursor: pointer;

}
.wheel-bg {
  width: 100%;
  height: 100%;
  border-radius: 1000px;
  overflow: hidden;
  transition: transform 4s ease-in-out;
  background: #7eef97;

}

.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
}

.prize-item-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
}

.prize-item {
  width: 100%;
  height: 100%;
  transform-origin: bottom;
}
</style>
