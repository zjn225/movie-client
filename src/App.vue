<template>
  <div id="app">
    <!-- 顶部菜单 -->
    <topMenu id="topMenu"></topMenu>
      <!-- 回到顶部 -->
    <goTop v-if="goTopStatus"></goTop>
    <router-view/>
  </div>
</template>

<script>
import topMenu from "cpnts/topMenu/topMenu";
import goTop from "base/goTop/goTop";
export default {
  name: "App",
  data() {
    return {
      goTopStatus: false
    };
  },
  methods: {
    // 滚动监听事件
    handleScroll(e) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      let oneClient = document.documentElement.clientHeight;
      if (scrollTop > oneClient) {
        this.goTopStatus = true;
      } else {
        this.goTopStatus = false;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },

  components: {
    topMenu,
    goTop
  }
};
</script>

<style>
#app {
  font-size: 17px;
}
</style>
