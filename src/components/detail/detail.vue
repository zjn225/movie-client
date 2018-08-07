<template>
    <div class="detailMain">
        <div class="detailWrapper">
          <!-- 双飞翼布局 -->
           <div id="main-wrap" class="column">
           <!-- 视频区域 -->
              <div id="main">
                  <video-player 
                    class="video-player-box"
                     ref="videoPlayer"
                     :options="playerOptions"
                     :playsinline="true"
                     customEventName="customstatechangedeventname"
                     >
                 </video-player>
            </div>
	        </div>
          	<div class="extra">
              <Tabs v-model="nowTabIndex" @on-click="getRelativeMovie">
                 <!-- 详情 -->
                 <TabPane label="关于电影" name="aboutMovie" class="about">
                     <div class="title">
                        <div class="">{{movie.rawTitle}}</div>
                     </div>
                     <div class="rate">豆瓣评分：{{movie.rate}}</div>
                     <div class="movieTypes">
                       <span>电影分类：</span><span v-for="cat in movie.movieTypes" :key="cat">{{cat}} </span>
                     </div>
                      <div class="date">上映时间：{{movie.pubdate}}</div>

                    <div class="summary">影片介绍：{{movie.summary}}</div>
                 </TabPane>
                 <!-- 相关电影 -->
                 <TabPane label="相关电影" name="relaMovie">
                      <div class="rela" v-for="item in relativeMovies" :key="item._id" @click="goRelativeMovie(item)"> 
                         <div class="rela-other">
                           <div class="rela-other-title">{{item.title}}</div>
                           <div>豆瓣{{item.rate}}分</div>
                         </div>
                           <div class="rela-pos">
                              <img v-lazy="item.poster" alt="">
                           </div>
                     </div>
                 </TabPane>
             </Tabs>
            </div>
        </div>
   </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import { getRelativeMovie } from "api/movie";

export default {
  data() {
    return {
      playerOptions: {
        autoplay: false,
        fluid: true, //是否可通过css设置
        muted: false, //是否默认静音
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: ""
          }
        ],
        poster: ""
      },
      relativeMovies: {},
      nowTabIndex: "aboutMovie",
      switchSign: false
    };
  },

  computed: {
    ...mapGetters(["allMovieBackUp", "movie"])
  },

  watch: {
    // 只有template是响应式的，而methods里不是响应式的
    movie() {
      this.setMovieParams();
    }
  },

  methods: {
    init() {
      // 刷新后vuex数据会失去。此时跳回首页
      if (this.movie.doubanId == null) {
        this.$router.push({ path: "/home" });
      }
      // 清空下首页数据，防止布局出现bug
      this.setAllMovie({});
      this.setMovieParams();
    },

    // 设置视频参数
    setMovieParams() {
      const HOST = "http://pcisc50gs.bkt.clouddn.com/";
      this.playerOptions.sources = HOST + this.movie.videoKey;
      this.playerOptions.poster = HOST + this.movie.posterKey;
    },

    // 获取相关电影
    async getRelativeMovie(index) {
      if (index === "relaMovie") {
        let result = await getRelativeMovie(this.movie._id);
        this.relativeMovies = result.data.data.relativeMovies;
        // 相同的电影删除
        for (let i = 0; i < this.relativeMovies.length; i++) {
          let cur = this.relativeMovies[i];
          if (cur.doubanId === this.movie.doubanId) {
            this.relativeMovies.splice(i, 1);
            i--;
          }
        }
      }
    },

    // 格式化相关电影
    nomalizeRelativeThems(themes) {
      if (themes.pubdate) {
        if (
          themes.pubdate[0].country === "中国大陆" ||
          themes.pubdate[0].country == null
        ) {
          themes.rawTitle = themes.rawTitle;
        } else {
          themes.rawTitle = themes.title;
        }
        // 格式化发布时间
        let temp = themes.pubdate[0].date;
        temp = temp.slice(0, 10);
        themes.pubdate = temp;
        if (!themes.posterKey) {
          themes.splice(i, 1);
          i--; //涉及到长度变化，别用forEach之类的
        }
      }
    },

    toTop() {
      // 由快到慢
      let scrollToptimer = setInterval(function() {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        var speed = top / 4;
        if (document.body.scrollTop != 0) {
          document.body.scrollTop -= speed;
        } else {
          document.documentElement.scrollTop -= speed;
        }
        if (top == 0) {
          clearInterval(scrollToptimer);
        }
      }, 16.67);
    },

    // 防抖函数
    debounce(func, delay, immediate) {
      var timer = null;
      return function() {
        var context = this;
        var args = arguments;
        if (timer) clearTimeout(timer);
        // 立即执行
        if (immediate) {
          var doNow = !timer;
          timer = setTimeout(function() {
            timer = null;
          }, delay);
          if (doNow) {
            func.apply(context, args);
          }
          // 不立即执行
        } else {
          timer = setTimeout(function() {
            func.apply(context, args);
          }, delay);
        }
      };
    },

    // 跳转到相关电影
    goRelativeMovie(item) {
      // this.debounce(
      // () => {
      this.switchSign = true;
      this.nomalizeRelativeThems(item);
      this.setMovie(item);
      this.toTop();
      this.$router.push({
        path: `/home/${item.doubanId}`
      });
      //   },
      //   80,
      //   false
      // );
    },

    ...mapMutations({
      setAllMovie: "SET_ALL_MOVIE",
      setMovie: "SET_MOVIE_ITEM",
      setCurrenIndex: "SET_CURRENTINDEX"
    })
  },

  mounted() {
    this.init();
  },

  // 跳转相关电影详情页后，tab页重新滑动到关于电影，然后注意的是tab里的:value要改为v-model
  // 在watch里设置失败
  updated() {
    if (this.switchSign === true) {
      this.nowTabIndex = "aboutMovie";
      this.switchSign = false;
    }
  },

  // 只在从本页面返回时触发，将首页的数据恢复
  destroyed() {
    this.setAllMovie(this.allMovieBackUp);
    this.setMovie({});
    this.setCurrenIndex("1");
  },

  components: {
    videoPlayer
  }
};
</script>

<style lang="scss">
// 由于这里要重写第三方组件，所以不能写scoped
.detailWrapper {
  overflow: auto;
  // 两列布局——双飞翼布局
  #main-wrap {
    width: 100%;
    float: left;
  }
  #main {
    margin: 0 32vw 0 0px;
    background: black;
    height: 93vh; //尝试将这里设置100vh、由于前面设了fix布局，这里会出现双滚动条
    display: flex;
    align-items: center;
    // 视频播放器设置
    .video-player-box {
      width: 68vw;
      position: relative;
      .vjs-big-play-button {
        position: absolute;
        left: 45%;
        top: 45%;
      }
    }
  }
  // 侧栏
  .extra {
    float: left;
    width: 32vw;
    margin-left: -32vw;
    .title {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 10px;
      .date {
        font-weight: 100;
      }
    }
    .about {
      font-size: 17px;
      margin: 0 15px 15px 10px;
    }
    // 相关电影
    .rela {
      font-size: 16px;
      margin: 0 0.8vw 2vh 1.2vw;
      cursor: pointer;
      .rela-pos img {
        width: 16vw;
      }
      .rela-other {
        width: 13vw;
        float: right;
        .rela-other-title {
          font-weight: bold;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>


