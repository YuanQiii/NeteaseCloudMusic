<template>
  <div class="itemmain">
    <div class="item" @click="jumpPage('profile', sendinfo.id)">
      <img :src="sendinfo.img"/>
      <div>
        <div class="infoname">{{sendinfo.name}}</div>
        <div class="infodesc">{{sendinfo.desc}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SettleItem",
  props: {
    sendinfo: {}
  },
  methods: {
    jumpPage(path, artistId){
      this.$router.push({
        name: path,
        params: {
          id: artistId
        }
      })
    }
  }
};
</script>
<style scoped>
.itemmain {
  padding: 0 20px;
  margin: 10px 20px;
  display: flex;
  cursor: pointer;
  background-color: #FAFAFA;
  border: solid 1px #E9E9E9;
}
.itemmain:hover {
  background-color: #F3F7FA;
}

.item>img {
  margin-left: -20px;
}

.item > div {
  display: inline-block;
  margin-left: 15px;
  font-size: 14px;
  width: 110px;
}

.infoname {
  font-weight: bold;
 padding-bottom: 20px;
 font-size: 12px;
}
.infodesc {
  color: #666666;
  font-size: 12px;
  margin-top: 0;
}
</style>