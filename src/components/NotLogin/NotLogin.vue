<template>
  <div>
    <div class="notlogin">
        <slot name='img1'/>
      <div class="right">
        <div>{{sendinfolist.d1}}</div>
        <div>{{sendinfolist.d2}}</div>
        <div>{{sendinfolist.d3}}</div>
        <slot name="img2" />
        <div>立即登录</div>
      </div>
    </div>
    <login-window />
  </div>
</template>
<script>
import LoginWindow from "../LoginWindow/LoginWindow";
export default {
  name: "NotLogin",
  components: {
    LoginWindow
  },
  props: {
    sendinfolist: {}
  }
};
</script>
<style scoped>
.notlogin {
  width: 982px;
  height: 700px;
  border: solid 1px #d3d3d3;
  border-bottom: none;
  margin: 0 460.5px;
  background-color: #fff;
}
.notlogin>img:nth-of-type(1) {
  margin-left: 30px;
  margin-top: 100px;
}

.right {
  float: right;
  margin-top: 120px;
  margin-right: 140px;
}

.right > div:nth-of-type(1) {
  font-size: 35px;
  color: #333333;
  margin-bottom: 15px;
}

.right > div:nth-of-type(2) {
  color: #333333;
}

.right > div:nth-of-type(4) {
  margin-top: 15px;
}

.right > div:last-of-type {
  margin-top: 30px;
  width: 170px;
  height: 45px;
  color: #e0e4ea;
  line-height: 45px;
  background-color: #3584d0;
  background: linear-gradient(0deg, #1b6ebe, #4492db);
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}

.right > div:last-of-type:hover {
  background: linear-gradient(0deg, #3291cd, #5da7eb);
}
</style>


