<template>
  <div class="djmain">
    <dj-cat @change-type="changeType"/>
    <router-view />
    <div v-show="isShow">
      <dj-program />
      <dj-recommend />
    </div>
  </div>
</template>

<script>
import DjProgram from "./DjProgram/Djprogram";
import DjRecommend from "./DjRecommend/DjRecommend";
import DjCat from "./DjCat";
export default {
  name: "DjRadio",
  components: {
    DjCat,
    DjProgram,
    DjRecommend,
  },
  data(){
    return {
      isShow: true
    }
  },
  methods: {
    changeType(data){
      this.isShow = data
    }
  }
};
</script>
<style scoped>
.djmain {
  width: 980px;
  padding-bottom: 20px;
  margin-left: 25%;
  border: solid 1px #d3d3d3;
  background-color: #fff;
}
</style>