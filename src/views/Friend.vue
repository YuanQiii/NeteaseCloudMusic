<template>
  <div>
    <not-login :sendinfolist="infoList">
      <img src="../assets/friend/relative.png" slot="img1" />
    </not-login>
  </div>
</template>

<script>
import NotLogin from "../components/NotLogin/NotLogin";
export default {
  name: "Friend",
  components: {
    NotLogin
  },
  data() {
    return {
      infoList: {
        d1: "关注明星 发现精彩",
        d2: "你可以关注明星和好友品味他们的私房歌单",
        d3: "通过他们的动态发现更多精彩音乐"
      }
    };
  }
};
</script>