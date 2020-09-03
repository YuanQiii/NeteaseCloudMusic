<template>
  <div>
    <div class="headmain">
      <div class="hotre">
        <slot name="head" />
      </div>
      <div class="more">
        <span>更多 ></span>
      </div>
    </div>
    <div class="list">
      <div
        class="item"
        v-for="(value, index) in (sendType === 1?sendInfo.programs:sendInfo.toplist) "
        :key="index">
        <img :src="sendType === 1?value.coverUrl:value.program.coverUrl" alt />
        <div>
          <img src="../../../../assets/hothead/play.png" class="play" />
        </div>
        <div class="info">
          <span class="title">
            <span>{{sendType === 1?value.name:value.program.name}}</span>
          </span>
          <span class="brand">
            <span>{{sendType === 1?value.dj.brand:value.program.dj.brand}}</span>
          </span>
        </div>
        <div class="tag">{{sendType === 1?value.radio.category:value.program.radio.category}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DjProgramItem",
  props: {
    sendInfo: {
      type: Object,
    },
    sendType: {
      type: Number,
    },
  },
};
</script>
<style scoped>
.play {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 20px;
  left: 10px;
  background-color: #333;
  border-radius: 10px;
  opacity: 0;
  cursor: pointer;
}
.play:hover {
  opacity: 1;
}
.tag {
  font-size: 12px;
  color: #999;
  padding: 1px 5px;
  height: 18px;
  text-align: center;
  border: solid 1px #999;
  cursor: pointer;
}
.tag:hover {
  color: #333;
  border: solid 1px #333;
}
.list {
  padding-left: 20px;
  border: solid 1px #d3d3d3;
  width: 404px;
}

.info {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-around;
}
.title {
  color: #333;
  width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.title:hover{
  border-bottom: solid 1px ;
}
.brand {
  color: #999;
  cursor: pointer;
}
.brand:hover > span {
  border-bottom: solid 1px;
}
.item {
  display: flex;
  font-size: 12px;
  width: 404px;
  padding: 10px 0;
  position: relative;
}
.item:nth-of-type(even){
  background-color: #f7f7f7;
}
.item:hover {
  background-color: #eee;
}
.item > img {
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.item > img:hover + div > .play {
  opacity: 1;
}
.headmain {
  width: 426px;
  height: 42px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #c10d0c;
  padding: 34 0 0 10px;
  color: #333;
}
.hotre {
  font-size: 24px;
}
.hotre:hover > span,
.more:hover > span {
  border-bottom: solid 2px;
  cursor: pointer;
}
.more {
  font-size: 12px;
  margin-top: 12px;
}
</style>