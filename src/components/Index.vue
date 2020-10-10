<template>
  <div class="index-box">
    <div style="height:50px;line-height:50px;font-weight: bold;">bpmn的使用</div>
    <div>
      <el-button @click="events">所有可监听事件</el-button>
      <el-button @click="click_one">基础引用</el-button>
      <el-button @click="click_two">普通自定义右侧菜单</el-button>
      <el-button @click="click_three">通过图片自定义样式</el-button>
      <el-button @click="click_four">改变源码自定义样式</el-button>
      <el-button @click="click_five">不改变源码（只变颜色，不变大小）</el-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {
    events() {
      this.$router.push("/events");
    },
    click_one() {
      this.$router.push("/");
    },
    click_two() {
      this.$router.push("/demo2");
    },
    click_three() {
      this.$router.push("./demo3");
    },
    click_four() {
      this.$router.push("./demo4");
    },
    click_five(){
      this.$router.push("./demo5");
    }
  }
};
</script>

<style scoped lang="less">
.index-box {
  width: 100%;
  height: 100%;
  text-align: center;
  .containers {
    border-top: 1px solid #e5e5e5;
  }
}
</style>
