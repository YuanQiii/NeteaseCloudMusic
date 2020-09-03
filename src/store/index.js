import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    musicInfoPath: null, //歌单基本信息请求地址
    musicCommentPath: null, //歌单请求评论地址
    musicianName: null, //搜索建议->歌手

    DjRecommendType: {}, //主播电台分类优秀新电台请求结果 
    DjRadioHot: {}, //主播电台分类电台排行榜请求结果

    frequency: [],

    playListPageCat: {},//歌单分类页的请求结果

    currentOffset: 1,
    isIndexPage: true,

    total: 0,
    key: '',

    searchIndex: 1,
    searchCurrentCatName: 'singer',//当前搜索页分类名

    requestType: 'playlist',

    artistCatCurrntIndex: 0, //歌手分类当前索引

    type: '', //歌手分类字符串
    area: '', //歌手分类字符串

    nType: 0, //歌手分类数字
    nArea: 0,

    artistList: {}, //歌手分类默认数据

    singerHotSongs: [],//歌手热门歌曲

    descIsOpen: false,//单曲、歌单、专辑描述是否展开

    allAlbumInfo: [], //初始化新碟页面全部新碟信息，
    albumHotInfo: {}, //热门新碟
    albumCatInfo: {}, //全部新碟分类

    userRecordType: 1,//用户播放记录类型
    
    windowShow: false,//窗口是否显示

    offsetNum: 0,//偏移数

    musicIsCompleteUpdate: true,//页面是否完成更新
    
    
    musicPlayListCatName: '',//推荐页面歌单推荐分类名
    musicTopListCatName: 0,//推荐页面榜单分类名

    musicLyricIsPlay: false,//歌词是否播放

    musicAudioPlayStatus: false,

    musicAudioIndex: 0,// 正在播放音乐的索引

    musicAudioAddAllFlag: false,//歌单全部播放flag

    musicAudioId: 0,
    musicAudioIdList:[],

    musicAudioUrl: '',
    musicAudioUrlList: [],

    musicAudioDetail: {},
    musicAudioDetailList: [],

    musicAudioLyric: {},
    musicAudioLyricList: [],

    musicAudioList: []

  },
  getters: {

  },
  mutations: {
    changeValue(state, payload) {
      if (Array.isArray(payload)) {
        payload.forEach(item => {
          state[item.type] = item.value
        })
      } else {
        state[payload.type] = payload.value
      }
   
    },
    addValue(state, payload) {
      if (Array.isArray(payload)) {
        payload.forEach(item => {
          state[item.type].push(item.value)
        })
      } else {
        state[payload.type].push(payload.value)
      }

    },
  },
  actions: {},
  modules: {}
})