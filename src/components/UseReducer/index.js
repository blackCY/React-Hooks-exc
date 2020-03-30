import React, { useReducer } from "react";

/**
 * useReducer 和 redux 中 reducer 很像, useState 内部就是靠 useReducer 来实现的, useReducer 可以是 useState 的替代方案
 * useReducer 接收一个形如 (state, action) => newState 的 reducer, 并返回当前的 state 以及配套的 dispatch
 * 如果 Reducer Hook 的返回值与当前 state, 则将跳过子组件的渲染以及副作用的执行
 * 你可以选择惰性地创建初始 state。为此，需要将 init 函数作为 useReducer 的第三个参数传入，这样初始 state 将被设置为 init(initialArg)。这么做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利
 * 在某些场景下, useReducer 比 useState 更适用, 例如 state 逻辑复杂且包含多个子值, 或者下一个 state 依赖于之前的 state 等
 */
// 如果你希望初始状态是一个{number:0}
// 可以在第三个参数中传递一个这样的函数 ()=>({number:initialState})
// 这个函数是一个惰性初始化函数，可以用来进行复杂的计算，然后返回最终的 initialState

const initialState = 0;
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { num: state.num + 1 };
    case "decrement":
      return { num: state.num - 1 };
    default:
      throw new Error();
  }
}
function init(initialState) {
  return { num: initialState };
}

export default function UseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  return (
    <>
      Count: {state.num}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}
