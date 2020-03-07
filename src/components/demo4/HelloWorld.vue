<template>
  <div id="demo4" class="containers" ref="content">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
    <div class="allButton">
      <!--      <i class="iconfont icon-baocun" title="保存BPMN到本地" @click="downloadBpmn"></i>-->
      <!--      <Button @click="downloadSvg">保存SVG到本地</Button>-->
      <el-button class="el-icon-circle-plus" @click="createNew"></el-button>
      <el-button class="el-icon-right" title="前进" @click="handleRedo"></el-button>
      <el-button @click="handleUndo" class="el-icon-back" title="后退"></el-button>
      <el-button @click="handleZoom(1.2)" class="el-icon-zoom-in" title="放大"></el-button>
      <el-button @click="handleZoom(0.8)" class="el-icon-zoom-out" title="缩小"></el-button>
      <el-button @click="resetView" class="el-icon-refresh-right" title="恢复原位"></el-button>
    </div>
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
        newScale:1,
        canvas: null,
        xmlStr: null,
        processName: ""
      };
    },
    methods: {
      createNewDiagram() {
        const bpmnXmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="232" y="102" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="239" y="145" width="22" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
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
        this.bpmnModeler.saveXML({format: true}, function (err, xml) {
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
      },
      //下载BPMN
      downloadBpmn() {
        this.bpmnModeler.saveXML({format: true}, (err, xml) => {
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
        this.bpmnModeler.saveSVG({format: true}, (err, svg) => {
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
      // 新建
      createNew() {
        // let newCreatXml = bpmnXml;
        // this.createNewDiagram(newCreatXml);
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
        translate: ["value", customTranslate]
      };
      // 建模，官方文档这里讲的很详细
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        // 添加控制板
        propertiesPanel: {
          parent: "#js-properties-panel"
        },
        additionalModules: [customControlsModule, customTranslateModule],
        // additionalModules: [
        //   // 左边工具栏以及节点
        //   propertiesProviderModule,
        //   // 右边的工具栏
        //   propertiesPanelModule
        // ],
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
      this.bpmnModeler.on("commandStack.changed", function () {
        _this.saveSVG(function (err, svg) {
          _this.setEncoded(downloadSvgLink, "diagram.svg", err ? null : svg);
        });

        _this.saveDiagram(function (err, xml) {
          _this.setEncoded(downloadLink, "diagram.bpmn", err ? null : xml);
        });
      });

      this.createNewDiagram(this.bpmnModeler);
    }
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
    height: 90%;
  }

  .canvas {
    width: 100%;
    height: 100%;
  }

  .allButton {
    position: absolute;
    top: 0;
    left: 175px;
    color: #333;

    font-size: 24px;
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
