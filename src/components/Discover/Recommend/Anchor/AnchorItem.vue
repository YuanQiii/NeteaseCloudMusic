<template>
  <div class="itemmain">
    <div class="item" @click="jumpPage('profile', sendinfo.id)">
      <img :src="sendinfo.img" />
      <div>
        <div class="infoname">
          <span>{{sendinfo.name}}</span>
          <div class="img">
            <img src="../../../../assets/banner/v.png" />
          </div>
        </div>
        <div class="infodesc">{{sendinfo.desc}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AnchorItem",
  props: {
    sendinfo: {}
  },
  methods: {
    jumpPage(path, id){
      this.$router.push({
        name: path,
        params: {
          id: id
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
  margin-right: 0px;
  display: flex;
}

.item > img {
  margin-left: -20px;
  cursor: pointer;
}

.item > div {
  display: inline-block;
  margin-left: 10px;
  font-size: 14px;
  width: 150px;
}

.infoname {
  font-weight: bold;
  padding-bottom: 10px;
  font-size: 12px;
  cursor: pointer;
}
.infoname > span {
  position: relative;
}
.infoname>span:hover {
  border-bottom: solid 1px black;
}

.img {
  position: relative;
  display: inline-block;
}
.img > img {
  position: absolute;
  width: 11px;
  height: 13px;
  top: -11px;
}
.infodesc {
  color: #666666;
  font-size: 12px;
  margin-top: 0;
}
</style>