<template>
  <div class="headmain">
    <div class="hotre">入驻歌手</div>
    <div class="more" @click="jumpPage()"><span>查看全部 ></span></div>
  </div>
</template>
<script>
export default {
  name: "SettleHead",
  methods: {
    jumpPage(){
      this.$router.push('discover/artlist/residentsingerpage')
      this.$store.commit('changeValue', {
        type: 'artistCatCurrntIndex',
        value: 1
      })
    }
  }
};
</script>
<style scoped>
.hotre {
  font-weight: bold;
}
.headmain {
  font-size: 12px;
  display: flex;
  border-bottom: 1px solid #CCCCCC;
  color: #333;
  margin: 20px;
  margin-top: 15px;
  padding-bottom: 5px;
}

.more {
  margin-left: 45%;
  font-size: 12px;
  margin-top: 0px;
  cursor: pointer;
}
.more:hover > span {
  border-bottom: solid 1px;
}
</style>