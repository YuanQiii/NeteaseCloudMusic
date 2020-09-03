<template>
  <div class="audiomain">
    <audio ref="audio"></audio>
    <div class="previous" @click="togglePlayMusic(-1)">
      <img src="../assets/audioimg/next.png" alt />
    </div>
    <div class="pause">
      <img
        src="../assets/audioimg/musicpause.png"
        v-show="pauseCurrentIndex === 0"
        @click="toggleProgress(0,$store.state.musicAudioDetail.songs[0].dt)"
      />
      <img
        src="../assets/audioimg/musicplay.png"
        v-show="pauseCurrentIndex === 1"
        @click="toggleProgress(1)"
      />
    </div>
    <div class="next" @click="togglePlayMusic(1)">
      <img src="../assets/audioimg/next.png" alt />
    </div>
    <div class="note">
      <img src="../assets/audioimg/note.png" ref="picUrl" />
    </div>
    <div class="progress">
      <div class="info" v-if="musicAudioId">
        <div class="title">
          <span>{{musicAudioDetail.songs[0].name}}</span>
        </div>
        <div class="artist">
          <span>{{musicAudioDetail.songs[0].ar[0].name}}</span>
        </div>
        <div class="link">
          <img src="../assets/audioimg/link.png" alt />
        </div>
      </div>
      <div class="proBar">
        <img src="../assets/audioimg/progress.png" class="proImg" />
      </div>
    </div>
    <div class="duration">
      <span>{{eTime}}</span>
      <span>/ {{duration}}</span>
    </div>
    <div class="collect">
      <img src="../assets/audioimg/musiccollect.png" alt />
    </div>
    <div class="share">
      <img src="../assets/audioimg/musicshare.png" alt />
    </div>
    <div class="volume" @click="volumeShow">
      <img src="../assets/audioimg/volume.png" />
    </div>
    <div class="playtype" @click="togglePlayType">
      <img src="../assets/audioimg/shuffle.png" v-show="playTypeCurrentIndex === 0" />
      <img src="../assets/audioimg/singlecycle.png" v-show="playTypeCurrentIndex === 1" />
      <img src="../assets/audioimg/loop.png" v-show="playTypeCurrentIndex === 2" />
    </div>
    <div class="playlist" @click="toggleShow">
      <img src="../assets/audioimg/playlist.png" />
    </div>
    <div class="count">
      <div>
        <span>{{$store.state.musicAudioList.length}}</span>
      </div>
    </div>
    <div v-show="toggleTip" class="tip">{{togglePlayTip}}</div>
    <div
      v-show="toggleVolume"
      class="vol"
      @mousemove="dragStart($event)"
      @mouseleave="dragFlag(false)"
    >
      <div class="rut">
        <div class="rate" ref="rate"></div>
        <img
          src="../assets/audioimg/progress.png"
          @mousedown="dragFlag(true)"
          @mouseup="dragFlag(false)"
          draggable="false"
          ref="dragVolume"
        />
      </div>
    </div>
    <playlist-display v-show="windowShow" />
  </div>
</template>
<script>
import PlaylistDisplay from "../components/PlaylistDisplay/PlaylistDisplay";
export default {
  name: "MusicAudio",
  components: {
    PlaylistDisplay,
  },
  data() {
    return {
      playTypeCurrentIndex: 0,
      pauseCurrentIndex: 0,
      proBarWidth: 0,
      timer: null,
      playtime: 0,
      duration: "00:00",
      elapsedTimer: null,
      etValue: 0,
      eTime: "00:00",
      playFlag: false,
      playLoopType: 1,
      toggleTip: false,
      togglePlayTip: "",
      toggleVolume: false,
      screenY: 0,
      dragVolumeFlag: false,
    };
  },
  computed: {
    musicAudioId() {
      return this.$store.state.musicAudioId;
    },
    musicAudioIdList() {
      return this.$store.state.musicAudioIdList;
    },
    musicAudioUrl() {
      return this.$store.state.musicAudioUrl;
    },
    musicAudioUrlList() {
      return this.$store.state.musicAudioUrlList;
    },
    musicAudioDetail() {
      return this.$store.state.musicAudioDetail;
    },
    musicAudioDetailList() {
      return this.$store.state.musicAudioDetailList;
    },
    musicAudioLyric() {
      return this.$store.state.musicAudioLyric;
    },
    musicAudioLyricList() {
      return this.$store.state.musicAudioLyricList;
    },
    musicAudioIndex() {
      return this.$store.state.musicAudioIndex;
    },
    musicAudioPlayStatus() {
      return this.$store.state.musicAudioPlayStatus;
    },
    windowShow() {
      return this.$store.state.windowShow;
    },
  },
  watch: {
    musicAudioId() {
      // this.$refs.audio.src = this.musicAudioUrl;
      // clearInterval(this.timer);
      // this.timer = null;
      // this.playtime = 0;
      // this.proBarWidth = 0;
      // this.etValue = 0;
      // this.eTime = "00:00";
      // this.toggleProgress(0, this.musicAudioDetail.songs[0].dt);
      // this.duration = this.playtimeFormat(this.musicAudioDetail.songs[0].dt);
      this.initPlayMusic(0);
    },
    playFlag(newVal, oldVal) {
      if (newVal === true) {
        console.log(true);
      } else {
        if (this.playLoopType === 0) {
          this.togglePlayMusic(0);
        } else if (this.playLoopType === 1) {
          this.togglePlayMusic(1);
        } else {
          this.togglePlayMusic(this.playLoopType);
        }
      }
    },
  },
  methods: {
    togglePlayMusic(num) {
      console.log(num);
      var newMusicIndex = this.musicAudioIndex + num;
      console.log(newMusicIndex);

      if (newMusicIndex < 0) {
        newMusicIndex = this.musicAudioDetailList.length - 1;
      } else if (newMusicIndex > this.musicAudioDetailList.length - 1) {
        newMusicIndex = 0;
      }

      this.$store.commit("changeValue", {
        type: "musicAudioIndex",
        value: newMusicIndex,
      });

      this.$store.commit("changeValue", [
        {
          type: "musicAudioId",
          value: this.musicAudioIdList[newMusicIndex],
        },
        {
          type: "musicAudioUrl",
          value: this.musicAudioUrlList[newMusicIndex],
        },
        {
          type: "musicAudioDetail",
          value: this.musicAudioDetailList[newMusicIndex],
        },
        {
          type: "musicAudioLyric",
          value: this.musicAudioLyricList[newMusicIndex],
        },
      ]);
      if (newMusicIndex === this.musicAudioIndex) {
        this.initPlayMusic(0);
      }
    },
    toggleProgress(type, duration) {
      var proBar = document.querySelector(".proBar");
      var proImg = document.querySelector(".proImg");
      var audio = document.querySelector("audio");

      if (type === 0) {
        audio.play();

        this.playFlag = true;

        this.$store.commit("changeValue", {
          type: "musicLyricIsPlay",
          value: false,
        });

        this.$refs.picUrl.src = this.$store.state.musicAudioDetail.songs[0].al.picUrl;
        if (this.timer !== null) {
          clearInterval(this.timer);
        }
        if (this.elapsedTimer !== null) {
          clearInterval(this.elapsedTimer);
        }
        this.pauseCurrentIndex = 1;
        this.elapsedTimer = setInterval(() => {
          this.eTime = this.playtimeFormat((this.etValue += 1000));
        }, 1000);

        this.timer = setInterval(() => {
          if (this.playtime < duration) {
            this.proBarWidth++;
            proBar.style.width = this.proBarWidth + "px";
            proImg.style.marginLeft = this.proBarWidth + "px";
            this.playtime += parseInt(duration / 485);
          } else {
            this.playFlag = false;

            this.proBarWidth = 0;
            proBar.style.width = this.proBarWidth + "px";
            proImg.style.marginLeft = this.proBarWidth + "px";
            this.playtime = 0;
            this.etValue = 0;
            this.eTime = "00:00";
            this.pauseCurrentIndex = 0;
            clearInterval(this.timer);
            clearInterval(this.elapsedTimer);
            audio.pause();
            audio.currentTime = 0;
          }
        }, parseInt(duration / 485));
      }
      if (type === 1) {
        this.pauseCurrentIndex = 0;
        audio.pause();
        clearInterval(this.timer);
        clearInterval(this.elapsedTimer);
        this.timer = null;

        this.$store.commit("changeValue", {
          type: "musicLyricIsPlay",
          value: true,
        });
      }
    },
    initPlayMusic(index) {
      this.$refs.audio.src = this.musicAudioUrl;
      clearInterval(this.timer);
      this.timer = null;
      this.playtime = 0;
      this.proBarWidth = 0;
      this.etValue = 0;
      this.eTime = "00:00";
      this.toggleProgress(0, this.musicAudioDetail.songs[index].dt);
      this.duration = this.playtimeFormat(
        this.musicAudioDetail.songs[index].dt
      );
    },
    togglePlayType() {
      switch (this.playTypeCurrentIndex) {
        case 0:
          this.playTypeCurrentIndex = 1;
          this.playLoopType = 0;
          this.playTip("单曲循环");

          break;
        case 1:
          this.playTypeCurrentIndex = 2;
          this.playLoopType = 1;
          this.playTip("循环");
          break;
        case 2:
          this.playTypeCurrentIndex = 0;
          this.playLoopType = Math.round(
            Math.random() * (this.musicAudioDetailList.length - 1)
          );
          this.playTip("随机");
          break;
      }
    },
    dragFlag(flag) {
      if (flag) {
        this.dragVolumeFlag = flag;
      } else {
        this.dragVolumeFlag = flag;
      }
    },
    dragStart(event) {
      if (this.dragVolumeFlag) {
        this.screenY = event.screenY;
        let val = 70 - (977 - this.screenY);
        if (0 <= val && val <= 70) {
          this.$refs.dragVolume.style.top = `${val}px`;
          this.$refs.rate.style.height = `${val}px`;
          this.$refs.audio.volume = (977 - this.screenY) / 70;
        }
      }
    },
    playTip(value) {
      this.togglePlayTip = value;
      this.toggleTip = true;
      setTimeout(() => {
        this.toggleTip = false;
      }, 2000);
    },
    volumeShow() {
      let volHeight = (1 - this.$refs.audio.volume) * 70;
      this.$refs.dragVolume.style.top = `${volHeight}px`;
      this.$refs.rate.style.height = `${volHeight}px`;
      this.toggleVolume = !this.toggleVolume;
    },
    playtimeFormat(time) {
      var t1 = parseInt(time / 1000);
      var minute = parseInt(t1 / 60);
      var second = parseInt(t1 - minute * 60);
      if (second > 9) {
        return "0" + minute + ":" + second;
      } else {
        return "0" + minute + ":0" + second;
      }
    },
    toggleShow() {
      this.$store.commit("changeValue", {
        type: "windowShow",
        value: !this.windowShow,
      });
    },
  },
};
</script>
<style scoped>
.rate {
  background-color: #191919;
  width: 4px;
  height: 100%;
}
.rut {
  width: 4px;
  height: 80px;
  text-align: right;
  background-color: #c70c0c;
  margin-left: 14px;
  margin-top: 10px;
  position: relative;
}
.vol {
  width: 32px;
  height: 103px;
  background-color: #040506;
  position: absolute;
  top: -103px;
  left: 1365px;
  z-index: 9;
}
.rut > img {
  opacity: 1;
  width: 14px;
  position: absolute;
  left: -5px;
  top: 70px;
  transform: rotateZ(-90deg);
}
.tip {
  width: 81px;
  height: 34px;
  background-color: #191919;
  position: absolute;
  text-align: center;
  color: #fff;
  font-size: 12px;
  line-height: 34px;
  border-radius: 5px;
  top: -35px;
  left: 1370px;
  box-shadow: 0px -1px 16px -5px #281406;
  z-index: 99;
}
img:hover {
  opacity: 1;
}
img {
  opacity: 0.7;
  cursor: pointer;
}
.info {
  position: absolute;
  top: 3px;
  left: 720px;
  display: flex;
  color: #e8e8e8;
  font-size: 12px;
}
.title {
  margin-right: 15px;
}
.artist {
  color: #989898;
}
.artist:hover > span,
.title:hover > span {
  border-bottom: solid 1px;
  cursor: pointer;
}
.link > img {
  position: relative;
  top: 1px;
  width: 15px;
  height: 15px;
  margin-left: 15px;
}
.duration {
  font-size: 12px;
  margin-left: 25px;
  margin-top: 25px;
}
.duration > span:first-of-type {
  color: #a1a1a1;
}
.duration > span:last-of-type {
  color: #797979;
}
.pb {
  overflow: hidden;
}
.progress {
  margin-left: 2px;
  width: 500px;
  height: 10px;
  background-color: #131414;
  border-radius: 10px;
  margin-top: 30px;
}
.proBar {
  width: 0px;
  margin-left: 0px;
  height: 10px;
  z-index: 99;
  background-color: #c70c0c;
  display: flex;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.proImg {
  margin-top: -5px;
  width: 22px;
  height: 18px;
  opacity: 1;
}
.count {
  overflow: hidden;
}
.count > div > span {
  margin-left: 5px;
}
.count > div {
  background-color: #1e1e1e;
  height: 18px;
  width: 40px;
  margin-top: 14px;
  box-sizing: border-box;
  border-radius: 25px;
  color: #666;
  text-align: center;
  font-size: 12px;
  margin-left: -10px;
}
.playlist > img {
  width: 25px;
  height: 25px;
  margin-left: 33px;
  margin-top: 12px;
}

.playtype {
  position: relative;
  margin-left: 10px;
  margin-top: 14px;
}

.playtype > img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
}
.volume > img {
  width: 20px;
  height: 20px;
  margin-top: 14px;
  margin-left: 30px;
}
.share > img {
  width: 20px;
  height: 20px;
  margin-top: 14px;
  margin-left: 5px;
}
.collect {
  margin-left: 30px;
}
.collect > img {
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-top: 12px;
}
.note {
  width: 35px;
  height: 35px;
  cursor: pointer;
  background-color: transparent;
  border: solid 1px;
  border-radius: 3px;
  margin-left: 30px;
  margin-top: 7px;
  margin-right: 10px;
}
.note > img {
  width: 35px;
  height: 35px;
  opacity: 1;
  cursor: default;
}
.previous > img {
  width: 28px;
  height: 28px;
  margin-top: 10px;
  transform: rotateY(180deg);
  cursor: pointer;
}
.pause {
  position: relative;
  margin-right: 55px;
}
.pause > img {
  width: 36px;
  height: 36px;
  margin: 6px 10px;
  cursor: pointer;
  position: absolute;
}
.next > img {
  margin-top: 10px;
  width: 28px;
  height: 28px;
  cursor: pointer;
}
.audiomain {
  position: fixed;
  z-index: 99;
  height: 53px;
  background-image: linear-gradient(0deg, #242323, #363636);
  width: 100%;
  top: 95.1%;
  opacity: 0.98;
  display: flex;
  padding-left: 25%;
  box-shadow: 0px -4px 5px 0px rgba(20, 4, 1, 0.3);
}
</style>