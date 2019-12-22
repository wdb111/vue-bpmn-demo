<template>
  <div class="containers" ref="content">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
    <ul class="buttons">
      <li>下载</li>
      <li>
        <a ref="saveDiagram" href="javascript:" title="download BPMN diagram">BPMN diagram</a>
      </li>
      <li>
        <a ref="saveSvg" href="javascript:" title="download as SVG image">SVG image</a>
      </li>
      <li>
        <el-button type="success" @click="saveXmlFile">保存</el-button>
      </li>
    </ul>
    <el-dialog title="弹窗标题" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!-- <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="选择人员：" :label-width="formLabelWidth">
          <el-select v-model="form.name" placeholder="请选择活动区域">
            <el-option label="总经理" value="总经理"></el-option>
            <el-option label="人事部经理" value="人事部经理"></el-option>
            <el-option label="技术部经理" value="技术部经理"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入相关的依赖
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from "bpmn-js/lib/Modeler";
// import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      xmlStr: null,
      processName: ""
    };
  },
  methods: {
    createNewDiagram() {
      const bpmnXmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1" name="开始">
      <bpmn2:outgoing>SequenceFlow_0z01mg5</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:task id="Task_0r1jhgy" name="请假申请">
      <bpmn2:incoming>SequenceFlow_0z01mg5</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_1i99umy</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="SequenceFlow_0z01mg5" sourceRef="StartEvent_1" targetRef="Task_0r1jhgy" />
    <bpmn2:exclusiveGateway id="ExclusiveGateway_1300i73">
      <bpmn2:incoming>SequenceFlow_1i99umy</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_02wn0ed</bpmn2:outgoing>
      <bpmn2:outgoing>SequenceFlow_0s7xgeq</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:sequenceFlow id="SequenceFlow_1i99umy" sourceRef="Task_0r1jhgy" targetRef="ExclusiveGateway_1300i73" />
    <bpmn2:task id="Task_1vypdv5" name="总部审批">
      <bpmn2:incoming>SequenceFlow_02wn0ed</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_0erlkl4</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="SequenceFlow_02wn0ed" name="大于十天" sourceRef="ExclusiveGateway_1300i73" targetRef="Task_1vypdv5" />
    <bpmn2:sequenceFlow id="SequenceFlow_0s7xgeq" name="小于十天" sourceRef="ExclusiveGateway_1300i73" targetRef="Task_1470v5j" />
    <bpmn2:endEvent id="EndEvent_0lupkw8" name="结束">
      <bpmn2:incoming>SequenceFlow_1sr2dbl</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:sequenceFlow id="SequenceFlow_0erlkl4" sourceRef="Task_1vypdv5" targetRef="Task_1470v5j" />
    <bpmn2:userTask id="Task_1470v5j" name="经理审批">
      <bpmn2:incoming>SequenceFlow_0s7xgeq</bpmn2:incoming>
      <bpmn2:incoming>SequenceFlow_0erlkl4</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_1sr2dbl</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:sequenceFlow id="SequenceFlow_1sr2dbl" sourceRef="Task_1470v5j" targetRef="EndEvent_0lupkw8" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="422" y="342" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="429" y="385" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_0r1jhgy_di" bpmnElement="Task_0r1jhgy">
        <dc:Bounds x="590" y="320" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0z01mg5_di" bpmnElement="SequenceFlow_0z01mg5">
        <di:waypoint x="458" y="360" />
        <di:waypoint x="590" y="360" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ExclusiveGateway_1300i73_di" bpmnElement="ExclusiveGateway_1300i73" isMarkerVisible="true">
        <dc:Bounds x="785" y="335" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="650" y="203" width="46" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1i99umy_di" bpmnElement="SequenceFlow_1i99umy">
        <di:waypoint x="690" y="360" />
        <di:waypoint x="785" y="360" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1vypdv5_di" bpmnElement="Task_1vypdv5">
        <dc:Bounds x="1040" y="130" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_02wn0ed_di" bpmnElement="SequenceFlow_02wn0ed">
        <di:waypoint x="810" y="335" />
        <di:waypoint x="810" y="170" />
        <di:waypoint x="1040" y="170" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="903" y="152" width="44" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0s7xgeq_di" bpmnElement="SequenceFlow_0s7xgeq">
        <di:waypoint x="835" y="360" />
        <di:waypoint x="1040" y="360" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="903" y="373" width="44" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_0lupkw8_di" bpmnElement="EndEvent_0lupkw8">
        <dc:Bounds x="1282" y="342" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1289" y="385" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0erlkl4_di" bpmnElement="SequenceFlow_0erlkl4">
        <di:waypoint x="1090" y="210" />
        <di:waypoint x="1090" y="320" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="UserTask_0xqe5og_di" bpmnElement="Task_1470v5j">
        <dc:Bounds x="1040" y="320" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1sr2dbl_di" bpmnElement="SequenceFlow_1sr2dbl">
        <di:waypoint x="1140" y="360" />
        <di:waypoint x="1282" y="360" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(bpmnXmlStr, function(err) {
        if (err) {
          console.error(err);
        }
      });
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG(done) {
      // 把传入的done再传给bpmn原型的saveSVG函数调用
      this.bpmnModeler.saveSVG(done);
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveDiagram(done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml);
      });
    },
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded(link, name, data) {
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data);
      // 获取到图的xml，保存就是把这个xml提交给后台
      this.xmlStr = data;
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      if (data) {
        link.className = "active";
        link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        link.download = name;
      }
    },
    //保存整个XML文件
    saveXmlFile() {
      console.log(this.xmlStr);
    },
    //弹窗保存
    dialogSave() {
      let name = this.form.name;
      const modeling = this.bpmnModeler.get("modeling");
      modeling.updateLabel(this.element, name);
      this.dialogFormVisible = false;
    },
    handleModeler() {
      // 监听节点选择变化
      this.bpmnModeler.on("selection.changed", e => {
        const element = e.newSelection[0];
        this.element = element;
        if (!element) return;
        // console.log(element.businessObject);
        // if (element.businessObject.$type === "bpmn:UserTask") {
        //   this.dialogFormVisible = true;
        // }

        // this.$message({
        //   message: "当前内容：" + element.businessObject.name,
        //   type: "success"
        // });
        // this.form = {
        //   ...element.businessObject,
        //   ...element.businessObject.$attrs
        // };
        // if (this.form.userType === "candidateUsers") {
        //   this.form["candidateUsers"] =
        //     this.form["candidateUsers"].split(",") || [];
        // }
        // console.log(this.form)
      });

      //  监听节点属性变化
      this.bpmnModeler.on("element.changed", e => {
        const { element } = e;
        if (!element) return;
        //  新增节点需要更新回属性面板
        // if (element.id === this.form.id) {
        //   this.form.name = element.businessObject.name;
        //   this.form = { ...this.form };
        // }
      });

      //自定义事件
      let eventBus = this.bpmnModeler.get("eventBus");
      // you may hook into any of the following events
      let events = [
        "element.hover",
        "element.out",
        "element.click",
        "element.dblclick",
        "element.mousedown",
        "element.mouseup"
      ];
      let that = this;
      eventBus.on("element.dblclick", function(e) {
        that.element = e.element;
        // console.log(e.element.businessObject);
        if (e.element.businessObject.$type === "bpmn:UserTask") {
          that.dialogFormVisible = true;
        }
      });

      // events.forEach(function(event) {
      //   eventBus.on(event, function(e) {
      //     // e.element 模型元素
      //     // e.gfx 元素图解
      //     console.log(event, "on", e.element.id);
      //   });
      // });
    }
    // 属性面板名称，更新回流程节点
    // nameChange(name) {
    //   console.log(name);
    //   const modeling = this.bpmnModeler.get("modeling");
    //   modeling.updateLabel(this.element, name);
    // }
  },
  mounted() {
    // 获取到属性ref为“content”的dom节点
    this.container = this.$refs.content;
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas;

    // 建模，官方文档这里讲的很详细
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      // 添加控制板
      propertiesPanel: {
        parent: "#js-properties-panel"
      },
      additionalModules: [
        // 左边工具栏以及节点
        propertiesProviderModule
        // 右边的工具栏
        // propertiesPanelModule
      ]
      // moddleExtensions: {
      //   camunda: camundaModdleDescriptor
      // }
    });

    // 下载画图
    let _this = this;
    // 获取a标签dom节点
    const downloadLink = this.$refs.saveDiagram;
    const downloadSvgLink = this.$refs.saveSvg;
    // 给图绑定事件，当图有发生改变就会触发这个事件
    this.bpmnModeler.on("commandStack.changed", function() {
      _this.saveSVG(function(err, svg) {
        _this.setEncoded(downloadSvgLink, "diagram.svg", err ? null : svg);
      });

      _this.saveDiagram(function(err, xml) {
        _this.setEncoded(downloadLink, "diagram.bpmn", err ? null : xml);
      });
    });

    this.createNewDiagram(this.bpmnModeler);
    this.handleModeler();
  }
};
</script>

<style scope>
/*左边工具栏以及编辑节点的样式*/
@import "bpmn-js/dist/assets/diagram-js.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
/*右边工具栏样式*/
@import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
.containers {
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: 90%;
}
.canvas {
  width: 100%;
  height: 100%;
}
.canvas > div > a {
  display: none;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}
.buttons {
  position: absolute;
  left: 20px;
  bottom: 20px;
}
.buttons > li {
  display: inline-block;
  margin: 5px;
}
.buttons > li > a {
  color: #999;
  background: #eee;
  cursor: not-allowed;
  padding: 8px;
  border: 1px solid #ccc;
}
.buttons > li > a.active {
  color: #333;
  background: #fff;
  cursor: pointer;
}
</style>
