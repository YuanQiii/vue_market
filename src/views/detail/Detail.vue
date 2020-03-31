<template>
  <div>
    <detail-swiper/>
  </div>
</template>

<script>
  import {getDetail} from "../../network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: null
      }
    },
    components: {
      DetailSwiper
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid;
      //根据传入的iid请求数据详情
      getDetail(this.iid).then(res => {
        console.log(res);
        //获取顶部图片轮播数据
        this.topImages = res.result.itemInfo.topImages
      })
    },

  }
</script>

<style scoped>

</style>
