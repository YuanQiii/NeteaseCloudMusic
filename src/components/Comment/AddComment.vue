<template>
  <div>
    <div class="head">
      <span>评论</span>
      <span>共{{commentTotal}}条评论</span>
    </div>
    <div class="content">
      <img src="https://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50" alt />
      <textarea placeholder="评论"></textarea>
      <div></div>
    </div>
    <div class="btn">
      <div>
        <img src="../../assets/comment/emjoi.png" alt />
        <img src="../../assets/comment/email.png" alt />
      </div>
      <div>
        <span>140</span>
        <span>评论</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddComment",
  props: {
    commentTotal: {
      type: Number,
      default: 0
    }
  },
};
</script>

<style scoped>

.btn {
  display: flex;
  width: 578px;
  height: 35px;
  margin-left: 60px;
  justify-content: space-between;
}

.btn > div > img {
  height: 18px;
  width: 18px;
  margin-right: 10px;
  cursor: pointer;
}
.btn > div:last-of-type > span:first-of-type {
  font-size: 12px;
  color: #b5b5b5;
}

.btn > div:last-of-type > span:last-of-type {
  margin-left: 10px;
  display: inline-block;
  width: 46px;
  height: 25px;
 background: linear-gradient(0deg, #1d6fbf, #4592db);
  color: #fff;
  border-radius: 3px;
  font-size: 12px;
  line-height: 25px;
  text-align: center;
  cursor: pointer;
}

.btn > div:last-of-type > span:last-of-type:hover {
  background: linear-gradient(0deg, #3483cf, #5da6ea);
}

.head {
  width: 640px;
  height: 35px;
  border-bottom: 2px solid #c20c0c;
}

.head > span:first-of-type {
  margin-right: 20px;
  font-size: 20px;
}

.head > span:last-of-type {
  font-size: 12px;
  color: #666666;
}

.content {
  width: 640px;
  height: 98px;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.content > img {
  margin-top: 20px;
  width: 50px;
  height: 50px;
}

.content > textarea {
  width: 578px;
  height: 63px;
  border: #cdcdcd solid 1px;
  margin-top: 20px;
  resize: none;
}

.content > div:first-of-type {
  position: absolute;
  background-color: #ffffff;
  border: #cdcdcd solid 1px;
  border-right: none;
  border-top: none;
  height: 10px;
  width: 10px;
  transform: rotateZ(45deg);
  left: 55px;
  top: 30px;
}
</style>