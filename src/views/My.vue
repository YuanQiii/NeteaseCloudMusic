<template>
<div >
  <not-login :sendinfolist='infoList'> 
    <img src="../assets/my/cloud.png" slot="img1">
    <img src="../assets/my/equipment.png" slot="img2">
  </not-login>
</div>
</template>

<script>
import NotLogin from "../components/NotLogin/NotLogin"
export default {
  name: 'My',
  components: {
    NotLogin
  },
  data(){
    return {
      infoList: {
        d1: '登录网易云音乐',
        d2: '查看并管理你收藏的私房音乐，',
        d3:'方便地随时随地收听'
      }
    }
  }
}
</script>
<style scoped>
  .notlogin {
    width: 982px;
    height: 700px;
    border: solid 1px #D3D3D3;
    border-bottom: none;
    margin: 0 460.5px;
    background-color: #fff;
    /* display: flex;
    justify-content: center; */
  }
  .left {
    margin-left: 80px;
    margin-top: 100px;
  }

  .right {
    float: right;
    margin-top: 120px;
    margin-right: 180px;
  }

  .right>div:nth-of-type(1) {
    font-size: 35px;
    color: #333333;
    margin-bottom: 15px;
  }

  .right>div:nth-of-type(2){
    color: #333333;
  }

  .right>div:nth-of-type(4){
    margin-top: 15px;
  }

  .right>div:last-of-type {
    margin-top: 30px;
    width: 170px;
    height: 45px;
    color: #E0E4EA;
    line-height: 45px;
    background-color: #3584D0;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }

  .right>div:last-of-type:hover{
    opacity: .9;
  }
  
</style>


