<template>
  <div id="demo3" class="containers" ref="content">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
    <ul class="buttons">
      <li>下载</li>
      <li>
        <a href="javascript:" title="download BPMN diagram" @click="createNew">新建</a>
      </li>
      <li>
        <a ref="saveDiagram" href="javascript:" title="download BPMN diagram">BPMN diagram</a>
      </li>
      <li>
        <a ref="saveSvg" href="javascript:" title="download as SVG image">SVG image</a>
      </li>
      <el-upload
        :show-file-list="false"
        action
        :auto-upload="false"
        :on-change="changeFile"
        class="upload"
      >
        <li>
          <a slot="trigger" ref="import" href="javascript:" title="download as SVG image">导入BPMN</a>
        </li>
      </el-upload>
    </ul>
    <!-- panel为自定义属性面板，需要传入element，businessObject，moddle，modeling（后面会提及） -->
    <panel
      ref="panel"
      :element="element"
      :businessObject="businessObject"
      :moddle="moddle"
      :modeling="modeling"
    />
  </div>
</template>

<script>
// 引入相关的依赖
import BpmnModeler from "bpmn-js/lib/Modeler";
import activitiModdleDescriptor from "./activiti.json";
import { getBusinessObject } from "bpmn-js/lib/util/ModelUtil";
import panel from "./panel";

//自定义
import customModule from './custom';

export default {
  components: { panel },
  data() {
    return {
      businessObject: null,
      element: null,
      moddle: null,
      modeling: null,
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null
    };
  },
  methods: {
    //新建
    createNew() {
      this.bpmnModeler.createDiagram(err => {
        if (err) {
          throw err;
        }
        this.bpmnModeler.get("canvas").zoom("fit-viewport");
        var eventBus = this.bpmnModeler.get("eventBus");

        var events = ["element.click", "element.dblclick"];
        events.forEach(event => {
          eventBus.on(event, e => {
            // console.log(event, 'on', e.element.id)
          });
        });
      });
    },
    createNewDiagram() {
      let _this = this;
      const bpmnXmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:activiti="http://some-company/schema/bpmn/activiti" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tns="http://www.activiti.org/test" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="m1575598316912" name="" targetNamespace="http://www.activiti.org/test">
  <process id="Process_1d6bkiu" processType="None" isClosed="false" isExecutable="false">
    <documentation></documentation>
    <startEvent id="StartEvent_0x0ptw6" name="开始">
      <documentation></documentation>
      <extensionElements />
      <outgoing>SequenceFlow_1xjq5e6</outgoing>
    </startEvent>
    <exclusiveGateway id="ExclusiveGateway_0vmukfx">
      <documentation></documentation>
      <incoming>SequenceFlow_1xjq5e6</incoming>
      <outgoing>SequenceFlow_1if0sp3</outgoing>
      <outgoing>SequenceFlow_1a4g0qc</outgoing>
    </exclusiveGateway>
    <sequenceFlow id="SequenceFlow_1xjq5e6" sourceRef="StartEvent_0x0ptw6" targetRef="ExclusiveGateway_0vmukfx" />
    <userTask id="UserTask_19m4d3i" name="审批人1" activiti:exclusive="true">
      <documentation></documentation>
      <extensionElements />
      <incoming>SequenceFlow_1if0sp3</incoming>
      <outgoing>SequenceFlow_0463bdv</outgoing>
    </userTask>
    <sequenceFlow id="SequenceFlow_1if0sp3" sourceRef="ExclusiveGateway_0vmukfx" targetRef="UserTask_19m4d3i" />
    <endEvent id="EndEvent_0tcwkri" name="结束">
      <documentation></documentation>
      <incoming>SequenceFlow_0463bdv</incoming>
      <incoming>SequenceFlow_0b49jng</incoming>
    </endEvent>
    <sequenceFlow id="SequenceFlow_0463bdv" sourceRef="UserTask_19m4d3i" targetRef="EndEvent_0tcwkri" />
    <userTask id="UserTask_0zw4ovc" name="审批人2" activiti:exclusive="true">
      <documentation></documentation>
      <extensionElements />
      <incoming>SequenceFlow_1a4g0qc</incoming>
      <outgoing>SequenceFlow_0b49jng</outgoing>
    </userTask>
    <sequenceFlow id="SequenceFlow_1a4g0qc" sourceRef="ExclusiveGateway_0vmukfx" targetRef="UserTask_0zw4ovc" />
    <sequenceFlow id="SequenceFlow_0b49jng" sourceRef="UserTask_0zw4ovc" targetRef="EndEvent_0tcwkri" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1d6bkiu">
      <bpmndi:BPMNShape id="StartEvent_0x0ptw6_di" bpmnElement="StartEvent_0x0ptw6">
        <omgdc:Bounds x="522" y="162" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="529" y="205" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ExclusiveGateway_0vmukfx_di" bpmnElement="ExclusiveGateway_0vmukfx" isMarkerVisible="true">
        <omgdc:Bounds x="615" y="155" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1xjq5e6_di" bpmnElement="SequenceFlow_1xjq5e6">
        <omgdi:waypoint x="558" y="180" />
        <omgdi:waypoint x="615" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="UserTask_19m4d3i_di" bpmnElement="UserTask_19m4d3i">
        <omgdc:Bounds x="730" y="60" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1if0sp3_di" bpmnElement="SequenceFlow_1if0sp3">
        <omgdi:waypoint x="640" y="155" />
        <omgdi:waypoint x="640" y="100" />
        <omgdi:waypoint x="730" y="100" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_0tcwkri_di" bpmnElement="EndEvent_0tcwkri">
        <omgdc:Bounds x="972" y="162" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="979" y="205" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0463bdv_di" bpmnElement="SequenceFlow_0463bdv">
        <omgdi:waypoint x="830" y="100" />
        <omgdi:waypoint x="900" y="100" />
        <omgdi:waypoint x="900" y="180" />
        <omgdi:waypoint x="972" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="UserTask_0zw4ovc_di" bpmnElement="UserTask_0zw4ovc">
        <omgdc:Bounds x="730" y="220" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1a4g0qc_di" bpmnElement="SequenceFlow_1a4g0qc">
        <omgdi:waypoint x="640" y="205" />
        <omgdi:waypoint x="640" y="260" />
        <omgdi:waypoint x="730" y="260" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0b49jng_di" bpmnElement="SequenceFlow_0b49jng">
        <omgdi:waypoint x="830" y="260" />
        <omgdi:waypoint x="900" y="260" />
        <omgdi:waypoint x="900" y="180" />
        <omgdi:waypoint x="972" y="180" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>

        `;
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(bpmnXmlStr, function(err) {
        if (err) {
          console.error(err);
        }
        _this.moddle = _this.bpmnModeler.get("moddle");
        _this.modeling = _this.bpmnModeler.get("modeling");
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
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      if (data) {
        link.className = "active";
        link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        link.download = name;
      }
    },
    // 导入文件
    changeFile(file) {
      let _this = this;
      let reads = new FileReader();
      let f = file.raw;
      reads.readAsText(f, "utf-8");
      reads.onload = function(e) {
        _this.bpmnModeler.importXML(e.target.result, function(err) {
          if (err) {
            console.error(err);
          }
        });
      };
    }
  },
  mounted() {
    // 获取到属性ref为“content”的dom节点
    this.container = this.$refs.content;
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas;

    // 建模，官方文档这里讲的很详细
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      moddleExtensions: {
        activiti: activitiModdleDescriptor
      },
      additionalModules: [
        // 自定义的节点
        customModule
    ]
    });

    // 下载画图
    let _this = this;
    // 获取a标签dom节点
    const downloadLink = this.$refs.saveDiagram;
    const downloadSvgLink = this.$refs.saveSvg;
    // 给图绑定事件，当图有发生改变就会触发这个事件
    this.bpmnModeler.on("commandStack.changed", function(e) {
      _this.saveSVG(function(err, svg) {
        _this.setEncoded(downloadSvgLink, "diagram.svg", err ? null : svg);
      });

      _this.saveDiagram(function(err, xml) {
        console.log("xml-------", err, xml);
        _this.setEncoded(downloadLink, "diagram.bpmn", err ? null : xml);
      });
    });
    this.bpmnModeler.on("element.click", event => {
      event.originalEvent.preventDefault();
      event.originalEvent.stopPropagation();
      _this.element = event.element;
      _this.businessObject = getBusinessObject(_this.element);
      console.log("businessObject", _this.businessObject);
      _this.$nextTick(() => {
        _this.$refs.panel.init();
      });
    });
    this.createNewDiagram(this.bpmnModeler);
  }
};
</script>
<style lang="less">
  //自定义样式
@import "./css/app.css";
</style>
<style lang="less">
/*左边工具栏以及编辑节点的样式*/
@import "bpmn-js/dist/assets/diagram-js.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

.containers {
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: ~"calc(100% - 91px)";
}
.canvas {
  width: 100%;
  height: 100%;
}
.panel {
  position: absolute;
  right: 0;
  top: 0;
  width: 260px;
}
.buttons {
  position: absolute;
  left: 20px;
  bottom: 20px;
  & > li {
    display: inline-block;
    margin: 5px;
    & > a {
      color: #999;
      background: #eee;
      cursor: not-allowed;
      padding: 8px;
      border: 1px solid #ccc;
      &.active {
        color: #333;
        background: #fff;
        cursor: pointer;
      }
    }
  }
}
.upload {
  display: inline-block;
  margin: 5px;
  li {
    list-style: none;
    a {
      color: #333;
      padding: 8px;
      border: 1px solid #ccc;
    }
  }
}
</style>
