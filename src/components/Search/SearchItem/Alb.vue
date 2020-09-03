<template>
  <div>
    <music-a-image :musicInfo="searchAlbum.albums" />
  </div>
</template>
<script>
import { request } from "../../../network/request";
import MusicAImage from "../../Operate/MusicAImage";
export default {
  name: "Alb",
  components: {
    MusicAImage,
  },
  data() {
    return {
      searchAlbum: {},
    };
  },
  computed: {
    kw(){
      return this.$route.params.kw
    }
  },
  created() {
    this.getAlbums();
  },
  methods: {
    getAlbums() {
      return request({
        // url: "/search?keywords=" + this.kw + "&type=10",
        url: `/search?keywords=${this.kw}&type=10`,
      }).then((response) => {
        this.searchAlbum = response.result;
      });
    },
  },
};
</script>
<style scoped>
</style>