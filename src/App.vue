<template>
  <div id="app" @contextmenu="blockRightClick">
    <div id="scrollToTop" @click="scrollToTop">TOP</div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",

  methods: {
    // 최상단 이동 기능
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    // 최상단 이동 버튼: 스크롤을 내리면 버튼이 보이게 함.
    topBtn() {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop > 100) {
        document.querySelector("#scrollToTop").style.display = "flex";
      } else {
        document.querySelector("#scrollToTop").style.display = "none";
      }
    },
    // 우클릭 방지
    blockRightClick(e) {
      alert(
        "저작권 보호를 위해 복사를 금지하고 있습니다. 넓은 양해 부탁드립니다:)"
      );
      e.preventDefault();
    },
  },
  created: function () {
    window.document.ondragstart = new Function("return false");
  },

  mounted: function () {
    this.topBtn();
    window.addEventListener("scroll", this.topBtn);
  },
};
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  /* 드래그 방지 */
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;

  #scrollToTop {
    background: rgba(128, 128, 128, 0.5);
    width: 25px;
    height: 25px;
    position: sticky;
    top: 95vh;
    left: 97.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    font-size: 10px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>