<template>
  <div class="main">
    <div class="catitem" v-for="(value1, index1) in titleList" :key="index1">
      <div class="title">{{value1}}</div>
      <ul>
        <div v-if="index1 == 0">
          <li
            @click="togglePage('recommendsinger', 0)"
            :class="$store.state.artistCatCurrntIndex === index1?'active item':'item'"
          >
            <span>推荐歌手</span>
          </li>
        </div>
        <div v-if="index1 == 0">
          <li
            :class="$store.state.artistCatCurrntIndex === 1?'active item':'item'"
            @click="togglePage('residentsingerpage', index1+1)"
          >
            <span>入驻歌手</span>
          </li>
        </div>
        <div v-for="(value2, index2) in noun" :key="index2" v-else>
          <li
            @click="changePage(value2, value1, init, 3*index1-1+index2)"
            :class="$store.state.artistCatCurrntIndex === 3*index1-1+index2?'active item':'item'"
          >
            <span>{{value1+value2}}</span>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import { request } from "../../../network/request";
export default {
  name: "ArtistCat",
  data() {
    return {
      noun: ["男歌手", "女歌手", "组合/乐队"],
      titleList: ["推荐", "华语", "欧美", "日本", "韩国", "其他"],
      init: -1,
    };
  },
  methods: {
    togglePage(path, index) {
      this.$store.commit("changeValue", [
        {
          type: "artistCatCurrntIndex",
          value: index,
        },
        {
          type: "musicIsCompleteUpdate",
          value: false,
        },
      ]);
      this.$router.push({
        name: path,
      });
      this.$store.commit("changeValue", {
        type: "musicIsCompleteUpdate",
        value: true,
      });
    },
    changePage(sType, sArea, sInitial, index) {
      this.$store.commit("changeValue", [
        {
          type: "artistCatCurrntIndex",
          value: index,
        },
        {
          type: "type",
          value: sType,
        },
        {
          type: "area",
          value: sArea,
        },
        {
          type: "musicIsCompleteUpdate",
          value: false,
        },
      ]);
      switch (sType) {
        case "男歌手":
          sType = 1;
          break;
        case "女歌手":
          sType = 2;
          break;
        case "组合/乐队":
          sType = 3;
          break;
      }

      switch (sArea) {
        case "华语":
          sArea = 7;
          break;
        case "欧美":
          sArea = 96;
          break;
        case "日本":
          sArea = 8;
          break;
        case "韩国":
          sArea = 16;
          break;
        case "其他":
          sArea = 0;
          break;
      }

      this.$store.commit("changeValue", [
        {
          type: "nType",
          value: sType,
        },
        {
          type: "nArea",
          value: sArea,
        },
      ]);

      request({
        url: `/artist/list?type=${sType}&area=${sArea}&initial=-1`,
      }).then((response) => {
        console.log(response);
        this.$store.commit("changeValue", [
          {
            type: "artistList",
            value: response,
          },
          {
            type: "musicIsCompleteUpdate",
            value: true,
          },
        ]);
      });

      this.$router.push({
        name: "categorysinger",
        params: {
          type: sType,
          area: sArea,
          initial: sInitial,
        },
      });
    },
  },
};
</script>
<style scoped>
.catitem {
  border-bottom: solid 1px #f9f9f9;
  padding-bottom: 10px;
}
.main {
  width: 160px;
  background-color: #f9f9f9;
  border: solid 1px #d3d3d3;
  margin-left: 25%;
  padding-left: 30px;
}
.title {
  margin-top: 40px;
  font-weight: bold;
  color: #333;
  font-size: 16px;
}
.item {
  list-style: square;
  font-size: 12px;
  padding: 5px;
  border-radius: 5px;
  background-color: #fbfbfb;
  cursor: pointer;
}
.active {
  border: 1px solid #d3d3d3;
  color: #c20c0c;
}
.item:hover > span {
  border-bottom: solid 1px;
}
ul > div {
  margin-top: 10px;
}
ul {
  padding-right: 10px;
}
</style>