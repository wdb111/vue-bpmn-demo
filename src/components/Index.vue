<template>
    <div class="index-box">
      <p>bpmn的使用</p>
        <div>
          <el-button @click="click_one">基础引用</el-button>
          <el-button @click="click_two">普通自定义右侧菜单</el-button>
          <el-button @click="click_three">通过图片自定义样式</el-button>
          <el-button @click="click_four">改变源码自定义样式</el-button>
        </div>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {

            }
        },
      methods:{
        click_one(){
          this.$router.push("/")
        },
        click_two(){
          this.$router.push("/demo2")
        },
        click_three(){
          this.$router.push("./demo3")
        },
        click_four(){
          this.$router.push("./demo4")
        },
      }
    }
</script>

<style scoped lang="less">
.index-box {
  text-align: center;
  p{
    font: bold 16px "微软雅黑";
  }
  .containers {
    border-top: 1px solid #e5e5e5;
  }
}
</style>
