<template>
<div class="dialog">
	<div class="mask"></div>
	<div class="dialog-content">
		<h3 class="title">{{ modal.title }}</h3>
        <div class="movieItem">
            <span class="">海&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报</span>    <Input class="input" v-model="dialogOption.poster" placeholder="请输入海报url" />
        </div>
        <div class="movieItem">
        <span class="">电影标题</span><Input class="input" v-model="dialogOption.rawTitle" placeholder="请输入电影标题" />
        </div>
        <div class="movieItem">
        <span class="">电影分类</span><Input class="input" v-model="dialogOption.movieTypes" placeholder="请输入电影分类" />
        </div>
         <div class="movieItem">
        <span class="">上映时间</span><Input class="input" v-model="dialogOption.pubdate" placeholder="请输入上映时间" />
        </div>
		<ButtonGroup class="btn-group" >
                <Button class="btn" @click="cancel">{{ modal.cancelButtonText }}</Button>
                <Button class="btn"  @click="submit" type="primary">{{ modal.confirmButtonText }}</Button>
		</ButtonGroup>
	</div>
</div>
</template>

<script>
export default {
  props: {
    dialogOption: {}
  },
  data() {
    return {};
  },
  computed: {
    modal: function() {
      let options = this.dialogOption;
      return {
        title: "编辑",
        movieTitle: options.rawTitle,
        cancelButtonText: options.cancelButtonText
          ? options.cancelButtonText
          : "取消",
        confirmButtonText: options.confirmButtonText
          ? options.confirmButtonText
          : "确定"
      };
    }
  },
  methods: {
    //确定,将promise断定为完成态
    submit() {
      let updateParams = {
        id: this.dialogOption._id,
        poster: this.dialogOption.poster,
        rawTitle: this.dialogOption.rawTitle,
        movieTypes: this.dialogOption.movieTypes,
        pubdate: this.dialogOption.pubdate
      };
      this.$emit("submit", updateParams);
    },
    // 取消,将promise断定为reject状态
    cancel() {
      this.$emit("cancel");
    },
    //显示confirm弹出,并创建promise对象，给父组件调用
    confirm() {}
  },

  mounted() {}
};
</script>

<style lang="scss">
.dialog {
  position: relative;
  font-size: 16px;
  .dialog-content {
    .title {
      margin-bottom: 10px;
    }
    .movieItem {
      margin-bottom: 20px;
    }
    .input {
      width: 82%;
      margin-left: 20px;
    }
    position: fixed;
    box-sizing: border-box;
    padding: 20px;
    width: 631.5px; //弹框的宽度
    min-height: 140px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background: #fff;
    z-index: 50002;
    .title {
      font-size: 16px;
      font-weight: 600;
    }
    .text {
      font-size: 14px;
      line-height: 30px;
      color: #555;
    }
    .btn-group {
      display: flex;
      justify-content: flex-end;
      margin-right: 8px;
      .btn {
        margin: 0 10px;
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 50001;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>