<template>
  <div>
    <music-head class="musichead" :headwidth="980" :headReg="true">
      <span slot="head">{{userNickName}}创建的歌单</span>
      <span slot="count">（{{userPlayList.length}}）</span>
    </music-head>
    <music-p-image :musicInfo="userPlayList" :musicMargin="35" class="mpi"/>
  </div>
</template>
<script>
import MusicHead from "../Operate/MusicHead";
import MusicPImage from "../Operate/MusicPImage";
export default {
  name: "ProfileCreate",
  components: {
    MusicHead,
    MusicPImage,
  },
  props: {
    userNickName: {
      type: String,
      default: "",
    },
    userPlayList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
    };
  },
  watch: {
  },
  computed: {
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