<template>
  <div class="settlemain">
    <settle-head />
    <settle-item v-for="(value, index) in info" :key="index" :sendinfo="value" />
    <div class="application"><span>申请成为网易音乐人</span></div>
  </div>
</template>
<script>
import SettleHead from "./SettleHead";
import SettleItem from "./SettleItem";
export default {
  name: "Sttle",
  components: {
    SettleHead,
    SettleItem
  },
  data() {
    return {
      info: [
        {
          img:
            "https://p2.music.126.net/p9U80ex1B1ciPFa125xV5A==/5931865232210340.jpg?param=62y62",
          name: "张惠妹aMEI",
          desc: "台湾歌手张惠妹",
          id: 29879272
        },
        {
          img:
            "https://p1.music.126.net/1EN_iqQWU_E3DafzEOh3cA==/3302932937408956.jpg?param=62y62",
          name: "Fine乐团",
          desc: "独立音乐人",
          id: 100167517
        },
        {
          img:
            "http://p1.music.126.net/ZuktZvjcxpYBjcWC3gmbPg==/19027048718765608.jpg?param=62y62",
          name: "萬曉利",
          desc: "民谣歌手、中国现...",
          id: 58426904
        },
        {
          img:
            "http://p1.music.126.net/v_zYgE9kmAwVGWV2c8hFxA==/7943971513291094.jpg?param=62y62",
            name: '音乐人赵雷',
            desc: '民谣歌手',
            id: 93504818
        },
        {
          img: 'http://p1.music.126.net/6wPGl_ddgAbJTx5kOohcyw==/109951163892302996.jpg?param=62y62',
          name: '王三溥',
          desc: '音乐人',
          id: 46998208
        }
      ]
    };
  }
};
</script>
<style scoped>
.application {
  font-size: 12px;
  font-weight: bold;
  background-color: #F3F3F3;
  border: solid 1px #C3C3C3;
  margin: 0 0 0 25px;
  padding: 0 5px 0 0;
    width: 190px;
  height: 31px;
  cursor: pointer;
  border-radius: 4px;
}
.application>span {
  line-height: 31px;
  padding-left: 45px;
}
.application:hover {
  background-color: #fff;
}
.settlemain {
  border: 1px solid #d3d3d3;
  background-color: #fff;
  border-bottom: none;
}
</style>