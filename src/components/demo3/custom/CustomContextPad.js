export default class CustomContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;

        if (config.autoPlace !== false) {
            this.autoPlace = injector.get('autoPlace', false);
        }

        contextPad.registerProvider(this); // 定义这是一个contextPad
    }

    getContextPadEntries(element) {
        const {
            autoPlace,
            create,
            elementFactory,
            translate
        } = this;
 
        function appendEnd(event, element) {
            if (autoPlace) {
                const shape = elementFactory.createShape({ type: 'bpmn:EndEvent' });
                autoPlace.append(element, shape);
            } else {
                appendEndStart(event, element);
            }
        }
        function appendEndStart(event) {
            const shape = elementFactory.createShape({ type: 'bpmn:EndEvent' });
            create.start(event, shape, element);
        }

        function appendUserTask(event, element) {
            if (autoPlace) {
                const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
                autoPlace.append(element, shape);
            } else {
                appendUserTaskStart(event, element);
            }
        }
        function appendUserTaskStart(event) {
            const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });
            create.start(event, shape, element);
        }

        function appendExclusiveGateway(event, element) {
            if (autoPlace) {
                const shape = elementFactory.createShape({ type: 'bpmn:ExclusiveGateway' });
                autoPlace.append(element, shape);
            } else {
                appendExclusiveGatewayStart(event, element);
            }
        }

        function appendExclusiveGatewayStart(event) {
            const shape = elementFactory.createShape({ type: 'bpmn:ExclusiveGateway' });
            create.start(event, shape, element);
        }
        return {
            'append.demo-end': {
                group: 'model',
                className: 'icon-custom demo-end',
                title: translate('创建End'),
                action: {
                    click: appendEnd,
                    dragstart: appendEndStart
                }
            },
            'append.demo-userTask': {
                group: 'model',
                className: 'icon-custom demo-userTask',
                title: translate('创建UserTask'),
                action: {
                    click: appendUserTask,
                    dragstart: appendUserTaskStart
                }
            },
            'append.demo-exclusiveGateway': {
                group: 'model',
                className: 'icon-custom demo-exclusiveGateway',
                title: translate('创建ExclusiveGateway'),
                action: {
                    click: appendExclusiveGateway,
                    dragstart: appendExclusiveGatewayStart
                }
            }
        };
    }
}

CustomContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
];