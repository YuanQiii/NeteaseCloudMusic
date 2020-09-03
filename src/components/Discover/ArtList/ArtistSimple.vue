<template>
  <div class="simplemain" v-if="musicIsCompleteUpdate">
    <div class="item" v-for="(value, index) in singerinfo" :key="index" >
     <span :title="value.name+'的音乐'">{{value.name}}</span>
     <img src="../../../assets/my/personal.png" v-if="jungle(value.name)" :title="value.name+'的主页'">
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArtistSimple',
  props: {
    singerinfo: {
      type: Array
    }
  },
  data(){
    return {
      jungleList: ['Dylan Matthew','群星','Beyond','张学友','BLACKPINK','米津玄師','莫文蔚','IU','杨千嬅','Imagine Dragons','Sia','宝宝巴士']
    }
  },
    computed: {
    musicIsCompleteUpdate(){
      return this.$store.state.musicIsCompleteUpdate
    }
  },
  methods: {
    jungle(value){
      return !this.jungleList.some(ele => {
        return ele == value
      })
    }
  }
}
</script>
<style scoped>

.item {
  width: 147px;
  height: 30px;
  font-size: 12px;
}
.item>span:hover {
  border-bottom: solid 1px;
  cursor: pointer;
}
.item>img {
  width: 18px;
  height: 18px;
}
  .simplemain{
    display: flex;
    flex-wrap: wrap;
    width: 740px;
    margin-left: 37px;
    margin-top: 30px;
    padding-top: 10px;
    border-top: dashed 1px #999;
  }
</style>