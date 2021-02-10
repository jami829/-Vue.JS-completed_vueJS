<template>
  <div id="nav">
    <div id="contents">[2021.2.9] 이재훈</div>
  </div>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
#nav {
  height: 70px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;

  #contents {
    font-size: 16px;
    padding-left: 150px;
  }
}
</style>