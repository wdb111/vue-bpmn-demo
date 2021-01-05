export const xml_start_id= function (){
  let str = Math.random().toString(16).substr(-7);
  return `
  <?xml version="1.0" encoding="UTF-8"?>
  <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
    <bpmn:process id="Process_1" isExecutable="true">
      <bpmn:startEvent id="StartEvent_${str}">
        <bpmn:documentation></bpmn:documentation>
        <bpmn:extensionElements />
      </bpmn:startEvent>
    </bpmn:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
        <bpmndi:BPMNShape id="StartEvent_${str}_di" bpmnElement="StartEvent_${str}">
          <dc:Bounds x="315" y="225" width="50" height="50" />
        </bpmndi:BPMNShape>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </bpmn:definitions>
  `
} 