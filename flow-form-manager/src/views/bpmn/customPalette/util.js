import cake from './cake.png';

// 自定义元素的类型，此时我们只需要自定义一种节点，所以数组只有一个元素
const customElements = ['bpmn:Task']; 
const customConfig = {
  // 自定义元素的配置
  cake: {
    url: cake,
    attr: {x: 0, y: 0, width: 50, height: 50}
  }
};
 
export {customElements, customConfig};