import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";

/**
 * - React 假设当你多次调用 useState 的时候, 你能保证每次渲染时他们的调用顺序是不变的
 * - 通过在函数组件里调用它来给组件添加一些初始 state, React 会在重复渲染时保留这些 state, 随后的重新渲染完全直接跳过
 * - useState 唯一的参数就是初始 state
 * - useState 会返回一个数组: 一个 state, 一个更新 state 的函数 useState
 * - -- 在初始化渲染期间, 返回的状态(state)与传入的第一个参数(initialState)值相同
 * - -- 你可以在事件处理函数中或其他一些地方调用这个函数, 它类似 class 组件的 this.state, 但是他不会把先新的 state 和旧的 state 合并, 而是直接替换
 */

/**
 * 每次渲染都是独立的闭包
 * - 每一次渲染都有他独立的 state 和 props
 * - 每一次渲染都有它自己的渲染函数
 * - 当点击状态更新的时候, 函数组件会被重新调用, 那么每次渲染都是独立的, 取到的值不会受到后面操作的影响, 如 alert
 */

/**
 * 惰性初始化 state
 * - initialState 参数只会在组件的初始化渲染中起作用, 后续渲染会被忽略
 * - 如果初始 state 需要通过复杂计算获得, 则可以传入一个函数, 在函数中计算并返回初始 state, 此函数只在初始渲染时被调用
 */

/**
 * Object.is
 * - Hook 内部使用 Object.is 来进行新旧 state 是否相等
 * - 与 class 的 setState 不同, 当你修改状态的时候, 如果状态值没有发生改变, 则不会重新渲染, 同时 useState 不会自动合并更新对象, 可以使用 ... 展开运算符来合并, 如 { ...counter, number: counter.number + 1 }
 */

function InitialState(props) {
  function getInitial() {
    return { number: props.num };
  }
  const [counter, setCounter] = useState(getInitial);
  return (
    <>
      <p>{counter.number}</p>
      <button onClick={() => setCounter({ number: counter.number + 1 })}>
        +
      </button>
      <button onClick={() => setCounter(counter)}>setCounter</button>
    </>
  );
}

export default function UseState(props) {
  const [num, setNum] = useState(0);
  function alertNum() {
    setTimeout(() => {
      // alert 只能获取到点击时的状态
      alert(num);
    }, 3000);
  }
  return (
    <>
      <li>
        <Link to="/useState/optimize_1">optimize_1</Link>
      </li>
      <li>
        <Link to="/useState/optimize_2">optimize_2</Link>
      </li>
      <div>
        <p>{num}</p>
        <button onClick={() => setNum(num + 1)}>+</button>
        <button onClick={alertNum}>alertNum</button>
        <InitialState num={num} />
      </div>
      <hr />
      <p>part of children</p>
      {renderRoutes(props.route.routes)}
    </>
  );
}
