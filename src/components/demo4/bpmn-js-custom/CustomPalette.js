export default class CustomPalette {
  constructor(create, elementFactory, palette, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const {
      create,
      elementFactory,
      translate
    } = this;

    function createServiceTask(event) {
      const shape = elementFactory.createShape({ type: 'bpmn:UserTask' });

      create.start(event, shape);
    }

    return {
      'create.user-task': {
        group: 'activity',
        className: 'bpmn-icon-user-task',
        title: translate('创建用户任务'),
        action: {
          dragstart: createServiceTask,
          click: createServiceTask
        }
      },
    }
  }
}

CustomPalette.$inject = [
  'create',
  'elementFactory',
  'palette',
  'translate'
];