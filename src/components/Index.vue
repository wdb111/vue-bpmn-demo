<template>
    <div class="index-box">
      <div style="height:50px;line-height:50px;font-weight: bold;">bpmn的使用</div>
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
  width: 100%;
  height: 100%;
  text-align: center;
  .containers {
    border-top: 1px solid #e5e5e5;
  }
}
</style>
