<template>
    <div class="main">
     <Menu class="topMenu" @on-select="handleMenu" mode="horizontal" :theme="theme1" :active-name="currentIndex">
        <MenuItem name="1">
            <Icon type="ios-paper" />
            首页
        </MenuItem>
          <MenuItem name="2" v-show="movie.rawTitle" class="showTitle">
            {{movie.rawTitle}}
        </MenuItem>
        <MenuItem id="finalMenu"  name="3">
            <Icon type="ios-people" />
            {{manageStatus}}
        </MenuItem>
    </Menu>
 </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {},
  data() {
    return {
      theme1: "dark"
    };
  },
  computed: {
    ...mapGetters(["movie", "currentIndex", "manageStatus"])
  },
  methods: {
    // 点击首页
    handleMenu(index) {
      if (index === "1") {
        this.$router.push({
          path: `/home`
        });
      } else if (index === "2") {
        return;
      } else if (index === "3") {
        if (this.manageStatus === "后台管理") {
          this.$router.push({
            path: "/login"
          });
        } else {
          sessionStorage.removeItem("user");
          this.setManageStatus("后台管理");
          this.$router.push({
            path: "/home"
          });
        }
      }
    },
    ...mapMutations({
      setManageStatus: "SET_MANAGESTATUS"
    })
  },
  mounted() {
   
  }
};
</script>

<style lang="scss" scoped >
.showTitle {
  margin-left: 16vw;
}
#finalMenu {
  float: right;
}
</style>

