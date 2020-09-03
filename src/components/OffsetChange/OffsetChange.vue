<template>
  <div class="offsetmain" :style="`width: ${musicWidth}px`">
    <div :class="currentIndex === 0?'previous ban':'previous'" @click="toggleIndex(-1)">
      <span class="arrow">&lt;</span>
      <span>上一页</span>
    </div>

    <div :class="currentIndex === 0?'item active': 'item'">
      <span>1</span>
    </div>

    <div class="omit" v-if="currentIndex > 4 && len > 9">...</div>

    <div
      :class="index + 1 + count=== currentIndex?'item active': 'item'"
      v-for="(value, index) in getOffsetCount().slice(1,8)"
      :key="index"
    >
      <span>{{value + count}}</span>
    </div>

    <div class="omit" v-if="currentIndex < len - 5 && len > 9">...</div>

    <div :class="len - 1=== currentIndex?'item active': 'item'" v-if="len > 9">
      <span>{{len}}</span>
    </div>

    <div :class="currentIndex === len - 1?'next ban':'next'" @click="toggleIndex(1)">
      <span>下一页</span>
      <span class="arrow">&gt;</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "OffsetChange",
  props: {
    musicTotal: {
      type: Number,
      default: 0,
    },
    musicOffset: {
      type: Number,
      default: 0
    },
    musicWidth: {
      type: Number,
      default: 640
    }
  },
  data() {
    return {
      currentIndex: 0,
      count: 0,
      offset: 0,
    };
  },
  computed: {
    len() {
      return Math.ceil(this.musicTotal / this.musicOffset);
    },
    offsetNum(){
      return this.$store.state.offsetNum
    }
  },
  watch: {
    offsetNum(newVal){
      if(newVal == 0){
        this.currentIndex = 0
        this.count = 0
        this.offset = 0
      }
    }
  },
  methods: {
    getOffsetCount() {
      var arr = [];
      for (let i = 0; i < this.len; i++) {
        arr.push(i + 1);
      }
      return arr;
    },
    toggleIndex(num) {
      if (num === -1 && this.currentIndex > 0) {
        this.currentIndex += num;
        this.offset -= this.musicOffset;
        this.$store.commit("changeValue", {
          type: "offsetNum",
          value: this.offset,
        });
        console.log(this.offset);
        if (this.currentIndex > 3 && this.currentIndex < this.len - 5) {
          this.count += num;
          console.log(this.count);
        }
      } else if (num === 1 && this.currentIndex < this.len - 1) {
        this.currentIndex += num;
        this.offset += this.musicOffset;
        this.$store.commit("changeValue", {
          type: "offsetNum",
          value: this.offset,
        });
        console.log(this.offset);
        if (this.currentIndex > 4 && this.currentIndex < this.len - 4) {
          this.count += num;
          console.log(this.count);
        }
      }
    },
  },
};
</script>
<style scoped>
.omit {
  font-size: 12px;
}

.item {
  height: 24px;
  border: solid 1px #ccc;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  margin: 0 2px;
  cursor: pointer;
  padding: 0 9px;
}
.item:hover {
  border: solid 1px #666;
}
.active {
  border: solid 1px #a2161b;
  background: linear-gradient(0deg, #cd0b10, #ed1f29);
  color: #fff;
}
.active:hover {
  cursor: default;
  border: solid 1px #a2161b;
}

.next,
.previous {
  border: solid 1px #ccc;
  font-size: 12px;
  height: 26px;
  line-height: 26px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 2px;
  text-align: center;
  padding: 0 10px;
  background: linear-gradient(0deg, #e6e6e6, #fcfcfc);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.next:hover,
.previous:hover {
  cursor: pointer;
  background: linear-gradient(0deg, #f0f0f0, #fff);
}
.arrow {
  font-size: 16px;
  padding: 3px;
}
.ban {
  color: #cfcfcf;
}
.ban:hover {
  cursor: default;
  background: linear-gradient(0deg, #e6e6e6, #fcfcfc);
}
.offsetmain {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>