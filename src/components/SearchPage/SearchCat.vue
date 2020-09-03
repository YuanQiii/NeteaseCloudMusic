<template>
  <div class="main">
    <div class="total">
      搜索"{{key}}"，找到
      <span>20</span>
      {{unit[searchIndex]}}
    </div>
    <div class="head">
      <div
        :class="searchIndex == index?'item active':'item'"
        v-for="(value, index) in menuList"
        :key="value"
        @click="changeCat(index)"
      >{{value}}</div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "SearchCat",
  data() {
    return {
      menuList: [
        "单曲",
        "歌手",
        "专辑",
        "视频",
        "歌词",
        "歌单",
        "主播电台",
        "用户",
      ],
      menupath: [
        "single",
        "singer",
        "alb",
        "video",
        "lyrics",
        "playlis",
        "station",
        "users",
      ],
      unit: [
        "首单曲",
        "个歌手",
        "张专辑",
        "个视频",
        "个歌词",
        "个歌单",
        "个节目",
        "个用户",
      ],
    };
  },
  computed: {
    searchIndex() {
      return this.$store.state.searchIndex;
    },
    key(){
      return this.$route.params.kw
    }
  },
  methods: {
    changeCat(index) {
      this.$router.push({
        name: this.menupath[index],
        params: {
          kw: this.key
        }
      })
      this.$store.commit("changeValue", [
        {
          type: "searchIndex",
          value: index,
        },
        {
          type: "searchCurrentCatName",
          value: this.menupath[index],
        },
      ]);
    },
  },
};
</script>
<style scoped>
.total {
  font-size: 12px;
  color: #999;
  margin-top: -20px;
  margin-bottom: 20px;
  margin-left: 40px;
}
.total > span {
  color: #c20c2c;
}
.item {
  width: 111px;
  height: 39px;
  background-color: #f9f9f9;
  line-height: 39px;
  text-align: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  padding: 2px 2px 0 0;
  border-bottom: solid 1px #ccc;
  border-top: solid 2px #ccc;
}
.item:first-of-type {
  border-left: solid 1px #ccc;
}
.item:last-of-type {
  border-right: solid 1px #ccc;
}
.item.active {
  border-top: solid 2px #d13030;
  border-left: solid 1px #ccc;
  border-right: solid 1px #ccc;
  border-bottom: none;
  background-color: #fff;
}
.item:hover {
  border-top: solid 2px #d13030;
}

.head {
  display: flex;
  justify-content: space-evenly;
  width: 900px;
  margin: 0 auto;
}
</style>