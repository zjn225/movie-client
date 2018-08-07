<template>
    <div id="main">
      <!-- 顶部菜单 -->
     <!-- 电影列表 -->
    <card ref="movie" :data="allMovie" @goDetail="goMovieDetail"></card>
     <!-- 注意，这个router-view是渲染子路由的. -->
    <router-view></router-view>
    </div>
</template>

<script>
// 注意，本页面的所有get、set都是基于vuex
import { getAllMovies } from "api/movie";
import card from "base/card/card";
import { getMovieDetail } from "api/movie";
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["allMovie", "manageStatus"])
  },

  methods: {
    nomalizeThems(themes) {
      for (let i = 0; i < themes.length; i++) {
        let cur = themes[i];
        // 外国类的显示title，中国类的显示title
        if (cur.pubdate) {
          if (
            cur.pubdate[0].country === "中国大陆" ||
            cur.pubdate[0].country == null
          ) {
            cur.rawTitle = cur.rawTitle;
          } else {
            cur.rawTitle = cur.title;
          }
          // 格式化发布时间
          let temp = cur.pubdate[0].date;
          try {
            temp = temp.slice(0, 10);
          } catch (e) {
            return;
          }
          cur.pubdate = temp;
        }
        // 删除无简介的
        if (!cur.posterKey) {
          themes.splice(i, 1);
          i--; //涉及到长度变化，别用forEach之类的
        }
      }
    },
    // 跳转到详情页
    goMovieDetail(item) {
      // 这个item从子组件card里来，子组件是item in allMovie，所以数据来自于这里格式化后的allMovie
      this.$router.push({
        path: `/home/${item.doubanId}`
      });
      this.setMovieItem(item);
      this.setCurrenIndex("2");
    },

    checkLoginStatus() {
      if (sessionStorage.getItem("user") && this.manageStatus === "退出登录") {
        this.setManageStatus("后台管理");
      }
    },

    ...mapMutations({
      setMovieItem: "SET_MOVIE_ITEM",
      setAllMovie: "SET_ALL_MOVIE",
      setAllMovieBackUp: "SET_ALL_MOVIE_BACKUP",
      setCurrenIndex: "SET_CURRENTINDEX",
      setManageStatus: "SET_MANAGESTATUS"
    })
  },

  async mounted() {
    let res = await getAllMovies();
    // 数据处理
    let temp = res.data.data;
    this.nomalizeThems(temp);
    this.setAllMovie(temp);
    this.setAllMovieBackUp(temp);

    this.checkLoginStatus();
  },

  components: {
    card
  }
};
</script>

 <style lang="scss" scoped>
#main {
  background: #e3ebec;
}
</style>
