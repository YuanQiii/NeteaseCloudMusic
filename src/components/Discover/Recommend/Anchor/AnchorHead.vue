<template>
  <div class="headmain">
    <div class="hotre">热门主播</div>
    <div class="more"></div>
  </div>
</template>
<script>
export default {
  name: "AnchorHead"
};
</script>
<style scoped>
.hotre {
  font-weight: bold;
  padding-top: 30px;
}
.headmain {
  font-size: 12px;
  display: flex;
  border-bottom: 1px solid #CCCCCC;
  color: #333;
  margin: 20px;
  margin-top: 0px;
  padding-bottom: 5px;
}

.more {
  margin-left: 45%;
  font-size: 12px;
  margin-top: 0px;
  cursor: pointer;
}
.more::after {
  content: "";
  height: 0px;
  position: absolute;
  width:  55px;
  background-color: black;
  top: 78%;
  left: 65%;

}
.more:hover.more::after{
  height: 1px;
}
</style>