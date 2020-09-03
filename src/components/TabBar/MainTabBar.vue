<template>
  <div>
    <tab-bar class="tabBar">
      <img src="../../assets/topbar.jpg" alt />
      <tab-bar-item
        v-for="(item, index) in tabList"
        :key="index"
        @click.native="activeChange(index)"
        :class="index==currentIndex?'active':''"
      >
        {{item}}
        <span :class="index==currentIndex?'active':''"></span>
      </tab-bar-item>
      <search />
      <div class="center">创作者中心</div>
      <a @click="toggle">登录</a>
    </tab-bar>
    <user-login v-if="isShow" />
  </div>
</template>

<script>
import TabBar from "./TabBar";
import TabBarItem from "./TabBarItem";
import Search from "../Search/Search";
import UserLogin from "../UserLogin/UserLogin";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
    Search,
    UserLogin
  },
  data() {
    return {
      tabList: ["发现音乐", "我的音乐", "朋友", "商城", "音乐人", "下载客户端"],
      tabPath: ["/", "my", "friend", "market", "musician", "download"],
      currentIndex: 0,
      isShow: false,
      count: 0
    };
  },
  methods: {
    activeChange(index) {
      this.currentIndex = index;
      this.$router.push(this.tabPath[index]);

      if (this.$route.path == "/discover") {
        this.$store.state.isIndexPage = true;
      } else {
        this.$store.state.isIndexPage = false;
      }
      if (this.count == 0) {
        if (this.$route.path == "/discover") {
          this.$store.state.isIndexPage = false;
          this.count++;
        }
      }
    },
    toggle() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style scoped>
span {
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 8px solid;
  border-color: transparent;
  position: absolute;
  top: 55px;
  left: 40%;
}

span.active {
  border-color: transparent transparent #c20c0c;
}
.tabBar {
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #999999;
}

img {
  margin-top: -5px;
  height: 70px;
  width: 177px;
  padding-right: 20px;
}

.active {
  background-color: #333;
}

.center {
  border: 1px solid #4f4f4f;
  padding: 0 16px;
  border-radius: 20px;
  height: 32px;
  font-size: 5px;
  color: #ccc;
  display: flex;
  align-items: center;
  margin: 19px 0 0 12px;
  cursor: pointer;
}

.center:hover {
  border: 1px solid #ccc;
}

a {
  color: #787878;
  font-size: 12px;
  margin-top: 28px;
  margin-left: 20px;
  text-decoration: none;
}

a:hover {
  color: #999;
}
</style>