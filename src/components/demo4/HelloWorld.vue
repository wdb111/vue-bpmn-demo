<template>
    <div id="demo4" class="containers" ref="content">
        <div class="canvas" ref="canvas"></div>
        <div id="js-properties-panel" class="panel"></div>
        <div class="allButton">
            <el-button size="mini" @click="downloadBpmn"
                >保存BPMN到本地</el-button
            >
            <el-button size="mini" @click="downloadSvg"
                >保存SVG到本地</el-button
            >
            <el-button size="mini" @click="createNew">新建</el-button>
            <el-button size="mini" @click="handleZoom(1.2)">放大</el-button>
            <el-button size="mini" @click="handleZoom(0.8)">缩小</el-button>
            <el-button size="mini" @click="resetView">原始尺寸</el-button>
            <el-button size="mini" @click="handleUndo">后退</el-button>
            <el-button size="mini" @click="handleRedo">前进</el-button>
            <el-upload
                style="display: inline-block"
                action
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleOnchangeFile"
            >
                <el-button size="mini">导入</el-button>
            </el-upload>
        </div>
        <ul class="buttons">
            <li>下载</li>
            <li>
                <a
                    ref="saveDiagram"
                    href="javascript:"
                    title="download BPMN diagram"
                    >BPMN diagram</a
                >
            </li>
            <li>
                <a
                    ref="saveSvg"
                    href="javascript:"
                    title="download as SVG image"
                    >SVG image</a
                >
            </li>
        </ul>
    </div>
</template>

<script>
// 引入相关的依赖
import BpmnModeler from "./bpmn-js/lib/Modeler";
// import propertiesPanelModule from "bpmn-js-properties-panel";
// import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
import customControlsModule from "./bpmn-js-custom"; //左侧工具栏添加常用元素;
import customTranslate from "./customTranslate/customTranslate"; //汉化
export default {
    data() {
        return {
            // bpmn建模器
            bpmnModeler: null,
            container: null,
            newScale: 1,
            canvas: null,
            xmlStr: null,
            processName: "",
        };
    },
    methods: {
        createNewDiagram() {
            const bpmnXmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_0b8hmmy" name="开始">
      <bpmn2:outgoing>SequenceFlow_12m2qq7</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:exclusiveGateway id="ExclusiveGateway_06rp6gx">
      <bpmn2:incoming>SequenceFlow_12m2qq7</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_0z91i3a</bpmn2:outgoing>
      <bpmn2:outgoing>SequenceFlow_1t8402y</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:sequenceFlow id="SequenceFlow_12m2qq7" sourceRef="StartEvent_0b8hmmy" targetRef="ExclusiveGateway_06rp6gx" />
    <bpmn2:userTask id="UserTask_0481xfu" name="经理审批">
      <bpmn2:incoming>SequenceFlow_0z91i3a</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_0zk8y4f</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:sequenceFlow id="SequenceFlow_0z91i3a" sourceRef="ExclusiveGateway_06rp6gx" targetRef="UserTask_0481xfu" />
    <bpmn2:userTask id="UserTask_1f6a42g" name="人事审批">
      <bpmn2:incoming>SequenceFlow_1t8402y</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_03uzpfh</bpmn2:outgoing>
    </bpmn2:userTask>
    <bpmn2:sequenceFlow id="SequenceFlow_1t8402y" sourceRef="ExclusiveGateway_06rp6gx" targetRef="UserTask_1f6a42g" />
    <bpmn2:endEvent id="EndEvent_1e7b61h" name="结束">
      <bpmn2:incoming>SequenceFlow_03uzpfh</bpmn2:incoming>
      <bpmn2:incoming>SequenceFlow_0zk8y4f</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:sequenceFlow id="SequenceFlow_03uzpfh" sourceRef="UserTask_1f6a42g" targetRef="EndEvent_1e7b61h" />
    <bpmn2:sequenceFlow id="SequenceFlow_0zk8y4f" sourceRef="UserTask_0481xfu" targetRef="EndEvent_1e7b61h" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="StartEvent_0b8hmmy_di" bpmnElement="StartEvent_0b8hmmy">
        <dc:Bounds x="600" y="270" width="80" height="80" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="622" y="299" width="35" height="21" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ExclusiveGateway_06rp6gx_di" bpmnElement="ExclusiveGateway_06rp6gx" isMarkerVisible="true">
        <dc:Bounds x="760" y="270" width="80" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_12m2qq7_di" bpmnElement="SequenceFlow_12m2qq7">
        <di:waypoint x="680" y="310" />
        <di:waypoint x="760" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="UserTask_0481xfu_di" bpmnElement="UserTask_0481xfu">
        <dc:Bounds x="920" y="150" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0z91i3a_di" bpmnElement="SequenceFlow_0z91i3a">
        <di:waypoint x="800" y="270" />
        <di:waypoint x="800" y="190" />
        <di:waypoint x="920" y="190" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="UserTask_1f6a42g_di" bpmnElement="UserTask_1f6a42g">
        <dc:Bounds x="920" y="370" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1t8402y_di" bpmnElement="SequenceFlow_1t8402y">
        <di:waypoint x="800" y="350" />
        <di:waypoint x="800" y="410" />
        <di:waypoint x="920" y="410" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_1e7b61h_di" bpmnElement="EndEvent_1e7b61h">
        <dc:Bounds x="1180" y="270" width="80" height="80" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1203" y="299" width="33" height="21" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_03uzpfh_di" bpmnElement="SequenceFlow_03uzpfh">
        <di:waypoint x="1020" y="410" />
        <di:waypoint x="1110" y="410" />
        <di:waypoint x="1110" y="310" />
        <di:waypoint x="1180" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0zk8y4f_di" bpmnElement="SequenceFlow_0zk8y4f">
        <di:waypoint x="1020" y="190" />
        <di:waypoint x="1110" y="190" />
        <di:waypoint x="1110" y="310" />
        <di:waypoint x="1180" y="310" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>


`;
            // 将字符串转换成图显示出来
            this.bpmnModeler.importXML(bpmnXmlStr, function (err) {
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
            this.bpmnModeler.saveXML({ format: true }, function (err, xml) {
                done(err, xml);
            });
        },
        // 当图发生改变的时候会调用这个函数，这个data就是图的xml
        setEncoded(link, name, data) {
            // 把xml转换为URI，下载要用到的
            // console.log(666666666666666);
            // console.log(data);
            const encodedData = encodeURIComponent(data);
            // 获取到图的xml，保存就是把这个xml提交给后台
            this.xmlStr = data;
            // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
            if (data) {
                link.className = "active";
                link.href =
                    "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
                link.download = name;
            }
        },
        //下载BPMN
        downloadBpmn() {
            this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
                if (xml) {
                    this.bpmnText = xml;
                    var a = document.createElement("a");
                    a.href =
                        "data:application/bpmn20-xml;charset=UTF-8," +
                        encodeURIComponent(xml);
                    a.download = "diagram.bpmn";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    a = null;
                }
            });
        },
        //下载SVG
        downloadSvg() {
            this.bpmnModeler.saveSVG({ format: true }, (err, svg) => {
                if (svg) {
                    this.bpmnText = svg;
                    var a = document.createElement("a");
                    a.href =
                        "data:application/bpmn20-xml;charset=UTF-8," +
                        encodeURIComponent(svg);
                    a.download = "diagram.svg";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    a = null;
                }
            });
        },
        // 导入
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
        // 新建
        createNew() {
            // let newCreatXml = bpmnXml;
            // this.createNewDiagram(newCreatXml);
            this.bpmnModeler.createDiagram((err) => {
                if (err) {
                    throw err;
                }
                this.bpmnModeler.get("canvas").zoom("fit-viewport");
                var eventBus = this.bpmnModeler.get("eventBus");
                var events = ["element.click", "element.dblclick"];
                events.forEach((event) => {
                    eventBus.on(event, (e) => {
                        // console.log(event, 'on', e.element.id)
                    });
                });
            });
        },
        // 前进
        handleRedo() {
            this.bpmnModeler.get("commandStack").redo();
        },
        // 后退
        handleUndo() {
            this.bpmnModeler.get("commandStack").undo();
        },
        // 放大缩小
        handleZoom(radio) {
            this.newScale *= radio;
            this.bpmnModeler.get("canvas").zoom(this.newScale);
        },
        //恢复到原位
        resetView() {
            this.bpmnModeler.get("canvas").zoom("fit-viewport");
        },
    },
    mounted() {
        // 获取到属性ref为“content”的dom节点
        this.container = this.$refs.content;
        // 获取到属性ref为“canvas”的dom节点
        const canvas = this.$refs.canvas;
        //汉化
        let customTranslateModule = {
            translate: ["value", customTranslate],
        };
        // 建模，官方文档这里讲的很详细
        this.bpmnModeler = new BpmnModeler({
            container: canvas,
            // 添加控制板
            propertiesPanel: {
                parent: "#js-properties-panel",
            },
            additionalModules: [customControlsModule, customTranslateModule],
            // additionalModules: [
            //   // 左边工具栏以及节点
            //   propertiesProviderModule,
            //   // 右边的工具栏
            //   propertiesPanelModule
            // ],
            moddleExtensions: {
                camunda: camundaModdleDescriptor,
            },
        });

        // 下载画图
        let _this = this;
        // 获取a标签dom节点
        const downloadLink = this.$refs.saveDiagram;
        const downloadSvgLink = this.$refs.saveSvg;
        // 给图绑定事件，当图有发生改变就会触发这个事件
        this.bpmnModeler.on("commandStack.changed", function () {
            _this.saveSVG(function (err, svg) {
                _this.setEncoded(
                    downloadSvgLink,
                    "diagram.svg",
                    err ? null : svg
                );
            });

            _this.saveDiagram(function (err, xml) {
                _this.setEncoded(
                    downloadLink,
                    "diagram.bpmn",
                    err ? null : xml
                );
            });
        });

        this.createNewDiagram(this.bpmnModeler);
    },
};
</script>
<style lang="less">
/*左边工具栏以及编辑节点的样式*/
@import "bpmn-js/dist/assets/diagram-js.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
/*右边工具栏样式*/
/*@import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";*/
/*引入自定义css*/
@import "./bpmn-js-custom/bpmn-js-custom.css";
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

.allButton {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    padding: 0 0 10px;
    box-sizing: border-box;
    color: #333;
    border-bottom: 1px solid #eee;
    background-color: #fff;
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
</style>
