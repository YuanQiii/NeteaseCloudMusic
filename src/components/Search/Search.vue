<template>
  <div>
    <div class="inp">
      <img src="../../assets/search.png" />
      <input
        type="text"
        placeholder="音乐/视频/电台/用户"
        v-model="keyWords"
        @blur="suggestDis"
        @focus="suggestApp"
        @keydown.enter="jumpPage"
      />
    </div>
    <search-suggest
      :sendres="res"
      :sendkey="keyWords"
      :sendtype="type"
      :class="suggestShow?'':'dis'"
    />
  </div>
</template>

<script>
import { request } from "../../network/request";
import SearchSuggest from "./SearchSuggest";
export default {
  name: "Search",
  components: {
    SearchSuggest,
  },
  data() {
    return {
      keyWords: "",
      res: {
        result: {
          songs: [],
          albums: [],
          artists: [],
          order: [],
        },
      },
      type: "main",
      suggestShow: false,
    };
  },
  computed: {
    searchCurrentCatName(){
      return this.$store.state.searchCurrentCatName
    }
  },
  watch: {
    keyWords() {
      return request({
        url: `/search/suggest?keywords=${this.keyWords}`,
      }).then((response) => {
        this.res = response;
      });
    },
  },
  methods: {
    suggestDis() {
      setTimeout(() => {
        this.suggestShow = false;
      }, 100);
    },
    suggestApp() {
      this.suggestShow = true;
    },
    jumpPage() {
      this.$router.push({
        name: this.searchCurrentCatName,
        params: {
          kw: this.keyWords
        }
      });
    },
  },
};
</script>

<style scoped>
.dis {
  display: none;
}
.inp {
  position: relative;
  background-color: #fff;
  height: 24px;
  border-radius: 16px;
  z-index: 99;
  margin-top: 20px;
  padding: 5px;
  padding-left: 20px;
  width: 138px;
  margin-left: 100px;
}

input {
  outline: none;
  border: 0px;
  margin-top: 2px;
  width: 120px;
  height: 23px;
  position: absolute;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}

span {
  position: absolute;
  width: 200px;
  color: #9b9b9b;
  font-size: 13px;
  top: 8px;
  left: 32px;
}
img {
  height: 24px;
  margin-left: -10px;
}
</style>