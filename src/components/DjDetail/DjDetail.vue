<template>
  <div class="dj">
    <div class="djmain">
      <dj-head :djDetail="djDetail" />
      <dj-program />
    </div>
    <music-minor class="musicminor">
      <span slot="related">你可能也喜欢</span>
    </music-minor>
  </div>
</template>
<script>
import { request } from "../../network/request";
import DjHead from "./DjHead";
import DjProgram from "./DjProgram";
import MusicMinor from "../Operate/MusicMinor";
export default {
  name: "DjDetail",
  components: {
    DjHead,
    DjProgram,
    MusicMinor,
  },
  data() {
    return {
      djDetail: {},
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  created() {
    this.getDjDetail(this.id);
  },
  methods: {
    getDjDetail(id) {
      return request({
        url: `/dj/detail?rid=${id}`,
      }).then((response) => {
        this.djDetail = response.djRadio;
      });
    },
  },
};
</script>
<style scoped>
.djmain {
  background-color: #fff;
  border: solid 1px #d3d3d3;
  padding: 40px;
}

.dj {
  display: flex;
  width: 980px;
  margin-left: 25%;
}
</style>