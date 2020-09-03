<template>
  <div class="playlistdisplay">
    <display-head />
    <div class="displaycontent">
      <display-title />
      <display-lyric />
    </div>
  </div>
</template>
<script>
import DisplayHead from "./DisplayHead";
import DisplayTitle from "./DisplayTitle";
import DisplayLyric from "./DisplayLyric";
export default {
  name: "PlaylistDisplay",
  components: {
    DisplayHead,
    DisplayTitle,
    DisplayLyric,
  },
};
</script>
<style scoped>
.displaycontent {
  display: flex;
}

.playlistdisplay {
  position: absolute;
  width: 976px;
  height: 300px;
  background-color: #161616;
  top: -300px;
  border-radius: 5px;
  box-shadow: 0px -1px 8px 0px rgba(11, 1, 20, 0.46);

}
</style>