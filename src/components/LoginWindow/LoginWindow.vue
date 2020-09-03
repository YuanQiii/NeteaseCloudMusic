<template>
  <div
    class="loginmain"
    :style="{'top': `${offsetTop}px`, 'left': `${offsetLeft}px`}"
    @mousemove="movePosition"
    @mouseup="upPosition"
    @mouseleave="leavePosition"
  >
    <div class="head" @mousedown="downPosition($event)">
      <span draggable="false">登录</span>
      <span>X</span>
    </div>
  </div>
</template>
<script>
import LoginVue from "../Discover/Recommend/Login/Login.vue";
export default {
  name: "LoginWindow",
  data() {
    return {
      clientX: 0,
      clientY: 0,
      offsetX: 0,
      offsetY: 0,
      offsetLeft: 720,
      offsetTop: 330,
      saveX: 720,
      saveY: 330,
      flag: false,
    };
  },
  computed: {
    topOffset() {
      let sY = this.saveY;
      let initY = sY - this.offsetY;
      if (this.flag) {
        return initY;
      }
    },
    leftOffset() {
      let sX = this.saveX;
      let initX = sX - this.offsetX;
      if (this.flag) {
        return initX;
      }
    },
  },
  methods: {
    downPosition(event) {
      this.flag = true;
      this.clientX = event.clientX;
      this.clientY = event.clientY;
    },
    movePosition() {
      if (this.flag) {
        this.offsetX = this.clientX - event.clientX;
        this.offsetY = this.clientY - event.clientY;

        this.offsetTop = this.saveY - this.offsetY;
        this.offsetLeft = this.saveX - this.offsetX;
      } else {
        this.saveY = this.offsetTop;
        this.saveX = this.offsetLeft;
      }
    },
    upPosition() {
      // console.log(this.offsetX);
      // console.log(this.topOffset);
      // this.saveX = this.leftOffset
      // this.saveY = this.topOffset
      // console.log(this.saveY);
      // console.log(this.saveX);
      // this.saveX = this.initX
      // console.log(this.saveX);
      // this.saveY = this.initY
      this.flag = false;
    },
    leavePosition() {
      this.flag = false;
    },
  },
};
</script>
<style scoped>
.head {
  color: #fff;
  height: 38px;
  background-color: #2d2d2d;
  display: flex;
  justify-content: space-between;
  line-height: 38px;
  padding: 0 20px;
  cursor: move;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.head > span:first-of-type {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.head > span:last-of-type {
  color: #888;
  font-weight: bold;
  cursor: pointer;
}
.loginmain {
  width: 530px;
  height: 332px;

  background-color: #fff;
  margin: auto;
  position: absolute;
  box-shadow: -1px 0px 32px -11px #000700;
  font-size: 14px;
  border-radius: 5px;
  top: 330px;
  left: 720px;
}
</style>