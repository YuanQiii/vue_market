<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon" />
    </div>
    <div v-else>
      <slot name="item-icon-active" />
    </div>
    <div :style="activeStyle">
      <slot name="item-text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",

  data() {
    return {
      // isActive: false
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: right;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 2px;
  vertical-align: middle;
}
</style>