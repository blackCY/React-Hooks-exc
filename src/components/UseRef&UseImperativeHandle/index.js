import React, { useState, useRef } from "react";
import { NavLink as Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";

/**
 * :const refContainer = useRef(initialValue);
 * :useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数(initialValue), 返回的 ref 对象在组件的整个生命周期内保持不变
 * :useRef() 比 ref 属性更有用。它可以很方便地保存任何可变值，其类似于在 class 中使用实例字段的方式
 * :本质上，useRef 就像是可以在其 .current 属性中保存一个可变值的"盒子"
 * useRef 返回的 ref 对象在组件的整个生命周期内保持不变，也就是说每次重新渲染函数组件时，返回的ref 对象都是同一个(使用 React.createRef ，每次重新渲染组件都会重新创建 ref)
 */

let input;
function Child() {
  const inputRef = useRef();
  console.log("input===inputRef ? ", input === inputRef);
  input = inputRef;
  function getFocus() {
    inputRef.current.focus();
  }
  return (
    <>
      <input ref={inputRef} />
      <button onClick={getFocus}>获得焦点</button>
    </>
  );
}

export default function UseRefUseImperativeHandle(props) {
  let [num, setNum] = useState(0);
  return (
    <>
      <li>
        <Link to="/useRef/forwardRef">ForwardRef</Link>
      </li>
      <li>
        <Link to="/useRef/useImperativeHandle">useImperativeHandle</Link>
      </li>
      <Child />
      {num}
      <button onClick={() => setNum(num + 1)}>+</button>
      {renderRoutes(props.route.routes)}
    </>
  );
}
