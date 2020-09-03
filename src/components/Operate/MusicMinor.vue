<template>
  <div class="minoritem">
    <div class="minorhead" v-if="sub.length || musicSimiArtist.length">
      <slot name="subscribers" />
    </div>

    <div v-if="musicSinger" class="img">
      <div class="imgitem" v-for="(value, index) in musicSimiArtist" :key="index">
        <img :src="value.picUrl" />
      </div>
    </div>

    <div class="img" v-else>
      <div class="imgitem" v-for="(value, index) in sub" :key="index">
        <img
          :src="value.avatarUrl"
          :title="value.nickname"
          @click="jumpPage('profile',value.userId)"
        />
      </div>
    </div>

    <div class="minorhead" v-if="musicRelated">
      <slot name="related" />
      <div class="all" @click="jumpPage('singerdetail', musicArtistId)">
        <slot name="all" />
      </div>
    </div>

    <div class="info" v-for="(value, index) in related" :key="index">
      <div @click="jumpPage('playlist', value.id)">
        <img :src="value.coverImgUrl" :title="value.name" />
      </div>
      <div>
        <div class="title" @click="jumpPage('playlist', value.id)">
          <span :title="value.name">{{value.name}}</span>
        </div>
        <div class="creator">
          <span>by</span>
          <span
            :title="value.creator.nickname"
            @click="jumpPage('profile', value.creator.userId)"
          >{{value.creator.nickname}}</span>
        </div>
      </div>
    </div>

    <div class="alb">
      <div v-for="(value, index) in musicAlbum" :key="index" class="albitem">
        <div @click="jumpPage('albumdetail', value.id)">
          <img :src="value.picUrl" :title="value.name" />
        </div>
        <div>
          <div class="name" @click="jumpPage('albumdetail', value.id)">
            <span>{{value.name}}</span>
          </div>
          <div class="publishtime">{{publishTimeFormat(value.publishTime)}}</div>
        </div>
      </div>
    </div>

    <div class="minorhead" v-if="musicSimiSong.length">
      <slot name="simihead" />
    </div>

    <div class="simisong">
      <div class="simisongitem" v-for="(value, index) in musicSimiSong" :key="index">
        <div class="simileft">
          <div class="simititle" @click="jumpPage('digitalsingle', value.id)">
            <span>{{value.name}}</span>
          </div>
          <div class="simiartist" @click="jumpPage('singerdetail', value.artists[0].id)">
            <span>{{value.artists[0].name}}</span>
          </div>
        </div>
        <div class="simiright">
          <img src="../../assets/playlist/simiplay.png" />
          <img src="../../assets/playlist/simiadd.png" />
        </div>
      </div>
    </div>

    <div class="videoinfo" v-if="musicVideoPlay">
      <div>
        <div class="publish" v-if="musicMV">发布时间：{{musicVideoPublish}}</div>
        <div class="publish" v-else>发布时间：{{publishTimeFormat(musicVideoTime)}}</div>
        <div class="playcount">播放次数：{{playCount(musicVideoPlay)}}</div>
      </div>
      <div>
        <div class="desc">{{musicVideoDesc}}</div>
      </div>
    </div>

    <div class="minorhead" v-if="musicVideoRelated.length">
      <slot name="videohead" />
    </div>

    <div class="videorelated" v-if="musicVideoRelated.length">
      <div class="videoitem" v-for="(value, index) in musicVideoRelated" :key="index">
        <div class="videoimg" @click="jumpPage('videodetail', value.vid)">
          <img :src="value.coverUrl" />
          <div class="vol">
            <div>
              <img src="../../assets/search/resvolume.png" />
              <span>{{playCount(value.playTime)}}</span>
            </div>
          </div>
        </div>
        <div class="videointr">
          <div @click="jumpPage('videodetail', value.vid)">{{value.title}}</div>
          <div>{{duration(value.durationms)}}</div>
          <div
            @click="jumpPage('profile', value.creator[0].userId)"
          >by {{value.creator[0].userName}}</div>
        </div>
      </div>
    </div>

    <div class="minorhead">
      <span>网易云音乐多端下载</span>
    </div>
    <div class="multi">
      <div class="iphone">
        <img src="../../assets/my/iphone.png" alt />
        <img src="../../assets/my/iphone_active.png" alt />
      </div>
      <div class="windows">
        <img src="../../assets/my/windows.png" alt />
        <img src="../../assets/my/windows_active.png" alt />
      </div>
      <div class="android">
        <img src="../../assets/my/android.png" alt />
        <img src="../../assets/my/android_active.png" alt />
      </div>
    </div>
    <div class="sp">同步歌单，随时畅听320k好音乐</div>

    <div class="minorhead" v-if="musicWX">
      <slot name="wx" />
    </div>
    <div v-if="musicWX">
      <img src="../../assets/banner/wxpublic.png" alt="">
    </div>
  </div>
</template>
<script>
import { dateFormat } from "../../utils/dateFormat";
import { playCountFormat } from "../../utils/playCountFormat";
import { durationFormat } from "../../utils/durationFormat";
export default {
  name: "MusicMinor",
  props: {
    sub: {
      type: Array,
      default: () => {
        return [];
      },
    },
    related: {
      type: Array,
      default: () => {
        return [];
      },
    },
    musicRelated: {
      type: Boolean,
      default: true,
    },
    musicSinger: {
      type: Boolean,
      default: false,
    },
    musicMV: {
      type: Boolean,
      default: false,
    },
    musicWX: {
      type: Boolean,
      default: false
    },
    musicDj: {
      type: Boolean,
      default: false
    },
    musicSimiArtist: {
      type: Array,
      default: () => {
        return [];
      },
    },
    musicAlbum: {
      type: Array,
      default: () => {
        return [];
      },
    },
    musicArtistId: {
      type: Number,
      default: 0,
    },
    musicSimiSong: {
      type: Array,
      default: () => {
        return [];
      },
    },
    musicVideoRelated: {
      type: Array,
      default: () => {
        return [];
      },
    },
    musicSimiPlayList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    musicVideoTime: {
      type: Number,
      default: 0,
    },
    musicVideoPublish: {
      type: String,
      default: "",
    },
    musicVideoPlay: {
      type: Number,
      default: 0,
    },
    musicVideoDesc: {
      type: String,
      default: "",
    },
  },
  methods: {
    jumpPage(path, id) {
      this.$router.push({
        name: path,
        params: {
          id: id,
        },
      });
    },
    publishTimeFormat(time) {
      return dateFormat(time);
    },
    playCount(count) {
      return playCountFormat(count);
    },
    duration(time) {
      return durationFormat(time);
    },
  },
};
</script>
<style scoped>
.vol {
  width: 96px;
  height: 18px;
  color: #fff;
  font-size: 12px;
  opacity: 1;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  z-index: 99;
  margin-top: -58px;
}
.vol > div {
  display: inline-block;
  background-color: rgba(0, 0, 0, 0.3);
}
.vol > div > img {
  width: 20px;
  position: relative;
  top: 1px;
}

.videointr > div:nth-of-type(3) {
  cursor: pointer;
}

.videointr > div:nth-of-type(2),
.videointr > div:nth-of-type(3) {
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100px;
}
.videointr > div:nth-of-type(1) {
  color: #333;
  width: 95px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.videointr {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-left: 10px;
}
.videoitem {
  display: flex;
  margin-bottom: 13px;
}
.videoimg {
  cursor: pointer;
}
.videoimg > img {
  position: relative;
  width: 96px;
  height: 54px;
}
.desc {
  width: 200px;
  line-height: 18px;
  font-size: 12px;
  color: #333;
  margin-top: 10px;
}
.videoinfo > div:nth-of-type(1) {
  font-size: 12px;
  color: #999;
}
.simiright > img:first-of-type {
  margin-left: 10px;
  margin-right: 20px;
  cursor: pointer;
}
.simiright > img {
  cursor: pointer;
}
.simisongitem {
  margin-bottom: 10px;
  display: flex;
}
.simititle {
  font-size: 12px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
  height: 16px;
  cursor: pointer;
}
.simiartist {
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
.simiartist:hover > span {
  border-bottom: solid 1px;
}
.alb {
  display: flex;
  flex-direction: column;
}
.alb > .albitem {
  display: flex;
}
.albitem > div:first-of-type > img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  cursor: pointer;
}
.name {
  width: 150px;
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  cursor: pointer;
}
.name:hover > span {
  border-bottom: solid 1px;
}
.publishtime {
  color: #666;
  font-size: 12px;
}
.sp {
  color: #999;
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 40px;
}
.multi {
  display: flex;
  width: 200px;
  height: 48px;
  overflow: hidden;
}
.multi > div:first-of-type {
  margin-right: 35px;
}
.multi > div:last-of-type {
  margin-left: 35px;
}
.multi > div > img {
  height: 48px;
  cursor: pointer;
}
.iphone:hover.iphone,
.windows:hover.windows,
.android:hover.android {
  transform: translateY(-52px);
}
.info {
  display: flex;
  margin-bottom: 10px;
}
.info > div:first-of-type {
  margin-right: 10px;
}
.info > div:first-of-type > img {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.info > div:last-of-type {
  margin-top: 5px;
}
.title {
  width: 150px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  box-sizing: border-box;
  margin-bottom: 1px;
}
.title:hover {
  border-bottom: solid 1px black;
  margin-bottom: 0;
}
.creator > span:first-of-type {
  color: #999;
  font-size: 12px;
  cursor: pointer;
}
.creator > span:last-of-type {
  color: #666;
  font-size: 12px;
  margin-left: 5px;
  cursor: pointer;
}
.creator:hover > span:last-of-type {
  border-bottom: solid 1px;
}
.minorhead {
  font-size: 12px;
  font-weight: bold;
  color: #333;
  width: 200px;
  height: 23px;
  padding-top: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}
.minoritem {
  padding-left: 30px;
  background-color: #fff;
  width: 240px;
}
.img {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  justify-content: space-between;
}
.imgitem > img {
  height: 40px;
  width: 40px;
  margin-right: 1px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>