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
    </ul>
  </div>
</template>

<script>
// 引入相关的依赖
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from "bpmn-js/lib/Modeler";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";

export default {
  data() {
    return {
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
    <bpmn2:task id="Task_0r1jhgy" name="请假">
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
    <bpmn2:task id="Task_1vypdv5" name="总经理">
      <bpmn2:incoming>SequenceFlow_02wn0ed</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_0erlkl4</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="SequenceFlow_02wn0ed" name="大于十天" sourceRef="ExclusiveGateway_1300i73" targetRef="Task_1vypdv5" />
    <bpmn2:task id="Task_1470v5j" name="经理">
      <bpmn2:incoming>SequenceFlow_0s7xgeq</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_0kgndvb</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="SequenceFlow_0s7xgeq" name="小于十天" sourceRef="ExclusiveGateway_1300i73" targetRef="Task_1470v5j" />
    <bpmn2:endEvent id="EndEvent_0lupkw8" name="结束">
      <bpmn2:incoming>SequenceFlow_0kgndvb</bpmn2:incoming>
      <bpmn2:incoming>SequenceFlow_0erlkl4</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:sequenceFlow id="SequenceFlow_0kgndvb" sourceRef="Task_1470v5j" targetRef="EndEvent_0lupkw8" />
    <bpmn2:sequenceFlow id="SequenceFlow_0erlkl4" sourceRef="Task_1vypdv5" targetRef="EndEvent_0lupkw8" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="412" y="240" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="419" y="283" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_0r1jhgy_di" bpmnElement="Task_0r1jhgy">
        <dc:Bounds x="498" y="218" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0z01mg5_di" bpmnElement="SequenceFlow_0z01mg5">
        <di:waypoint x="448" y="258" />
        <di:waypoint x="498" y="258" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ExclusiveGateway_1300i73_di" bpmnElement="ExclusiveGateway_1300i73" isMarkerVisible="true">
        <dc:Bounds x="648" y="233" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="650" y="203" width="46" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1i99umy_di" bpmnElement="SequenceFlow_1i99umy">
        <di:waypoint x="598" y="258" />
        <di:waypoint x="648" y="258" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1vypdv5_di" bpmnElement="Task_1vypdv5">
        <dc:Bounds x="748" y="218" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_02wn0ed_di" bpmnElement="SequenceFlow_02wn0ed">
        <di:waypoint x="698" y="258" />
        <di:waypoint x="748" y="258" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="701" y="240" width="44" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1470v5j_di" bpmnElement="Task_1470v5j">
        <dc:Bounds x="748" y="328" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0s7xgeq_di" bpmnElement="SequenceFlow_0s7xgeq">
        <di:waypoint x="673" y="283" />
        <di:waypoint x="673" y="368" />
        <di:waypoint x="748" y="368" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="666" y="323" width="44" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_0lupkw8_di" bpmnElement="EndEvent_0lupkw8">
        <dc:Bounds x="998" y="350" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1005" y="393" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0kgndvb_di" bpmnElement="SequenceFlow_0kgndvb">
        <di:waypoint x="848" y="368" />
        <di:waypoint x="998" y="368" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0erlkl4_di" bpmnElement="SequenceFlow_0erlkl4">
        <di:waypoint x="848" y="258" />
        <di:waypoint x="923" y="258" />
        <di:waypoint x="923" y="368" />
        <di:waypoint x="998" y="368" />
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
      console.log(666666666666666);
      console.log(data);
      const encodedData = encodeURIComponent(data);
      // 获取到图的xml，保存就是把这个xml提交给后台
      this.xmlStr = data;
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      if (data) {
        link.className = "active";
        link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        link.download = name;
      }
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
      // 添加控制板
      propertiesPanel: {
        parent: "#js-properties-panel"
      },
      additionalModules: [
        // 左边工具栏以及节点
        propertiesProviderModule,
        // 右边的工具栏
        propertiesPanelModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
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
