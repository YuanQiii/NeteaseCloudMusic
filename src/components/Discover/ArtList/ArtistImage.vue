<template>
  <div class="imgmain" v-if="musicIsCompleteUpdate">
    <div class="ArtistImage" v-for="(value, index) in singerinfo" :key="index" @click="jumpPage(value.id)">
      <img :src="value.img1v1Url" :title="value.name+'的音乐'" />
      <div>
        <span :title="value.name+'的音乐'">{{value.name}}</span>
        <img src="../../../assets/my/personal.png" :title="value.name+'的个人主页'" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ArtistImage",
  props: {
    singerinfo: {
      type: Array,
    }
  },
  computed: {
    musicIsCompleteUpdate(){
      return this.$store.state.musicIsCompleteUpdate
    }
  },
  methods: {
    jumpPage(artistId){
      this.$router.push({
        name: 'singerdetail',
        params: {
          id: artistId
        }
      })
    }
  }
};
</script>
<style scoped>
.imgmain {
  display: flex;
  flex-wrap: wrap;
  width: 725px;
  justify-content: space-between;
  margin-left: 36px;
}
.ArtistImage {
  position: relative;
  font-size: 12px;
  margin-top: 30px;
  margin-right: 5px;
}
.ArtistImage > img:first-of-type {
  width: 130px;
  height: 130px;
  cursor: pointer;
}
.ArtistImage > div {
  display: flex;
  justify-content: space-between;
  width: 130px;
}
.ArtistImage > div > span:hover {
  cursor: pointer;
  border-bottom: solid 1px;
}
.ArtistImage > div > img {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
</style>