<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/home/back.svg" alt="">
      </div>
      <div slot="center" class="title">0
        <div v-for="(item, index) in titles"
             class="item-title"
             :class="{active: index === currentIndex}"
             @click="itemClick(index)"><span>{{item}}</span></div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    data() {
      return {
        titles: ['商品', '参数', '评论', '详情'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .item-title {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: var(--color-high-text);
  }

  .back img {
    margin-top: 12px;
  }
</style>
