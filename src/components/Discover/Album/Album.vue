<template>
  <div class="albmain">
    <music-head :headwidth="900">
      <span slot="head">热门新碟</span>
    </music-head>
    <music-a-image :musicInfo="albumNewest" :musicReflective="true"/>
    <music-head :headwidth="900" :headcat="headcat">
      <span slot="head">全部新碟</span>
    </music-head>
    <music-a-image :musicInfo="topAlbum" :musicReflective="true"/>
  </div>
</template>

<script>
import {request} from '../../../network/request'
import MusicHead from "../../Operate/MusicHead"
import MusicAImage from "../../Operate/MusicAImage"
export default {
  name: 'Album',
  components: {
    MusicHead,
    MusicAImage
  },  
  data(){
    return {
      type: ['ALL','ZH','EA','KR','JP'],
      headcat: ['全部','华语','欧美','韩国','日本'],
      albumNewest: [],
      topAlbum: []
    }
  },
  created(){
    this.getAlbumNewest()
  },
  mounted(){
    this.getAllAlbum(this.type[0])
  },
  methods: {
    getAlbumNewest(){
      return request({
        url: '/album/newest'
      }).then(response => {
        // this.$store.commit('addValue', {
        //   type: 'allAlbumInfo',
        //   value: response.albums.slice(0,10)
        // })
        this.albumNewest = response.albums.slice(0,10)
      })
    },
    getAllAlbum(type){
      return request({
        url: `/top/album?area=${type}&limit=35`
      }).then(response => {
        // this.$store.commit('addValue', {
        //   type: 'allAlbumInfo',
        //   value: response.albums
        // })
        this.topAlbum = response.albums
      })
    }
  }
}
</script>
<style scoped>
.albmain {
  background-color: #fff;
  border: solid 1px #d3d3d3;
  width: 980px;
  margin-left: 25%;
}
</style>