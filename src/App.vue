<template>
  <div>
    <main-tab-bar />
    <main-nav />
    <router-view />
    <back-top />
    <music-audio />
    <foot />
  </div>
</template>

<script>
import MainTabBar from "./components/TabBar/MainTabBar";
import MainNav from "./components/Nav/MainNav";
import Foot from "./components/Foot/Foot";
import MusicAudio from "./views/MusicAudio";
import BackTop from "./components/BackTop/BackTop"
export default {
  name: "App",
  components: {
    MainTabBar,
    MainNav,
    Foot,
    MusicAudio,
    BackTop
  },
};
</script>

<style scoped>
div {
  background-color: #f5f5f5;
}
</style>