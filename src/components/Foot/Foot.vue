<template>
  <div class="footmain">
   <terms />
   <appreciate />
  </div>
</template>
<script>
import Terms from "./Terms"
import Appreciate from "./Appreciate"
export default {
  name: 'Foot',
  components: {
    Terms,
    Appreciate
  }
}
</script>

<style scoped>
.footmain {
  display: flex;
  justify-content: center;
  background-color: #F2F2F2;
  border-top: solid 1px #D3D3D3;
}
</style>