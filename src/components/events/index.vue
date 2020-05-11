<!--
  function: function description
  author: 王代彬
  email: 1303329454@qq.com
  time: 2020年05月11日 18:27:12
  version: v1.0
  Modification record: 
  Modification: 
  Modified by: 
  Modification time: 
-->
<template>
  <div>
    <h1>所有可监听事件</h1>
    <span><span class="font">let eventBus = this.bpmnModeler.get("eventBus");</span> //获取所有可监听事件</span>
  </div>
</template>

<script>
export default {
  name: "demo",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {}
};
</script> 

<style scoped>
.font {
    color: rgb(255, 0, 34);
    font: bold 18px "微软雅黑";
    /* font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
}
</style>
