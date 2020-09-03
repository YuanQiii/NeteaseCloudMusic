<template>
  <div class="page">
    <div class="cat">
    <artistCat />      
    </div>
    <div class="router">
    <router-view />      
    </div>

  </div>
</template>

<script>
import ArtistCat from './ArtistCat'
export default {
  name: 'ArtList',
  components: {
    ArtistCat
  }
}
</script>
<style scoped>
.page {
  display: flex;
  margin-left: 22%;
}
.router {
  margin-left: 46px;
  background-color: #fff;
  padding-right: 30px;
  border: solid 1px #d3d3d3;
  padding-bottom: 40px;
}
</style>