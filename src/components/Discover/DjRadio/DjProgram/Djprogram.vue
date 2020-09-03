<template>
  <div class="djprogram">
    <div class="left">
      <dj-program-item :sendInfo="programRecommend" :sendType='1'>
        <span slot="head">热门推荐</span>
      </dj-program-item>
    </div>
    <div class="right">
      <dj-program-item :sendInfo="programTopList" :sendType='2'>
        <span slot="head">节目排行榜</span>
      </dj-program-item>
    </div>
  </div>
</template>
<script>
import DjProgramItem from './DjProgramItem'
import {request} from '../../../../network/request'
export default {
  name: 'DjProgram',
  components: {
    DjProgramItem
  },
  data(){
    return {
      programRecommend: {},
      programTopList: {}
    }
  },
  created(){
    this.getProgramRecommend()
    this.getProgramTopList()
  },
  methods: {
    getProgramRecommend(){
      return request({
        url: '/program/recommend'
      }).then(response => {
        this.programRecommend = response
      })
    },
    getProgramTopList(){
      return request({
        url: '/dj/program/toplist?limit=10'
      }).then(response => {
        this.programTopList = response
      })
    }
  }
}
</script>
<style scoped>
.djprogram {
  display: flex;
  justify-content: space-around;
}
</style>