<template>
    <div id="demo3" class="containers" ref="content">
        <div style="margin-top: 10px; text-align: center">
            <el-button @click="open">说明</el-button>
        </div>
        <div class="canvas" ref="canvas"></div>
        <div id="js-properties-panel" class="panel"></div>
        <ul class="buttons">
            <li>下载</li>
            <li>
                <a
                    href="javascript:"
                    title="download BPMN diagram"
                    @click="createNew"
                    >新建</a
                >
            </li>
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
            <el-upload
                :show-file-list="false"
                action
                :auto-upload="false"
                :on-change="changeFile"
                class="upload"
            >
                <li>
                    <a
                        slot="trigger"
                        ref="import"
                        href="javascript:"
                        title="download as SVG image"
                        >导入BPMN</a
                    >
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
import customModule from "./custom";

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
            canvas: null,
        };
    },
    methods: {
        open() {
            this.$alert(
                "如果流程图采用这种自定义方式，感觉样式上会非常麻烦，因为bpmn的类型非常多，一个类型对应一张图片的话，全部节点都需要改",
                "说明",
                {
                    confirmButtonText: "确定",
                }
            );
        },
        //新建
        createNew() {
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
        createNewDiagram() {
            let _this = this;
            const bpmnXmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:activiti="http://some-company/schema/bpmn/activiti" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bioc="http://bpmn.io/schema/bpmn/biocolor/1.0" xmlns:tns="http://www.activiti.org/test" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="m1575598316912" name="" targetNamespace="http://www.activiti.org/test">
  <process id="Process_1d6bkiu" processType="None" isClosed="false" isExecutable="false">
    <documentation />
    <startEvent id="Event_0pyi10d" name="开始">
      <documentation></documentation>
      <extensionElements />
      <outgoing>Flow_1rk46na</outgoing>
    </startEvent>
    <sequenceFlow id="Flow_1rk46na" sourceRef="Event_0pyi10d" targetRef="Activity_1p76k63" />
    <userTask id="Activity_1p76k63" name="总部审批" activiti:exclusive="true">
      <documentation></documentation>
      <extensionElements />
      <incoming>Flow_1rk46na</incoming>
      <outgoing>Flow_0hrcl9b</outgoing>
    </userTask>
    <endEvent id="Event_0qfv540" name="结束">
      <documentation></documentation>
      <incoming>Flow_065dy62</incoming>
      <incoming>Flow_0eptb30</incoming>
    </endEvent>
    <sequenceFlow id="Flow_0hrcl9b" sourceRef="Activity_1p76k63" targetRef="Gateway_135idlu">
      <documentation></documentation>
    </sequenceFlow>
    <userTask id="Activity_0t4osdv" name="经理审批" activiti:exclusive="true">
      <documentation></documentation>
      <extensionElements />
      <incoming>Flow_1q2cof7</incoming>
      <outgoing>Flow_065dy62</outgoing>
    </userTask>
    <sequenceFlow id="Flow_1q2cof7" sourceRef="Gateway_135idlu" targetRef="Activity_0t4osdv" />
    <userTask id="Activity_1aq6mcv" name="人事审批" activiti:exclusive="true">
      <documentation></documentation>
      <extensionElements />
      <incoming>Flow_0mxe6fh</incoming>
      <outgoing>Flow_0eptb30</outgoing>
    </userTask>
    <sequenceFlow id="Flow_0mxe6fh" sourceRef="Gateway_135idlu" targetRef="Activity_1aq6mcv" />
    <sequenceFlow id="Flow_065dy62" sourceRef="Activity_0t4osdv" targetRef="Event_0qfv540" />
    <sequenceFlow id="Flow_0eptb30" sourceRef="Activity_1aq6mcv" targetRef="Event_0qfv540" />
    <exclusiveGateway id="Gateway_135idlu">
      <documentation></documentation>
      <incoming>Flow_0hrcl9b</incoming>
      <outgoing>Flow_1q2cof7</outgoing>
      <outgoing>Flow_0mxe6fh</outgoing>
    </exclusiveGateway>
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1d6bkiu">
      <bpmndi:BPMNEdge id="Flow_1rk46na_di" bpmnElement="Flow_1rk46na" bioc:stroke="#CBCBCE">
        <omgdi:waypoint x="355" y="260" />
        <omgdi:waypoint x="430" y="260" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0hrcl9b_di" bpmnElement="Flow_0hrcl9b" bioc:stroke="#CBCBCE">
        <omgdi:waypoint x="530" y="260" />
        <omgdi:waypoint x="605" y="260" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1q2cof7_di" bpmnElement="Flow_1q2cof7" bioc:stroke="#CBCBCE">
        <omgdi:waypoint x="630" y="235" />
        <omgdi:waypoint x="630" y="160" />
        <omgdi:waypoint x="730" y="160" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0mxe6fh_di" bpmnElement="Flow_0mxe6fh" bioc:stroke="#CBCBCE">
        <omgdi:waypoint x="630" y="285" />
        <omgdi:waypoint x="630" y="370" />
        <omgdi:waypoint x="730" y="370" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_065dy62_di" bpmnElement="Flow_065dy62" bioc:stroke="#CBCBCE">
        <omgdi:waypoint x="830" y="160" />
        <omgdi:waypoint x="900" y="160" />
        <omgdi:waypoint x="900" y="250" />
        <omgdi:waypoint x="955" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0eptb30_di" bpmnElement="Flow_0eptb30" bioc:stroke="#CBCBCE">
        <omgdi:waypoint x="830" y="370" />
        <omgdi:waypoint x="900" y="370" />
        <omgdi:waypoint x="900" y="250" />
        <omgdi:waypoint x="955" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Event_0pyi10d_di" bpmnElement="Event_0pyi10d">
        <omgdc:Bounds x="305" y="235" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="319" y="253" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1prvda3_di" bpmnElement="Activity_1p76k63">
        <omgdc:Bounds x="430" y="220" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1aq6mcv_di" bpmnElement="Activity_1aq6mcv">
        <omgdc:Bounds x="730" y="330" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0t4osdv_di" bpmnElement="Activity_0t4osdv">
        <omgdc:Bounds x="730" y="120" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0qfv540_di" bpmnElement="Event_0qfv540">
        <omgdc:Bounds x="955" y="225" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="969" y="243" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_1wfy7rh_di" bpmnElement="Gateway_135idlu" isMarkerVisible="true">
        <omgdc:Bounds x="605" y="235" width="50" height="50" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
`;
            // 将字符串转换成图显示出来
            this.bpmnModeler.importXML(bpmnXmlStr, function (err) {
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
            this.bpmnModeler.saveXML({ format: true }, function (err, xml) {
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
                link.href =
                    "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
                link.download = name;
            }
        },
        // 导入文件
        changeFile(file) {
            let _this = this;
            let reads = new FileReader();
            let f = file.raw;
            reads.readAsText(f, "utf-8");
            reads.onload = function (e) {
                _this.bpmnModeler.importXML(e.target.result, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            };
        },
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
                activiti: activitiModdleDescriptor,
            },
            additionalModules: [
                // 自定义的节点
                customModule,
            ],
        });

        // 下载画图
        let _this = this;
        // 获取a标签dom节点
        const downloadLink = this.$refs.saveDiagram;
        const downloadSvgLink = this.$refs.saveSvg;
        // 给图绑定事件，当图有发生改变就会触发这个事件
        this.bpmnModeler.on("commandStack.changed", function (e) {
            _this.saveSVG(function (err, svg) {
                _this.setEncoded(
                    downloadSvgLink,
                    "diagram.svg",
                    err ? null : svg
                );
            });

            _this.saveDiagram(function (err, xml) {
                console.log("xml-------", err, xml);
                _this.setEncoded(
                    downloadLink,
                    "diagram.bpmn",
                    err ? null : xml
                );
            });
        });
        this.bpmnModeler.on("element.click", (event) => {
            event.originalEvent.preventDefault();
            event.originalEvent.stopPropagation();
            _this.element = event.element;
            _this.businessObject = getBusinessObject(_this.element);
            console.log("businessObject", _this.businessObject);
            _this.$nextTick(() => {
                _this.$refs.panel.init();
            });
        });
        this.bpmnModeler.on("connection.added", (e) => {
            _this.$nextTick(() => {
                _this.modeling.setColor(e.element, {
                    stroke: "#CBCBCE",
                });
            });
        });
        this.modeling = this.bpmnModeler.get("modeling");
        this.createNewDiagram(this.bpmnModeler);
    },
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
    height: ~"calc(100% - 141px)";
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
