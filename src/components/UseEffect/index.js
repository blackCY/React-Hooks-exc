import React, { useState, useEffect } from "react";

/**
 * 副作用操作可以分两类：需要清除的和不需要清除的
 * :useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API
 * :useEffect 会在每次渲染后都执行吗? 是的，默认情况下，它在第一次渲染之后和每次更新之后都会执行
 * :React 保证了每次运行 effect 的同时，DOM 都已经更新完毕
 * :通过跳过 Effect 进行性能优化: useState 会记住最后一次更新的值, 但是 useEffect 每次渲染后都执行清理或者执行 effect 都会可能会导致性能问题, 在 useEffect 的 Hook API 中。如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只需要传递数组作为 useEffect 的第二个可选参数即可, 当这个参数为 useState 设置的值时, 如果这个值在两次渲染时没有发生变化(这个变化由 React 进行比较), 则 React 会跳过 effect, 可以实现性能优化; 如果想执行只运行一次的 effect(仅在组件挂载和卸载时执行), 可以传递一个空数组([])作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行
 * 与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快, 他会在浏览器绘制后延迟执行, 而且会保证在任何新的渲染前执行, 这使得 React 在组件更新前都会刷新上一轮的 effect
 * :大多数情况下，effect 不需要同步地执行
 * React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect，因此会使得额外操作很方便
 * :useEffect 内部可以返回一个清除函数, 它相当于是组件被卸载的 componentWillUnmount, 会在卸载之前执行, 可以防止内存泄漏
 * :如果组件多次渲染, 则在下一个 effect 之前, 上一个 effect 就已经被清除, 这是由于 effect 的调用顺序规则而来的
 * 与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 useLayoutEffect Hook 供你使用，其 API 与 useEffect 相同
 */

// useEffect 在执行副作用函数之前，会先调用上一次返回的函数
export default function UseEffect() {
  const [num, setNum] = useState(0);
  const [text, setText] = useState("");
  useEffect(() => {
    // document.title = `你点击了${num}次`;
    console.log("useEffect");
    let $timer = setTimeout(() => {
      setNum(number => number + 1);
    }, 1000);
    return () => {
      clearInterval($timer);
    };
  }, [text]);
  return (
    <>
      <p>{num}</p>
      <button onClick={() => setNum(num + 1)}>+</button>
      <input value={text} onChange={e => setText(e.target.value)} />
    </>
  );
}
