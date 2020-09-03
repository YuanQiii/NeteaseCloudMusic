<template>
  <div class="r6" @click="toggleLyrics()" :style="fontBlack?'color: #666': ''">
    <span >{{descIsOpen?'收起':'展开'}}</span>
    <img
      src="../../assets/arrow/album_left.png"
      :style="descIsOpen?'transform: rotateZ(90deg)':'transform: rotateZ(-90deg)'"
    />
  </div>
</template>
<script>
export default {
  name: "SpreadOrClose",
  props: {
    fontBlack: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    descIsOpen(){
      return this.$store.state.descIsOpen
    }
  },
  methods: {
    toggleLyrics(){
      this.$store.commit('changeValue', {
        type: 'descIsOpen',
        value: !this.descIsOpen
      })
    }
  },
};
</script>
<style scoped>
.r6 {
  font-size: 12px;
  color: #0c73c2;
  cursor: pointer;
  position: relative;
}
.r6:hover > span {
  border-bottom: solid 1px;
}
.r6 > img {
  width: 15px;
  height: 15px;
  position: relative;
  top: 3px;
}
</style>