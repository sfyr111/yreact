interface IComponent {
  render: Function,
  setState: Function,
  __rendered?: HTMLElement | IComponent
}

interface VNode {
  nodeName: String | IComponent,
  props: Object,
  children: Array<VNode | string>
}

interface IProps {
  children?: any[]
}