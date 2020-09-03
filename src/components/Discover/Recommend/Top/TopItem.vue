<template>
  <div class="main">
    <div v-for="(value, index) in sendList" :key="index" class="value">
      <div class="left">
        <span>{{index+1}}</span>
      </div>
      <div class="right" @click="jumpPage('digitalsingle', value.id)">
        <span>{{value.name}}</span>
      </div>
      <operate :sendShow="[true, true, true, false, false, false]" class="operate" />
    </div>
    <div class="all" @click="jumpPage('toplist')">
      <div>查看全部></div>
    </div>
  </div>
</template>

<script>
import Operate from "../../../Operate/Operate";
export default {
  name: "TopItem",
  props: {
    sendList: {
      type: Object,
      default: () => {
        return {};
      },
    },
    topListCat: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Operate,
  },
  methods: {
    jumpPage(path, id) {
      if (id) {
        this.$router.push({
          name: path,
          params: {
            id: id,
          },
        });
      } else {
        this.$router.push({
          name: path,
        });
        this.$store.commit("changeValue", {
          type: "musicTopListCatName",
          value: this.topListCat,
        });
      }
    },
  },
};
</script>

<style scoped>
.value:hover > .operate {
  z-index: 99;
}
.value:hover > .right {
  width: 100px;
}
.operate {
  position: absolute;
  left: -130px;
  top: -5px;
  z-index: -1;
  opacity: 0.8;
}
.main > div:nth-of-type(odd) {
  background-color: #e8e8e8;
}
.main > div:nth-of-type(even) {
  background-color: #f4f4f4;
}
.all {
  font-size: 12px;
  line-height: 34px;
  border-left: solid 1px #c7c7c7;
  padding-left: 150px;
  cursor: pointer;
  position: relative;
}
.all::after {
  content: "";
  height: 0px;
  position: absolute;
  width: 55px;
  background-color: black;
  top: 70%;
}
.all:hover.all::after {
  height: 1px;
}
.all:last-of-type {
  border-right: solid 1px #c7c7c7;
}
.left {
  width: 35px;
  height: 32px;
  margin-right: 10px;
}
.left > span {
  padding-left: 25px;
  font-size: 16px;
  line-height: 34px;
  border-left: solid 1px #c7c7c7;
  text-align: center;
}
.right {
  line-height: 34px;
  margin-left: 10px;
  box-sizing: border-box;
  height: 34px;
  width: 170px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.right:hover > span {
  border-bottom: solid 1px black;
}

.value:nth-of-type(1) > .left {
  color: #c10d0c;
}
.value:nth-of-type(2) > .left {
  color: #c10d0c;
}
.value:nth-of-type(3) > .left {
  color: #c10d0c;
}
.value {
  font-size: 12px;
  display: flex;
  position: relative;
}
</style>