<template>
  <div>
    <music-head class="musichead" :headwidth="980" :headReg="true">
      <span slot="head">{{userNickName}}收藏的歌单</span>
      <span slot="count">({{userPlayListCollect.length}})</span>
    </music-head>
    <music-p-image :musicInfo="userPlayListCollect" :musicMargin="35" class="mpi" />
  </div>
</template>
<script>
import { request } from "../../network/request";
import MusicHead from "../Operate/MusicHead";
import MusicPImage from "../Operate/MusicPImage";
export default {
  name: "ProfileCollect",
  components: {
    MusicHead,
    MusicPImage,
  },
  props: {
    userPlayListCollect: {
      type: Array,
      default: () => {
        return [];
      },
    },
    userNickName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.mpi {
  width: 1050px;
  margin-left: -35px;
}
.musichead {
  margin-left: 0px;
}
</style>