<template>
  <div class="profilemain">
    <profile-head :userDetail="userDetail" />
    <profile-songs
      :userDetail="userDetail"
      :userRecord="userRecordLimit"
      v-if="userDetail.listenSongs && userDetail.peopleCanSeeMyPlayRecord"
    />
    <profile-create :userNickName="userDetail.profile.nickname" :userPlayList="userPlayList" />
    <profile-collect
      :userPlayListCollect="userPlayListCollect"
      :userNickName="userDetail.profile.nickname"
      v-if="userPlayListCollect.length"
    />
  </div>
</template>
<script>
import { request } from "../../network/request";
import ProfileHead from "./ProfileHead";
import ProfileSongs from "./ProfileSongs";
import ProfileCreate from "./ProfileCreate";
import ProfileCollect from "./ProfileCollect";
export default {
  name: "Profile",
  components: {
    ProfileHead,
    ProfileSongs,
    ProfileCreate,
    ProfileCollect,
  },
  data() {
    return {
      userDetail: {},
      userRecord: {},
      userPlayList: [],
      recordType: "",
      offset: 0,
      offset1: 0,
      id: this.$route.params.id,
      userPlayListCollect: [],
      more: false,
    };
  },
  computed: {
    userRecordLimit() {
      return this.userRecord[this.recordType];
    },
    userRecordType() {
      return this.$store.state.userRecordType;
    },
  },
  watch: {
    userRecordType(newVal) {
      request({
        url: `/user/record?uid=${this.id}&type=${newVal}`,
      }).then((response) => {
        this.userRecord = response;
        this.jungleRecordType();
        setTimeout(() => {
          this.$store.commit("changeValue", {
            type: "musicIsCompleteUpdate",
            value: true,
          });
        }, 300);
      });
    },
  },
  created() {
    this.getUserDetail(this.id);
    this.getUserRecord(this.id, 1);
    this.getUserPlayList(this.id, this.offset1);
    this.getUserPlayListCollect(this.id, this.offset);
  },
  methods: {
    getUserDetail(id) {
      return request({
        url: `/user/detail?uid=${id}`,
      }).then((response) => {
        this.userDetail = response;
      });
    },
    getUserRecord(id, type) {
      return request({
        url: `/user/record?uid=${id}&type=${type}`,
      }).then((response) => {
        this.userRecord = response;
        this.jungleRecordType();
      });
    },
    getUserPlayList(id, offset) {
      request({
        url: `/user/playlist?uid=${id}&offset=${offset}`,
      }).then((response) => {
        let isContinue = response.playlist.every((ele, index) => {
          return ele.creator.userId == id;
        });
        let len = response.playlist.length;
        this.offset1 += len - 1;
        let arr = response.playlist.filter((ele, index) => {
          return ele.creator.userId == id;
        });
        this.userPlayList = this.userPlayList.concat(arr);
        if (isContinue && response.more) {
          this.getUserPlayList(this.id, this.offset1);
        }
      });
    },
    jungleRecordType() {
      if ("weekData" in this.userRecord) {
        this.recordType = "weekData";
      } else {
        this.recordType = "allData";
      }
    },
    getUserPlayListCollect(id, offset) {
      request({
        url: `/user/playlist?uid=${id}&offset=${offset}`,
      }).then((response) => {
        let len = response.playlist.length;
        this.offset += len;
        let arr = response.playlist.filter((ele, index) => {
          return ele.creator.userId != id;
        });
        this.userPlayListCollect = this.userPlayListCollect.concat(arr);
        if (response.more) {
          this.getUserPlayListCollect(this.id, this.offset);
        } else {
          return;
        }
      });
    },
  },
};
</script>
<style scoped>
.profilemain {
  width: 980px;
  background-color: #fff;
  border: solid 1px #d3d3d3;
  margin-left: 25%;
  padding: 40px;
}
</style>