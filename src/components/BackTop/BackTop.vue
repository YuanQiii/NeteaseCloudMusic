<template>
  <div class="backtopmain" v-show="scrollValue > 99" @click="back">
    <img src="../../assets/my/backtop.png" alt />
    <div>TOP</div>
  </div>
</template>
<script>
export default {
  name: "BackTop",
  data() {
    return {
      scrollValue: 0
    };
  },
  mounted() {
    window.addEventListener("scroll", this.pageScroll);
  },
  methods: {
    pageScroll() {
      this.scrollValue =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },
    back(){
      document.documentElement.scrollTop = 0
    }
  },
};
</script>
<style scoped>
.backtopmain {
  position: fixed;
  height: 42px;
  width: 47px;
  background-color: #f2f2f2;
  border: solid 1px #c9c9c9;
  top: 81%;
  left: 77.5%;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
}
.backtopmain > img {
  width: 10px;
  position: relative;
  top: 3px;
}
.backtopmain > div {
  margin-top: 7px;
}
.backtopmain:hover {
  background-color: #ededed;
}
</style>