import React, { useState, useMemo, useCallback, memo } from "react";

/**
 * 更深入的优化:
 * - useMemo: useMemo(() => computeExpensiveValue(a, b), [a, b]), useMemo 会在渲染期间执行, 把创建函数和依赖项数组作为参数传入, 返回一个 memoized 值, 它仅会在某个依赖项改变时才重新计算 memoized 值, 这种优化有助于避免在每次渲染时都进行高开销的计算, 如果没有提供依赖项数组, 则每次渲染时都会重新执行而计算新的值
 * - useCallback: 接收一个内联回调函数参数和一个依赖项数组(子组件会用到父组件的状态, 即子组件依赖父组件), useCallback 会返回该回调函数的 memoized 值, 该回调函数仅在某个依赖项改变时才会更新
 */

function SubCounter({ onClick, data }) {
  console.log("SubCounter render");
  return <button onClick={onClick}>{data.num}</button>;
}
SubCounter = memo(SubCounter);

let oldData, oldAddClick;

export default function Optimize_2() {
  console.log("Counter render");
  const [name, setName] = useState("计数器");
  const [num, setNum] = useState(0);
  // 父组件更新时，这里的变量和函数每次都会重新创建，那么子组件接受到的属性每次都会认为是新的
  // 所以子组件也会随之更新，这时候可以用到 useMemo
  // 有没有后面的依赖项数组很重要，否则还是会重新渲染
  // 如果后面的依赖项数组没有值的话，即使父组件的 number 值改变了，子组件也不会去更新
  const data = useMemo(() => ({ num }), [num]);
  // const data = { num };
  console.log("data === oldData ? ", data === oldData);
  oldData = data;

  const addClick = useCallback(() => {
    setNum(num + 1);
  }, [num]);
  console.log("addClick === oldAddClick ? ", addClick === oldAddClick);
  oldAddClick = addClick;

  return (
    <>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <SubCounter data={data} onClick={addClick} />
    </>
  );
}
