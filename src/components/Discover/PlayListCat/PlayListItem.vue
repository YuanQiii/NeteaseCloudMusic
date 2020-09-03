<template>
  <div class="hotlistmain" v-if="musicIsCompleteUpdate">
    <music-p-image :musicInfo="playListPageCat.playlists" :musicMargin="28"/>
  </div>
</template>
<script>
import { request } from "../../../network/request";
import MusicPImage from "../../Operate/MusicPImage";
export default {
  name: "PlayListItem",
  components: {
    MusicPImage,
  },
  computed: {
    musicIsCompleteUpdate() {
      return this.$store.state.musicIsCompleteUpdate;
    },
    playListPageCat(){
      return this.$store.state.playListPageCat
    }
  },
};
</script>
<style scoped>
.hotlistmain {
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  justify-content: space-between;
}

.hotlistmain > div > img {
  cursor: pointer;
}

</style>