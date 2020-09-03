import Vue from 'vue'
import VueRouter from 'vue-router'
const Discover = () => import('../views/Discover.vue')
const My = () => import('../views/My.vue')
const Friend = () => import('../views/Friend.vue')
const Market = () => import('../views/Market.vue')
const Musician = () => import('../views/Musician.vue')
const Download = () => import('../views/Download.vue')
const SearchPage = () => import('../components/SearchPage/SearchPage.vue')
const Profile = () => import('../components/Profile/Profile.vue')


const Recommend = () => import('../components/Discover/Recommend/Recommend.vue')
const TopList = () => import('../components/Discover/TopList/TopList.vue')
const PlayList = () => import('../components/Discover/PlayList/PlayList.vue')
const PlayListCat = () => import('../components/Discover/PlayListCat/PlayListCat.vue')
const DigitalSingle = () => import('../components/Discover/DigitalSingle/DigitalSingle.vue')
const SingerDetail = () => import('../components/Discover/SingerDetail/SingerDetail.vue')
const AlbumDetail = () => import('../components/Discover/AlbumDetail/AlbumDetail.vue')
const VideoDetail = () => import('../components/VideoDetail/VideoDetail.vue')
const DjDetail = () => import('../components/DjDetail/DjDetail.vue')

const DjRadio = () => import('../components/Discover/DjRadio/DjRadio.vue')
const DjType = () => import('../components/Discover/DjRadio/DjType/DjType.vue')

const ArtList = () => import('../components/Discover/ArtList/ArtList.vue')
const RecommendSinger = () => import('../components/Discover/ArtList/RecommendSinger/RecommendSinger.vue')
const ResidentSingerPage = () => import('../components/Discover/ArtList/ResidentSingerPage/ResidentSingerPage.vue')
const CategorySinger = () => import('../components/Discover/ArtList/CategorySinger/CategorySinger.vue')

const Album = () => import('../components/Discover/Album/Album.vue')

const Alb = () => import('../components/Search/SearchItem/Alb.vue')
const Lyrics = () => import('../components/Search/SearchItem/Lyrics.vue')
const Playlis = () => import('../components/Search/SearchItem/Playlis.vue')
const Singer = () => import('../components/Search/SearchItem/Singer.vue')
const Single = () => import('../components/Search/SearchItem/Single.vue')
const Station = () => import('../components/Search/SearchItem/Station.vue')
const Users = () => import('../components/Search/SearchItem/Users.vue')
const Video = () => import('../components/Search/SearchItem/Video.vue')

const Popular = () => import('../components/Discover/SingerDetail/SingerItem/Popular.vue')
const AllAlbum = () => import('../components/Discover/SingerDetail/SingerItem/AllAlbum.vue')
const RelatedMV = () => import('../components/Discover/SingerDetail/SingerItem/RelatedMV.vue')
const Introduction = () => import('../components/Discover/SingerDetail/SingerItem/Introduction.vue')
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/discover',
  },
  {
    path: '/discover',
    component: Discover,
    children: [{
        path: '',
        component: Recommend
      },
      {
        path: 'toplist',
        name: 'toplist',
        component: TopList
      },
      {
        path: 'playlist/:id',
        name: 'playlist',
        component: PlayList
      },
      {
        path: 'playlistcat',
        name: 'playlistcat',
        component: PlayListCat
      },
      {
        path: 'digitalsingle/:id',
        name: 'digitalsingle',
        component: DigitalSingle
      },
      {
        path: 'albumdetail/:id',
        name: 'albumdetail',
        component: AlbumDetail
      },
      {
        path: 'videodetail/:id',
        name: 'videodetail',
        component: VideoDetail
      },
      {
        path: 'djdetail/:id',
        name: 'djdetail',
        component: DjDetail
      },
      {
        path: 'singerdetail/:id',
        name: 'singerdetail',
        component: SingerDetail,
        children: [
          {
            path: 'popular',
            name: 'popular',
            component: Popular
          },
          {
            path: 'allalbum',
            component: AllAlbum
          },
          {
            path: 'relatedmv',
            component: RelatedMV
          },
          {
            path: 'introduction',
            component: Introduction
          },
        ]
      },
      {
        path: 'djradio',
        name: 'djradio',
        component: DjRadio,
        children: [
          {
            path: 'djtype/:type',
            name: 'djtype',
            component: DjType
          }
        ]
      },
      {
        path: 'artlist',
        name: 'artlist',
        component: ArtList,
        children: [
          { 
            path: '/',
            redirect: 'recommendsinger'
          },
          {
            path: 'recommendsinger',
            name: 'recommendsinger',
            component: RecommendSinger
          },
          { 
            path: 'residentsingerpage',
            name: 'residentsingerpage',
            component: ResidentSingerPage
          },
          {
            path: 'categorysinger/:type/:area/:initial',
            name: 'categorysinger',
            component: CategorySinger
          }
        ]
      },
      {
        path: 'album',
        name: 'album',
        component: Album
      }
    ]

  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/friend',
    component: Friend
  },
  {
    path: '/market',
    component: Market
  },
  {
    path: '/musician',
    component: Musician
  },
  {
    path: '/download',
    component: Download
  },
  {
    path: '/searchpage/',
    component: SearchPage,
    children: [{
        path: 'alb/:kw',
        name: 'alb',
        component: Alb
      },
      {
        path: 'lyrics/:kw',
        name: 'lyrics',
        component: Lyrics
      },
      {
        path: 'playlis/:kw',
        name: 'playlis',
        component: Playlis
      },
      {
        path: 'singer/:kw',
        name: 'singer',
        component: Singer
      },
      {
        path: 'single/:kw',
        name: 'single',
        component: Single
      },
      {
        path: 'station/:kw',
        name: 'station',
        component: Station
      },
      {
        path: 'users/:kw',
        name: 'users',
        component: Users
      },
      {
        path: 'video/:kw',
        name: 'video',
        component: Video
      },
    ]
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router