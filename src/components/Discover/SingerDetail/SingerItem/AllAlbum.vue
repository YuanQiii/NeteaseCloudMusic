<template>
  <div>
    <music-a-image :musicInfo="artistAlbum.hotAlbums.slice(0,12)" :musicIsSinger="true"/>
  </div>
</template>
<script>
import MusicAImage from "../../../Operate/MusicAImage"
import {request} from "../../../../network/request"
export default {
  name: "AllAlbum",
  components: {
    MusicAImage
  },
  data() {
    return {
      artistAlbum: {},
      id: this.$route.params.id
    };
  },
  created(){
    this.getArtistAlbum(this.id)
  },
  methods: {
    getArtistAlbum(id){
      return request({
        url: `/artist/album?id=${id}`
      }).then(response => {
        this.artistAlbum = response
      })
    }
  },
};
</script>
<style scoped>
</style>
