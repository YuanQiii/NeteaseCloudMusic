<template>
  <div class="main">
    <play-list-cat-head />
    <play-list-item />
    <offset-change :musicTotal="playListPageCat.total" :musicOffset="35" :musicWidth="980"/>
  </div>
</template>
<script>
import PlayListCatHead from './PlayListCatHead'
import PlayListItem from './PlayListItem'
import OffsetChange from "../../OffsetChange/OffsetChange"
export default {
  name: 'PlayListCat',
  components: {
    PlayListCatHead,
    PlayListItem,
    OffsetChange
  },
  computed: {
    playListPageCat(){
      return this.$store.state.playListPageCat
    }
  }
}
</script>
<style scoped>

 .main {
   width: 980px;
   border: 1px solid #d3d3d3;
   margin-left: 25%;
   background-color: #fff;
   padding: 40px 0;
 }
</style>