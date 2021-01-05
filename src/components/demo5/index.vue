<template>
    <div id="demo5" class="containerBox">
        <div class="header">
            <el-button-group>
                <el-button size="mini" @click="open">说明</el-button>
                <el-button type="primary" size="mini" @click="handleUndo"
                    >后退</el-button
                >
                <el-button type="success" size="mini" @click="handleRedo"
                    >前进</el-button
                >
                <el-button type="warning" size="mini" @click="handleDownload"
                    >下载</el-button
                >
                <el-upload
                    style="display: inline-block"
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
// 引入自定义的一些module
import customModule from "./custom/index.js";
import { getBusinessObject } from "bpmn-js/lib/util/ModelUtil";
import camundaExtension from "./resources/camunda.json";
import customTranslate from "./customTranslate/customTranslate"; //汉化
import { xml_start_id } from "./data.js";
export default {
    name: "HelloWorld",
    data() {
        return {
            nickName: "",
            containerEl: null,
            bpmnModeler: null,
            modeling: null,
            fileList: [],
            bpmnEventListeners: [
                "connect.end",
                "connect.start",
                "connection.added",
                "detach",
                "diagram.destroy",
                "diagram.init",
                "element.click",
                "elements.delete",
                "shape.added",
            ],
            bpmncircleArr: ["bpmn:StartEvent", "bpmn:EndEvent"],
            bpmnElementColor: {
                "bpmn:StartEvent": {
                    fill: "#D8F1FC",
                    stroke: "#0F8CE9",
                },
                "bpmn:Task": {
                    stroke: "#B483E6",
                    fill: "#F3E9FA",
                    strokeWidth: 20,
                },
                "bpmn:UserTask": {
                    stroke: "#B483E6",
                    fill: "#F3E9FA",
                    strokeWidth: 2,
                },
                "bpmn:EndEvent": {
                    stroke: "#14CE67",
                    fill: "#CEFCE4",
                    strokeWidth: 2,
                },
                "bpmn:SequenceFlow": {
                    stroke: "#CBCBCE",
                },
                "bpmn:ExclusiveGateway": {
                    stroke: "#FAD37E",
                    fill: "#FFF1DD",
                },
                "bpmn:ParallelGateway": {
                    stroke: "#FAD37E",
                    fill: "#FFF1DD",
                },
                "bpmn:InclusiveGateway": {
                    stroke: "#FAD37E",
                    fill: "#FFF1DD",
                },
                "bpmn:ComplexGateway": {
                    stroke: "#FAD37E",
                    fill: "#FFF1DD",
                },
            },
        };
    },
    created() {},
    mounted() {
        this.containerEl = document.getElementById("container");
        //汉化
        let customTranslateModule = {
            translate: ["value", customTranslate],
        };
        this.bpmnModeler = new BpmnModeler({
            container: this.containerEl,
            moddleExtensions: { camunda: camundaExtension },
            additionalModules: [
                customModule, //自定义属性
                customTranslateModule,
            ],
        });
        this.modeling = this.bpmnModeler.get("modeling");
        let _this = this;
        this.bpmnEventListeners.forEach((event) => {
            _this.bpmnModeler.on(event, (e) => {
                if (event === "connection.added") {
                    _this.$nextTick(() => {
                        _this.modeling.setColor(e.element, {
                            stroke: "#CBCBCE",
                        });
                    });
                }
                if (event === "shape.added") {
                    _this.$nextTick(() => {
                        if (_this.bpmncircleArr.includes(e.element.type)) {
                            _this.modeling.resizeShape(e.element, {
                                x: e.element.x - 7,
                                y: e.element.y - 7,
                                width: 50,
                                height: 50,
                            });
                        }
                        _this.modeling.setColor(
                            e.element,
                            _this.bpmnElementColor[e.element.type]
                        );
                    });
                }
            });
        });
        this.create();
    },
    methods: {
        open() {
            this.$alert(
                "这种方式是通过事件监听和setColor()、resizeShape()来实现,左侧可通过css样式修改来实现",
                "说明",
                {
                    confirmButtonText: "确定",
                }
            );
        },
        create() {
            // 将字符串转换成图显示出来
            // 导入BPMN流程图
            try {
                let diagramXml = xml_start_id();
                let result = this.bpmnModeler.importXML(diagramXml);
                // this.bpmnModeler.createDiagram(() => {
                //     this.bpmnModeler.get("canvas").zoom("fit-viewport");
                //     // this.bpmnModeler.get("canvas").zoom("fit-viewport","auto");//居中显示图形
                // });
                console.log(result);
                let { warnings } = result;
            } catch (err) {
                console.log(err);
            }
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
</style>
<style lang="less">
@import "bpmn-js/dist/assets/diagram-js.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
/* @import "~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css"; */
.highlight:not(.djs-connection) .djs-visual > :nth-child(1) {
    fill: green !important; /* color elements as green */
}
@import "./custom/bpmn-js-custom.less";
</style>
<style lang="less" scoped>
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
