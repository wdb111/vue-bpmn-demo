const customElements = ['bpmn:StartEvent','bpmn:EndEvent','bpmn:UserTask','bpmn:ExclusiveGateway']
const customConfig = { // 自定义元素的配置(后面会用到)
    'bpmn:StartEvent': {
        'url': require('../../../assets/start.png'),//vue 引入图片方式
        'attr': { x: 0, y: 0, width: 50, height: 50 }
    },
    'bpmn:EndEvent': {
        'url': require('../../../assets/end.png'),//vue 引入图片方式
        'attr': { x: 0, y: 0, width: 50, height: 50 }
    },
    'bpmn:UserTask': {
        'url': require('../../../assets/userTask.png'),//vue 引入图片方式
        'attr': { x: 0, y: 0, width: 100, height: 80 }
    },
    'bpmn:ExclusiveGateway': {
        'url': require('../../../assets/ExclusiveGateway.png'),
        'attr': { x: 0, y: 0, width: 50, height: 50 }
    }
}
const hasLabelElements = ['bpmn:StartEvent', 'bpmn:EndEvent'] // 一开始就有label标签的元素类型
export { customElements, customConfig, hasLabelElements }
