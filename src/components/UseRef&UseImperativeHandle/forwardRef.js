import React, { forwardRef, useState, useRef } from "react";

/**
 * 因为函数组件没有实例, 所以不能够像类组件一样接收 ref 属性, 即 <Child ref={xxx} /> 这样是不行的
 * 在使用类组件的时候，创建 ref 返回一个对象，该对象的 current 属性值为空
 * 只有当它被赋给某个元素的 ref 属性时，才会有值
 * 所以父组件(类组件)创建一个 ref 对象，然后传递给子组件(类组件)，子组件内部有元素使用了
 * 那么父组件就可以操作子组件中的某个元素
 * 但是函数组件无法接收 ref 属性 <Child ref={xxx} /> 这样是不行的
 * 所以就需要用到 forwardRef 进行转发
 * - forwardRef 可以在父组件中操作子组件的 ref 对象
 * - forwardRef 可以将父组件中的 ref 对象转发到子组件中的 dom 元素上
 * - 子组件接受 props 和 ref 作为参数
 */

function Child(props, ref) {
  return (
    <>
      <input ref={ref} />
    </>
  );
}

// 转发
Child = forwardRef(Child);

export default function ForwardRef() {
  const [num, setNum] = useState(0);
  const inputRef = useRef();
  function getFocus() {
    inputRef.current.value = "focus";
    inputRef.current.focus();
  }
  return (
    <>
      <Child ref={inputRef} />
      {num}
      <button onClick={() => setNum(num + 1)}>+</button>
      <button onClick={getFocus}>获得焦点</button>
    </>
  );
}
