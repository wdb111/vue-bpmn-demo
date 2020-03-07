export default class CustomPalette {
    constructor(bpmnFactory, create, elementFactory, palette, translate) {
        this.bpmnFactory = bpmnFactory;
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;

        palette.registerProvider(this);
    }
    // 这个函数就是绘制palette的核心
    getPaletteEntries(element) {
        const {
            bpmnFactory,
            create,
            elementFactory,
            translate
        } = this;
        function createStart() {
            return function(event) {
                const businessObject = bpmnFactory.create('bpmn:StartEvent');// 其实这个也可以不要
                const shape = elementFactory.createShape({
                    type: 'bpmn:StartEvent',
                    businessObject
                });
                console.log(shape) // 只在拖动或者点击时触发
                create.start(event, shape);
            }
        }
        function createEnd() {
            return function(event) {
                const businessObject = bpmnFactory.create('bpmn:EndEvent');// 其实这个也可以不要
                const shape = elementFactory.createShape({
                    type: 'bpmn:EndEvent',
                    businessObject
                });
                console.log(shape) // 只在拖动或者点击时触发
                create.start(event, shape);
            }
        }
        function createUserTask() {
            return function(event) {
                const businessObject = bpmnFactory.create('bpmn:UserTask');// 其实这个也可以不要
                const shape = elementFactory.createShape({
                    type: 'bpmn:UserTask',
                    businessObject
                });
                console.log(shape) // 只在拖动或者点击时触发
                create.start(event, shape);
            }
        }
        function createExclusiveGateway() {
            return function(event) {
                const businessObject = bpmnFactory.create('bpmn:ExclusiveGateway');// 其实这个也可以不要
                const shape = elementFactory.createShape({
                    type: 'bpmn:ExclusiveGateway',
                    businessObject
                });
                console.log(shape) // 只在拖动或者点击时触发
                create.start(event, shape);
            }
        }
        return {
            'create.demo-start': {
                group: 'model', // 分组名
                className: 'icon-custom demo-start' ,
                title: translate('创建Start'),
                action: { // 操作
                    dragstart: createStart(), // 开始拖拽时调用的事件
                    click: createStart() // 点击时调用的事件
                }
            },
            'create.demo-end': {
                group: 'model', // 分组名
                className: 'icon-custom demo-end' ,
                title: translate('创建End'),
                action: { // 操作
                    dragstart: createEnd(), // 开始拖拽时调用的事件
                    click: createEnd() // 点击时调用的事件
                }
            },
            'create.demo-userTask': {
                group: 'model', // 分组名
                // className: 'bpmn-icon-task red', // 样式类名
                className: 'icon-custom demo-userTask' ,
                title: translate('创建UserTask'),
                action: { // 操作
                    dragstart: createUserTask(), // 开始拖拽时调用的事件
                    click: createUserTask() // 点击时调用的事件
                }
            },
            'create.demo-ExclusiveGateway': {
                group: 'model', // 分组名
                // className: 'bpmn-icon-task red', // 样式类名
                className: 'icon-custom demo-exclusiveGateway' ,
                title: translate('创建ExclusiveGateway'),
                action: { // 操作
                    dragstart: createExclusiveGateway(), // 开始拖拽时调用的事件
                    click: createExclusiveGateway() // 点击时调用的事件
                }
            }
        }
    }
    
}

CustomPalette.$inject = [
    'bpmnFactory',
    'create',
    'elementFactory',
    'palette',
    'translate'
]