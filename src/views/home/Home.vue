<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import Scroll from "../../components/common/scroll/Scroll";
  import NavBar from "../../components/common/navbar/NavBar";

  import tabControl from "../../components/content/tabControl/tabControl";
  import GoodsList from "../../components/content/goodsList/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import {debounce} from "../../common/utils";


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      Scroll,
      BackTop,

      tabControl,
      GoodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 185,
        isTabFixed: false,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求多个数据
      this.getHomeMultidata();
      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    destroyed() {
      console.log('destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
      console.log('activated');
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
      console.log(this.saveY);
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh, 100);
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
    methods: {
      //事件监听相关方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },

      contentScroll(position) {
        // console.log(position);
        //判断BackTop是否吸顶
        this.isShowBackTop = (-position.y) > 1000;

        //决定tabControl是否吸顶(position：fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },

      loadMore() {
        // console.log('loadMore');
        this.getHomeGoods(this.currentType)
      },

      swiperImageLoad() {
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp()
        })
      },
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background: var(--color-tint);
    color: #f6f6f6;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
  }

  /*.tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>
