<template>
  <div>
    <music-head slot="head">
      <span slot="head">{{$store.state.area+$store.state.type}}</span>
    </music-head>
    <div class="InitialIndex">
      <div @click="changeArtistList($store.state.nType,$store.state.nArea,-1)">
        <span>热门</span>
      </div>
      <div
        v-for="(value,index) in char"
        :key="index"
        @click="changeArtistList($store.state.nType,$store.state.nArea,value)"
      >
        <span>{{value}}</span>
      </div>
      <div @click="changeArtistList($store.state.nType,$store.state.nArea,0)">
        <span>其他</span>
      </div>
    </div>
    <artist-image :singerinfo="$store.state.artistList.artists" />
    <artist-simple :singerinfo="$store.state.artistList.artists" />
  </div>
</template>
<script>
import MusicHead from "../../../Operate/MusicHead";
import ArtistImage from "../ArtistImage";
import ArtistSimple from "../ArtistSimple";
import { request } from "../../../../network/request";
export default {
  name: "CategorySinger",
  components: {
    ArtistImage,
    ArtistSimple,
    MusicHead,
  },
  data() {
    return {
      char: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "X",
        "Y",
        "Z",
      ],
    };
  },
  methods: {
    changeArtistList(type, area, initial) {
      this.$store.commit("changeValue", {
        type: "musicIsCompleteUpdate",
        value: false,
      });
      request({
        url:
          "/artist/list?type=" + type + "&area=" + area + "&initial=" + initial,
      }).then((response) => {
        this.$store.commit("changeValue", [
          {
            type: "artistList",
            value: response,
          },
          {
            type: "musicIsCompleteUpdate",
            value: true,
          },
        ]);
      });
    },
  },
};
</script>
<style scoped>
.InitialIndex {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  padding-left: 30px;
  font-size: 12px;
  position: relative;
  width: 730px;
}
.InitialIndex > div:first-of-type > span {
  background: #c20c0c;
  border-radius: 2px;
  color: #fff;
  width: 45px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  float: left;
  position: relative;
  top: -5px;
}
.InitialIndex > div:hover > span {
  box-sizing: border-box;
  cursor: pointer;
  border-bottom: solid 1px;
}
</style>