import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import BpmnRenderer from "bpmn-js/lib/draw/BpmnRenderer"

const HIGH_PRIORITY = 1500

const propertiesConfig = {
  'bpmn:StartEvent': {
    fill: '#D8F1FC',
    stroke: '#0F8CE9',
    strokeWidth: 2
  },
  'bpmn:UserTask': {
    stroke: '#B483E6',
    fill: "#F3E9FA",
    strokeWidth: 2,
  },
  'bpmn:EndEvent': {
    stroke: '#14CE67',
    fill: '#CEFCE4',
    strokeWidth: 2
  },
  'bpmn:SequenceFlow': {
    stroke: "red",
    fill: "red"
  }
}

export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);
    console.log(bpmnRenderer)
    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {
    // ignore labels
    return !element.labelTarget;
  }
  drawConnection(parentNode, element) {
    let shape = this.bpmnRenderer.drawConnection(parentNode, element)
    // console.log(6666,parentNode,element.type)
  }
  drawShape(parentNode, element) {
    let shape = this.bpmnRenderer.drawShape(parentNode, element)
    // console.log(shape, element.type)
    // BpmnRenderer({
    //   config: {
    //     defaultFillColor: "red"
    // })
    setShapeProperties(shape, element) // 在此修改shape
    // console.log(666,shape.style.fill="red",element.type)
    return shape
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape);
  }
}

function setShapeProperties(shape, element) {
  const type = element.type // 获取到的类型
  if (propertiesConfig[type]) {
    const properties = propertiesConfig[type]
    Object.keys(properties).forEach(prop => {
      shape.style.setProperty(prop, properties[prop])
    })
  }
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];