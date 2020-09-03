<template>
  <div class="re">
    <div class="recommend">
      <banner/>
      <hot />
      <newest-album />
      <top />
    </div>
    <div class="settle">
      <login />
      <settle />
      <anchor />
    </div>
  </div>
</template>

<script>
import { request } from "../../../network/request";
import Banner from "./Banner/Banner";
import Hot from "./Hot/Hot";
import NewestAlbum from "./NewestAlbum/NewestAlbum";
import Top from "./Top/Top";
import Settle from "./Settle/Settle";
import Login from "./Login/Login";
import Anchor from "./Anchor/Anchor";
export default {
  name: "Recommend",
  components: {
    Banner,
    Hot,
    NewestAlbum,
    Top,
    Settle,
    Login,
    Anchor,
  },
};
</script>

<style scoped>
.re {
  position: relative;
  background-color: #f5f5f5;
}
.settle {
  position: absolute;
  top: 285px;
  left: 1205px;
  background-color: #fff;
  border-left: none;
}
</style>