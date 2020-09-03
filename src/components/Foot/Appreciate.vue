<template>
  <div id="footmain">
    <a class="footitem" href="https://web-amped.music.163.com/"><img src="../../assets/foot/amped.png" alt=""><span>amped studio</span></a>
    <a class="footitem" href="https://music.163.com/st/userbasic#/auth"><img src="../../assets/foot/certification.png" alt=""><span>用户认证</span></a>
    <a class="footitem" href="https://music.163.com/nmusician/web/index#/"><img src="../../assets/foot/musician.png" alt=""><span>独立音乐人</span></a>
    <a class="footitem" href="https://music.163.com/web/reward"><img src="../../assets/foot/praise.png" alt=""><span>赞赏</span></a>
    <a class="footitem" href="https://music.163.com/#/login?targetUrl=https%3A%2F%2Fmusic.163.com%2Fuservideo%23%2Fplan"><img src="../../assets/foot/reward.png" alt=""><span>视频奖励</span></a>
  </div>
</template>
<script>
export default {
  name: 'Appreciate'
}
</script>
<style scoped>
  img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  #footmain {
    display: flex;
    font-size: 12px;
    color: #8E8E8E;
    margin: auto 0;
    border-top: none;
  }
  .footitem {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 30px;
  }
</style>