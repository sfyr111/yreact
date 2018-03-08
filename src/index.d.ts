interface IComponent {
  render: Function
}

interface VNode {
  nodeName: String | IComponent,
  props: Object,
  children: Array<VNode | string>
}

interface IProps {
  children?: any[]
}