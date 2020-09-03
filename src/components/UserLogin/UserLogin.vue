<template>
  <div class="loginmain">
    电话：
    <input type="text" v-model="phone" />
    <hr />密码：
    <input type="password" v-model="pwd" />
    <hr />
    <button @click="login">登录</button>
    <button @click="logout">退出</button>
    <button @click="status">状态</button>
  </div>
</template>
<script>
import { request } from "../../network/request";
import axios from "axios"
export default {
  name: "UserLogin",
  data() {
    return {
      phone: null,
      pwd: null,
      token: null,
      cookie: null
    };
  },
  methods: {
    login() {
      return request({
        url: "/login/cellphone?phone=18908077873&password=123yqgta"
      }).then(response => {
        console.log(response.token);
        console.log(response.cookie);
      });
    },
    logout() {
      return request({
        url: "/logout"
      }).then(response => {
        console.log(response);
      });
    },
    status() {
      console.log(document.cookie);
       request({
        url: `/login/status`,
      }).then(response => {
        console.log(response);
      });
      
    }
  }
};
</script>
<style scoped>
.loginmain {
  height: 30vh;
}
</style>