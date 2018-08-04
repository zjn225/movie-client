<template>
    <div class="main">
      <div class="flexWrapper">
         <div class="card" v-for="item in data" :key="item.doubanId" @click="goDetail(item)">
          <!-- 海报 -->
           <div class="poster">
              <img v-lazy="item.poster" alt="">
            </div>
            <!-- 内容区域 -->
          <div class="content">
            <!-- 标题和发布时间 -->
            <div class="titleAndDate">
              <div class="title">
                  {{item.rawTitle}}
              </div>
                 <div class="rate">{{item.rate}}分</div>
            </div>
            <!-- 简介 -->
            <div class="sumary">{{item.summary}}</div>
        </div>
        </div>
      </div>
    
    </div>
</template>

<script>
export default {
  props: {
    //   海报
    data: {},
    poster: {
      type: String,
      default: ""
    },
    //   电影名称
    rawTitle: {
      type: String,
      default: ""
    },
    // 介绍
    summary: {
      type: String,
      default: ""
    },
    // 上映时间
    rate: {
      type: String,
      default: ""
    }
  },

  methods: {
    goDetail(item) {
      this.$emit("goDetail", item);
    }
  },

  mounted() {
    // console.log("所有数据：",this.data);
  }
};
</script>

<style lang="scss" scoped>
#main {
  font-size: 16px;
  line-height: 16px;
  color: #07111b;
  width: 100%;
  height: auto;
  background: #e3ebec;
  .flexWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    // 卡片整体
    .card {
      width: 22vw;
      box-shadow: #ccc 1px 4px 20px 3px;
      margin: 10px;
      // 标题和日期
      .titleAndDate {
        padding: 0 5px 5px 5px;
        display: flex;
        justify-content: center;
        .title {
          font-weight: bold;
          float: left;
          margin-right: 20px;
        }
      }
      // 图片
      img {
        width: 22vw;
        border-radius: 10px 10px 0 0;
      }
      // 简介
      .sumary {
        line-height: 23px;
        padding: 0 5px 5px 5px;
        margin-bottom: 12px;
        display: block;
        height: 7rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
