<template>
    <div id="main">
      <Modal
        v-model="modals"
        title="提示"
        @on-ok="remove"
        @on-cancel="cancel"
       >
        <p>确认删除吗？</p>
    </Modal>
        <Table border :columns="columns" :data="allMovie" :loading="loading"></Table>

        <editForm v-show="showDialog" :dialog-option="movieItem"  @submit="submitChange" @cancel="cancelChange" ref="dialog"></editForm>

    </div>
</template>
<script>
import { getAllMoviesList, deleteMovie, updateMovieItem } from "api/admin";
import { mapGetters, mapMutations } from "vuex";
import editForm from "base/editForm/editForm";

export default {
  data() {
    return {
      modals: false,
      deleteMovieId: 0,
      loading: true,
      showDialog: false,
      movieItem: {
        title: "title",
        text: "text"
      },
      allMovie: [
        {
          poster:
            "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg",
          title: "John Brown",
          movieTypes: 18,
          pubdate: "New York No. 1 Lake Park"
        }
      ],
      columns: [
        {
          align: "center",
          title: "海报",
          key: "poster",
          //   加粗
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.poster
                },
                style: {
                  height: "180px",
                  margin: "10px"
                }
              })
            ]);
          }
        },
        {
          title: "电影标题",
          key: "title",
          align: "center"
        },
        {
          title: "电影分类",
          key: "movieTypes",
          align: "center"
        },
        {
          title: "上映时间",
          key: "pubdate",
          align: "center"
        },
        {
          title: "Action",
          key: "action",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  style: {
                    marginRight: "25px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error"
                  },
                  on: {
                    click: () => {
                      this.showDelete(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["manageStatus"])
  },
  methods: {
    //   弹框
    show(index) {
      this.showDialog = true;
      this.movieItem = this.allMovie[index];
    },

    // 编辑电影
    async submitChange(updateParams) {
      // let res = await updateMovieItem(updateParams.poster,updateParams.rawTitle,updateParams.movieTypes,updateParams.pubdate);
      let res = await updateMovieItem(updateParams);
      if (res.status === 200) {
        this.$Notice.success({
          title: "修改成功"
        });
        this.showDialog = false;
      } else {
        this.$Notice.error({
          title: "修改失败"
        });
        this.showDialog = false;
      }
      this.allMovie = res.data.data;
      this.renderView();
    },

    cancelChange() {
      this.showDialog = false;
      this.renderView();
    },

    // 删除电影
    showDelete(index) {
      this.modals = true;
      this.deleteMovieId = this.allMovie[index]._id;
    },

    async remove() {
      let id = this.deleteMovieId;
      let res = await deleteMovie(id); //返回值包括剩下的电影
      this.allMovie = res.data.data;
      this.renderView();
      if (res.status === 200 && res.data) {
        this.$Notice.success({
          title: "删除成功"
        });
      } else {
        this.$Notice.error({
          title: "删除失败"
        });
      }
    },

    cancel() {
      this.modals = false;
    },

    // 格式化电影
    nomalizeThems(themes) {
      for (let i = 0; i < themes.length; i++) {
        let cur = themes[i];
        // 外国类的显示title，中国类的显示title
        if (cur.pubdate) {
          if (
            cur.pubdate[0].country === "中国大陆" ||
            cur.pubdate[0].country === undefined
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
        // 删除电影类型的[]
        if (cur.movieTypes) {
          cur.movieTypes = cur.movieTypes.join("、");
        }
      }
    },

    checkLoginStatus() {
      if (sessionStorage.getItem("user") && this.manageStatus === "后台管理") {
        this.setManageStatus("退出登录");
      }
    },

    // 编辑或移除电影后重新刷新页面数据
    renderView() {
      this.nomalizeThems(this.allMovie);
    },

    ...mapMutations({
      setManageStatus: "SET_MANAGESTATUS"
    })
  },

  async mounted() {
    let res = await getAllMoviesList();
    this.loading = false;
    // 数据处理
    this.allMovie = res.data.data;
    this.nomalizeThems(this.allMovie);
    this.checkLoginStatus();
  },

  components: {
    editForm
  }
};
</script>

<style lang="scss" scoped>
#main {
}
</style>
