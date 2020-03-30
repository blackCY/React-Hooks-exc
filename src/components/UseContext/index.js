import React, {
  useReducer,
  createContext,
  useContext
} from "react";

/**
 * useContext
 * - 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
 * - 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定
 * - 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值
 * - useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>
 * - useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context
 * - 即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染
 */

const initialState = 0;
function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      return { num: state.num + 1 };
    default:
      break;
  }
}

const CounterContext = createContext();
// 第一种获取 counterContex 方法, 不使用 hook
function SubCounter_one() {
  return (
    <CounterContext.Consumer>
      {value => (
        <>
          <p>{value.state.num}</p>
          <button onClick={() => value.dispatch({ type: "ADD" })}>+</button>
        </>
      )}
    </CounterContext.Consumer>
  );
}
// 第二种获取 counterContext 方法, 使用 hook, 简洁
function SubCounter() {
  const { state, dispatch } = useContext(CounterContext);
  return (
    <>
      <p>{state.num}</p>
      <button onClick={() => dispatch({ type: "ADD" })}>+</button>
    </>
  );
}

export default function UseContext() {
  const [state, dispatch] = useReducer(reducer, initialState, () => ({
    num: initialState
  }));
  return (
    <>
      <CounterContext.Provider value={{ state, dispatch }}>
        <SubCounter />
      </CounterContext.Provider>
    </>
  );
}
