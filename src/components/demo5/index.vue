<template>
  <div class="containerBox">
    <div class="header">
      <el-button-group>
        <el-button type="primary" size="mini" @click="handleUndo">后退</el-button>
        <el-button type="success" size="mini" @click="handleRedo">前进</el-button>
        <el-button type="warning" size="mini" @click="handleDownload">下载</el-button>
        <el-upload
          style="display: inline-block;"
          :file-list="fileList"
          class="upload-demo"
          action
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleOnchangeFile"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
        >
          <el-button type="danger" size="mini">导入</el-button>
        </el-upload>
      </el-button-group>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
import BpmnModeler from "bpmn-js/lib/Modeler";
// import CustomPaletteProvider from "./customPalette";
// 引入自定义的一些module
import customModule from "./custom/index.js";
import { getBusinessObject } from "bpmn-js/lib/util/ModelUtil";
import camundaExtension from "./resources/camunda.json";
export default {
  name: "HelloWorld",
  data() {
    return {
      nickName: "",
      containerEl: null,
      bpmnModeler: null,
      modeling: null,
      fileList: [],
    };
  },
  created() {},
  mounted() {
    this.containerEl = document.getElementById("container");
    this.bpmnModeler = new BpmnModeler({
      container: this.containerEl,
      moddleExtensions: { camunda: camundaExtension },
      additionalModules: [
        // CustomPaletteProvider,
        customModule, //自定义属性
      ],
    });
    this.modeling = this.bpmnModeler.get("modeling");
    let _this = this;
    let events = [
      "connect.end",
      "connect.start",
      "connection.added",
      "detach",
      "diagram.destroy",
      "diagram.init",
      "element.click",
      "elements.delete",
      "shape.added",
    ];
    events.forEach((event) => {
      _this.bpmnModeler.on(event, (e) => {
        // console.log("事件：", event);
        // console.log(e.element.type);
        if (event === "connection.added") {
          _this.$nextTick(() => {
            _this.modeling.setColor(e.element, {
              stroke: "#CBCBCE",
            });
          });
        }
        if (event === "shape.added") {
          if (e.element.type === "bpmn:UserTask") {
            _this.$nextTick(() => {
              _this.modeling.setColor(e.element, {
                stroke: "#B483E6",
                fill: "#F3E9FA",
              });
            });
          }
          if (e.element.type === "bpmn:ExclusiveGateway") {
            _this.$nextTick(() => {
              _this.modeling.setColor(e.element, {
                stroke: "#FAD37E",
                fill: "#FFF1DD",
              });
            });
          }
        }
      });
    });
    this.create();
  },
  methods: {
    create() {
      // 将字符串转换成图显示出来
      // 导入BPMN流程图
      try {
        let diagramXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_0zak55e</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_0zak55e" sourceRef="StartEvent_1" targetRef="Activity_1b52ms7" />
    <bpmn:endEvent id="Event_0l0qehc">
      <bpmn:incoming>Flow_0voi12o</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0voi12o" sourceRef="Activity_1b52ms7" targetRef="Event_0l0qehc" />
    <bpmn:userTask id="Activity_1b52ms7">
      <bpmn:incoming>Flow_0zak55e</bpmn:incoming>
      <bpmn:outgoing>Flow_0voi12o</bpmn:outgoing>
    </bpmn:userTask>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNEdge id="Flow_0zak55e_di" bpmnElement="Flow_0zak55e" bioc:stroke="green" bioc:fill="red">
        <di:waypoint x="209" y="120" />
        <di:waypoint x="260" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0voi12o_di" bpmnElement="Flow_0voi12o" bioc:stroke="green" bioc:fill="red">
        <di:waypoint x="360" y="120" />
        <di:waypoint x="412" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1" bioc:stroke="green" bioc:fill="red">
        <dc:Bounds x="173" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0l0qehc_di" bpmnElement="Event_0l0qehc" bioc:stroke="green" bioc:fill="red">
        <dc:Bounds x="412" y="102" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_15hdqkv_di" bpmnElement="Activity_1b52ms7" bioc:stroke="green" bioc:fill="red">
        <dc:Bounds x="260" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>

`;
        let result = this.bpmnModeler.importXML(diagramXml);
        let { warnings } = result;
      } catch (err) {
        console.log(err.message, err.warning);
      }
      // this.bpmnModeler.createDiagram(() => {
      //   this.bpmnModeler.get("canvas").zoom("fit-viewport");
      //   // this.bpmnModeler.get("canvas").zoom("fit-viewport","auto");//居中显示图形
      // });
    },
    handleRemove(file) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (file.name === this.fileList[i].name) {
          this.fileList.splice(i, 1);
        }
      }
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 后退
    handleUndo() {
      this.bpmnModeler.get("commandStack").undo();
    },
    // 前进
    handleRedo() {
      this.bpmnModeler.get("commandStack").redo();
    },
    handleDownload() {
      this.bpmnModeler.saveXML({ format: true }, (err, data) => {
        const dataTrack = "bpmn";
        const a = document.createElement("a");
        const name = `diagram.${dataTrack}`;
        a.setAttribute(
          "href",
          `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(
            data
          )}`
        );
        a.setAttribute("target", "_blank");
        a.setAttribute("dataTrack", `diagram:download-${dataTrack}`);
        a.setAttribute("download", name);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    },
    handleOnchangeFile(file) {
      const reader = new FileReader();
      let data = "";
      reader.readAsText(file.raw);
      reader.onload = (event) => {
        data = event.target.result;
        this.bpmnModeler.importXML(data, (err) => {
          if (err) {
            this.$message.info("导入失败");
          } else {
            this.$message.success("导入成功");
          }
        });
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import "bpmn-js/dist/assets/diagram-js.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
/* @import "~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css"; */
.highlight:not(.djs-connection) .djs-visual > :nth-child(1) {
  fill: green !important; /* color elements as green */
}
</style>
<style  scoped>
.containerBox {
  height: 100%;
}
.containerBox .header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
}

.containerBox #container {
  height: calc(100% - 50px);
}
</style>
