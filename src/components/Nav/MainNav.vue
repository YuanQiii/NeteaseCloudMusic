<template>
  <div :class="indexPage" class="main">
    <nav>
      <nav-item v-for='(item, index) in navList' :key="index" @click.native="navChange(index)" :class="$store.state.isIndexPage?'':'navfa'">
        <span :class="currentIndex == index?'active':''" id="item">
          {{item}}
        </span>
      </nav-item>
    </nav>
  </div>
</template>

<script>
import Nav from './Nav'
import NavItem from './NavItem'
export default {
  name: 'MainNav',
  components: {
    Nav,
    NavItem
  },
  data(){
    return {
      navList: ['推荐','排行榜','歌单','主播电台','歌手','新歌上架'],
      pathList: ['', 'toplist', 'playlistcat', 'djradio', 'artlist','album'],
      currentIndex: 0,
    }
  },
  computed: {
    indexPage(){
      if(this.$store.state.isIndexPage){
        return 'main'
      }else {
        return 'main false'
      }
    }
  },
  methods: {
    navChange(index){
      this.currentIndex = index
      this.$router.push('/discover/'+this.pathList[index])
    }
  }
}
</script>

<style scoped>
.main {
  background-color: #C20C0C;
  min-height: 5px;
}

.false {
  height: 5px;
}

.navfa{
  opacity: 0;
}

nav {
  display: flex;
  justify-content: center;
  color: #fff;
  margin-left: -10px;
}

#item {
  padding: 2px 12px;
  border-radius: 20px;
  transition: 0.1s;
  position: relative;
}
#item:hover {
  background-color: #9B0909;
  cursor: pointer;
}
#item.active {
    background-color: #9B0909;
}
</style>