<template>
    <div class="wrapper" ref="aaa">
        <h2 class="content">分类</h2>
    </div>
</template>

<script>
    export default {
        name: "Category",
      data() {
          return {

          }
      },
      mounted() {
        // console.log(this.$refs.aaa);
        // console.log(document.querySelector('.wrapper'));
        // this.scroll = new BScroll(document.querySelector('.wrapper'), {
        //
        // })
      }
    }
</script>

<style scoped>
  .wrapper {
    height: 200px;
  }
</style>
