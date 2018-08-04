<template>
    <div class="scrollTop" @click="toTop">
       <img src="../../assets/goTop.png" alt="">
    </div>
</template>

<script>
export default {
  name: "scroll-top",
  props: {},
  methods: {
    toTop() {
        // 由快到慢
       let scrollToptimer = setInterval(function() {
        console.log("定时循环回到顶部");
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
    }
  }
};
</script>

<style lang="scss">
.scrollTop {
  img {
    width: 60px;
    position: fixed;
    z-index: 1000;
    cursor: pointer;
    bottom: 20px;
    right: 20px;
    padding: 5px;
  }
}
</style>
