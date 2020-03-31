<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default() {
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    methods: {
      // initScroll() {
      //   this.$nextTick(()=>{
      //     if(!this.Scroll) {
      //       this.Scroll = new BScroll(this.$refs.wrapper,{
      //         click: true,      // 配置允许点击事件
      //         scrollY: true     // 开启纵向滚动
      //       })
      //     } else {
      //       this.Scroll.refresh()    // 重新计算 better-scroll，当 DOM 结构发生变化的时确保滚动效果正常
      //     }
      //   })
      // }
      scrollTo(x, y, time=500) {
        this.scroll.scrollTo(x, y, time)
      },

      refresh() {
        this.scroll && this.scroll.refresh()
      },

      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },

      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
    mounted() {//创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,      // 配置允许点击事件
        scrollY: true,     // 开启纵向滚动
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      });

      //监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        });
      }

      //监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // console.log('到底了');
          this.$emit('pullingUp')
        })
      }
    }
  }
</script>

<style scoped>
  /*.wrapper {*/
  /*  width: 100%;*/
  /*  position: absolute;*/
  /*  height: 100%;*/
  /*  overflow: hidden;*/
  /*}*/

  /*.wrapper {*/
  /*  overflow: hidden;*/

  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/
  /*  right: 0;*/
  /*  left: 0;*/
  /*}*/



</style>
