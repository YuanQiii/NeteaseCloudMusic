<template>
  <div class="page">
    <div class="inp">
      <input type="text" v-model="keyWords" @focus="suggestApp" @blur="suggestDis"/>
      <div class="btn">
        <img src="../../assets/search.png"/>
      </div>
      <search-suggest :sendres="res" :sendkey="keyWords" :sendtype="page" 
      :class="suggestShow?'':'dis'"/>
    </div>
    <search-cat />
  </div>
</template>
<script>
import SearchCat from "./SearchCat";
import SearchSuggest from "../Search/SearchSuggest";
import { request } from "../../network/request";
export default {
  name: "SearchPage",
  components: {
    SearchCat,
    SearchSuggest
  },
  data() {
    return {
      res: {
        result: {
          songs: [],
          albums: [],
          artists: [],
          order: []
        }
      },
      page: "page",
      suggestShow: false
    };
  },
  computed: {
    keyWords(){
      return this.$route.params.kw
    },
  },
  watch: {
    keyWords() {
      return request({
        url: `/search/suggest?keywords=${this.keyWords}`
      }).then(response => {
        this.res = response;
      });
    }
  },
  methods: {
    suggestApp(){
      this.suggestShow = true
    },
    suggestDis(){
      setTimeout(() => {
        this.suggestShow = false
      },100)
    }
  }
};
</script>
<style scoped>
.dis {
  opacity: 0;
  z-index: -1;
}
.btn {
  width: 50px;
  height: 35px;
  background-color: #f7f7f7;
  border: solid 1px #cecece;
  text-align: center;
  padding-top: 5px;
  position: absolute;
  left: 680px;
  top: 39px;
  cursor: pointer;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.btn:hover {
  opacity: 0.7;
}
.page {
  padding-bottom: 40px;
  background-color: #fff;
  width: 980px;
  margin: 0 auto;
  border: solid 1px #d3d3d3;
}
.inp {
  padding: 40px 29%;
  position: relative;
}
input {
  font-size: 12px;
  padding: 12px;
  width: 370px;
  border: solid 1px #cecece;
  outline: none;
  box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.5),
    1px 1px 1px rgba(255, 255, 255, 0.5);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
</style>