<template>
  <div>
    <div class="headmain" :style="{width: headwidth+'px'}">
      <div class="hotre">
        <slot name="head" />
      </div>
      <div class="cat">
        <div class="catitem" v-for="value in headcat" :key="value">
          <span>{{value}}</span>
        </div>
      </div>
      <div class="more">
        <slot name="more" />
      </div>
    </div>
  </div>
</template>
<script>
import {request} from '../../../network/request'
export default {
  name: "ArtistHead",
  props: {
    headwidth: {
      type: Number,
      default: 720,
    },
    headcat: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data(){
    return {
      // catType: ''
    }
  },
  methods: {
    // changeCat(value) {
    //   switch (value) {
    //     case "全部":
    //       this.catType = "ALL";
    //       break;
    //     case "华语":
    //       this.catType = "ZH";
    //       break;
    //     case "欧美":
    //       this.catType = "EA";
    //       break;
    //     case "韩国":
    //       this.catType = "KR";
    //       break;
    //     case "日本":
    //       this.catType = "JP";
    //       break;
    //   }
    //   request({
    //     url: "/album/new?area="+this.catType+"&limit=35"
    //   }).then(response => {
    //     this.$store.commit('replaceValue',{
    //       type: 'allAlbumInfo',
    //       value: response.albums
    //     })
    //     console.log(response);
    //   })
    // },
  },
};
</script>
<style scoped>
.headmain {
  width: 720px;
  height: 42px;
  display: flex;

  border-bottom: 2px solid #c10d0c;
  padding: 34px 0 0 0;
  color: #333;
  margin-left: 36px;
}
.hotre {
  font-size: 24px;
}
.cat {
  margin-left: 10px;
  display: flex;
  justify-content: space-evenly;
  width: 257px;
  font-size: 12px;
  height: 25px;
  padding-top: 5px;
}

.catitem {
  border-right: 1px solid #ccc;
  padding-right: 15px;
  margin: 5px;
  cursor: pointer;
}
.catitem:last-of-type {
  border-right: none;
}
.catitem:hover > span {
  border-bottom: solid 1px;
}
.more:hover > span {
  border-bottom: solid 1px black;
  cursor: pointer;
}
.more {
  margin-left: 55%;
  font-size: 12px;
  margin-top: 12px;
}
</style>