import React, { memo, useState } from "react";

/**
 * optimize:
 * - 减少渲染次数
 * - - 默认情况, 只要父组件状态变了, 不管子组件是否依赖父组件的这个状态, 子组件都会重新渲染
 * - - 一般的优化:
 * - - - 类组件: 使用 PureComponent
 * - - - 函数组件: 使用 React.memo, 将函数组件传递给 memo 之后, 就会返回一个新的组件, 新组件的功能是, 如果接受到的属性不变, 则不重新渲染函数, 那怎么保证属性不会变呢? 这里使用 useState, 每次更新都是独立的, useState 每次都会生成一个新的值, 即使这个值没有变化(内部使用 Object.is 进行新旧值比较), 即使使用了 memo, 还也是会重新渲染
 * - - - - 对于 memo, 它还可以传入第二个控制器函数 control, 该控制器函数, 接收一个 props, props 的 state 部分是上一次的 state 值, 这个函数返回一个 boolean, 默认返回 true, 即代表不重新渲染
 */

function SubCounter({ onClick, data }) {
  console.log("SubCounter render");
  return <button onClick={onClick}>{data.num}</button>;
}
SubCounter = memo(SubCounter, props => {
  console.log(props);
  return true;
});
export default function Optimize_1() {
  console.log("Counter render");
  const [name, setName] = useState("计数器");
  const [num, setNum] = useState(0);
  const data = { num };
  const addClick = () => {
    setNum(num + 1);
  };
  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <SubCounter data={data} onClick={addClick} />
    </>
  );
}
