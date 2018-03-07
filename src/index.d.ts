interface Component {
  render: Function
}

interface VNode {
  nodeName: String | Function,
  props: Object,
  children: Array<VNode>
}