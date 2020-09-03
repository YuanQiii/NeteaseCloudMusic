<template>
  <div class="main">
    <div class="QRcode">
      <img src="//p1.music.126.net/wCRnpjXHpGRiq1c1uCkIFQ==/109951164246717547.png" alt />
      <div>扫描二维码下载</div>
    </div>
    <div :class="isShow?'bigQRcode active':'bigQRcode'">
      <img src="//p1.music.126.net/wCRnpjXHpGRiq1c1uCkIFQ==/109951164246717547.png" alt />
      <div>扫描二维码下载</div>
      <div class="arrow"></div>
    </div>
    <div class="download">
      <div class="downloadall">
        <img src="../assets/download/downloadall.png" alt />
        <span>下载全部客户端</span>
      </div>
      <div class="pc">
        <div>在电脑上听</div>
        <img
          src="//p1.music.126.net/PGNd0EAtUgA7iRCWXPnUuA==/109951164207162781.png?param=800x0"
          alt
        />
        <div class="type">
          <div class="macos">
            <img src="../assets/download/macos.png" alt />
            <span>macOS</span>
          </div>
          <div class="windows">
            <img src="../assets/download/windows.png" alt />
            <span>Windows</span>
          </div>
        </div>
        <div class="dpc">下载电脑端</div>
      </div>
      <div class="mobile">
        <div>在手机上听</div>
        <img
          src="//p1.music.126.net/sLtya87wVHWn-HWJ33oN4g==/109951164207180884.png?param=450x0"
          alt
        />
        <div class="type1">
          <div class="iphone">
            <img src="../assets/download/iphone.png" alt />
            <span>iPhone</span>
          </div>
          <div class="android">
            <img src="../assets/download/android.png" alt />
            <span>Android</span>
          </div>
        </div>
        <div class="dmb" @click="toggleQRcode">
          <img src="//p1.music.126.net/wCRnpjXHpGRiq1c1uCkIFQ==/109951164246717547.png" alt />
          <span>下载手机端</span>
        </div>
      </div>
    </div>
    <div v-for="(value, index) in list" :key="index" class="all">

      <div :class="value.type" v-if="value.type == 'even'">
        <div class="desc">
          <div class="r1">{{value.r1}}</div>
          <div class="r2">{{value.r2}}</div>
          <div class="r3">{{value.r3}}</div>
        </div>
        <div class="img">
          <img :src="value.img" />
        </div>
      </div>

      <div :class="value.type" v-if="value.type == 'odd'">
        <div class="img">
          <img :src="value.img" />
        </div>
        <div class="desc">
          <div class="r1">{{value.r1}}</div>
          <div class="r2">{{value.r2}}</div>
          <div class="r3">{{value.r3}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Download",
  data() {
    return {
      isShow: false,
      list: [
        {
          r1: "千万曲库 首首CD音质",
          r2: "囊括百万无损SQ音乐，你在用手机听歌时，",
          r3: "也能感受到纤毫毕现的CD音质，更能免费离线收听",
          img:
            "//p1.music.126.net/KP4aN9umGMNnCS8iCgiV9w==/109951164206415504.jpg",
          type: "even"
        },
        {
          r1: "千位明星 亲自推荐音乐",
          r2: "韩红，戴佩妮等千位明星已入驻，亲自创建私房歌单，录制独",
          r3: "家DJ节目，推荐他们心中的好音乐",
          img:
            "//p1.music.126.net/rpwYXqZt_UpO_de46JyYwQ==/109951164488922626.jpg",
          type: "odd"
        },
        {
          r1: "社交关系 发现全新音乐",
          r2: "你可以关注明星、DJ和好友，通过浏览他们的动态、收藏和",
          r3: "分享，发现更多全新好音乐",
          img:
            "//p1.music.126.net/9CQFSDAZN7TcOWz7UNEqmQ==/109951164488924083.jpg",
          type: "even"
        },
        {
          r1: "手机电脑 歌单实时同步",
          r2: "只要一个帐号，你就可以同步在手机、电脑上创建、收藏",
          r3: "的歌单，随时随地畅享好音乐",
          img:
            "//p1.music.126.net/IZIgZjpBv9WkyMZ53i043w==/109951164206417003.jpg",
          type: "odd"
        },
        {
          r1: "听歌识曲 助你疯狂猜歌",
          r2: "歌曲很动听却不知道歌名，歌名在嘴边却想不起来……",
          r3: "用听歌识曲功能，几秒钟就知道歌名",
          img:
            "//p1.music.126.net/MGGp3L7AerIVlskMkAk1HA==/109951164488904737.jpg",
          type: "even"
        }
      ]
    };
  },
  methods: {
    toggleQRcode() {
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style scoped>
.even {
  display: flex;
  justify-content: center;
  height: 438px;
  background-color: #fff;
}
.odd {
  display: flex;
  justify-content: center;
  height: 438px;
  background-color: #f6f6f6;
}
.even > .desc {
  margin-right: 100px;
  margin-top: 160px;
}
.even > .img {
  margin-top: 110px;
}
.all:last-of-type>.even>.img {
  margin-top: 50px;
}

.odd > .img {
  margin-top: 110px;
}
.odd > .desc {
  margin-left: 100px;
  margin-top: 160px;
}
.r1 {
  font-size: 40px;
}
.r2,
.r3 {
  font-size: 16px;
  color: #666;
}
.dpc,
.dmb {
  width: 300px;
  height: 65px;
  line-height: 65px;
  background-color: #fff;
  text-align: center;
  margin-left: 100px;
  margin-top: 30px;
  color: #d10000;
  border-radius: 65px;
  font-size: 22px;
  cursor: pointer;
}
.dmb {
  margin-left: 0;
  position: relative;
}
.dpc:hover,
.dmb:hover {
  background-color: #bcbcbc;
}
.dmb > img {
  width: 21px;
  height: 21px;
  position: absolute;
  top: 24px;
}
.dmb > span {
  margin-left: 26px;
}
.type {
  display: flex;
  width: 556px;
  height: 24px;
  justify-content: center;
}
.type1 {
  display: flex;
  width: 300px;
  height: 24px;
  justify-content: center;
}
.macos {
  padding-right: 60px;
  position: relative;
}
.iphone {
  padding-right: 60px;
  position: relative;
}
.windows {
  position: relative;
}
.android {
  position: relative;
}
.macos > span,
.iphone > span,
.windows > span,
.android > span {
  font-size: 16px;
  line-height: 24px;
  color: #909090;
}
.macos > img,
.iphone > img,
.windows > img,
.android > img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: -30px;
  top: 3px;
}

.downloadall {
  width: 150px;
  height: 60px;
  font-size: 14px;
  color: #fff;
  line-height: 60px;
  margin-bottom: 30px;
  margin-left: 73%;
  position: relative;
  cursor: pointer;
}
.downloadall:hover {
  color: #909090;
}
.downloadall > img {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 20px;
}
.downloadall > span {
  margin-left: 25px;
}
.download {
  background-color: #161616;
  height: 75vh;
}
.mobile {
  display: inline-block;
  margin-left: 12%;
  position: relative;
  top: 26px;
}
.mobile > img {
  width: 299px;
  height: 331px;
}
.mobile > div:first-of-type {
  font-size: 22px;
  color: #c8c8c8;
  width: 300px;
  height: 25px;
  text-align: center;
  margin: 0 0 33px;
}
.pc {
  display: inline-block;
  margin-left: 21%;
  position: relative;
  top: 23px;
  color: #c8c8c8;
}
.pc > img {
  width: 557px;
  height: 328px;
}
.pc > div:first-of-type {
  font-size: 22px;
  color: #c8c8c8;
  width: 556px;
  height: 25px;
  text-align: center;
  margin: 0 0 33px;
}
.main {
  position: relative;
}
.QRcode > img {
  width: 100px;
  height: 100px;
}
.QRcode > div {
  font-size: 12px;
  text-align: center;
}

.QRcode {
  position: fixed;
  top: 50%;
  left: 91%;
  background-color: #fff;
  padding: 16px 18px 9px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
.bigQRcode {
  position: absolute;
  background-color: #fff;
  padding: 16px 18px 9px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  left: 64.2%;
  top: 315px;
  z-index: 99;
  opacity: 0;
}
.bigQRcode.active {
  opacity: 1;
}
.bigQRcode > div:first-of-type {
  text-align: center;
}
.bigQRcode > div:last-of-type {
  height: 20px;
  width: 20px;
  box-sizing: border-box;
  border: solid 10px #fff;
  border-bottom-color: #161616;
  border-left-color: #161616;
  border-right-color: #161616;
  position: absolute;
  top: 100%;
  left: 45%;
}
.bigQRcode > img {
  width: 164px;
  height: 164px;
}
</style>