<template>
    <div class="index-box">
        <div
            class="title"
            style="height: 50px; line-height: 50px; font-weight: bold"
        >
            bpmn的使用
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="所有可监听事件" name="/events"></el-tab-pane>
            <el-tab-pane label="基础引用" name="/"></el-tab-pane>
            <el-tab-pane label="自定义右侧菜单" name="/demo2"></el-tab-pane>
            <el-tab-pane label="通过图片自定义样式" name="/demo3"></el-tab-pane>
            <el-tab-pane label="改变源码自定义样式" name="/demo4"></el-tab-pane>
            <el-tab-pane label="不改变源码自定义样式" name="/demo5"></el-tab-pane>
        </el-tabs>
        <router-view class="box"></router-view>
    </div>
</template>

<script>
export default {
    name: "Index",
    data() {
        return {
            activeName: "/events",
        };
    },
    methods: {
        handleClick(tab) {
            console.log(tab.name);
            this.$router.push(tab.name)
        }
    },
};
</script>

<style scoped lang="less">
.index-box {
    width: 100%;
    height: 100%;
    .title,
    .btn-box {
        text-align: center;
    }
}
.box{
    height: calc(~'100% - 104px');
    overflow-y: auto;
}
</style>
