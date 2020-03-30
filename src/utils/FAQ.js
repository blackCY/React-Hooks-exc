import React, { useState, useEffect } from "react";

/**
 * 为什么必须在组件的顶层使用 Hook & 在单个组件中使用多个 State Hook 或 Effect Hook，那么 React 怎么知道哪个 state 对应哪个 useState?
 * React 依赖于 Hook 的调用顺序，如果能确保 Hook 在每一次渲染中都按照同样的顺序被调用。那么 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确性
 */
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState("Mary");

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState("Poppins");

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });

  // ...
}

// ------------
// 首次渲染
// ------------
useState("Mary"); // 1. 使用 'Mary' 初始化变量名为 name 的 state
useEffect("persistForm"); // 2. 添加 effect 以保存 form 操作
useState("Poppins"); // 3. 使用 'Poppins' 初始化变量名为 surname 的 state
useEffect("updateTitle"); // 4. 添加 effect 以更新标题
// -------------
// 二次渲染
// -------------
useState("Mary"); // 1. 读取变量名为 name 的 state（参数被忽略）
useEffect("persistForm"); // 2. 替换保存 form 的 effect
useState("Poppins"); // 3. 读取变量名为 surname 的 state（参数被忽略）
useEffect("updateTitle"); // 4. 替换更新标题的 effect
// ...

/**
 * 只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联。但如果我们将一个 Hook (例如 persistForm effect) 调用放到一个条件语句中会发生什么呢?
 */

// 在条件语句中使用 Hook 违反第一条规则
if ("name" !== "") {
  useEffect(function persistForm() {
    localStorage.setItem("formData", "name");
  });
}
// 在第一次渲染中 name !== '' 这个条件值为 true，所以我们会执行这个 Hook。但是下一次渲染时我们可能清空了表单，表达式值变为 false。此时的渲染会跳过该 Hook，Hook 的调用顺序发生了改变：

useState("Mary"); // 1. 读取变量名为 name 的 state(参数被忽略)
// useEffect(persistForm)  // 此 Hook 被忽略！
useState("Poppins"); // 2(之前为 3)。读取变量名为 surname 的 state 失败
useEffect("updateTitle"); //  3 (之前为 4)。替换更新标题的 effect 失败

// React 不知道第二个 useState 的 Hook 应该返回什么。React 会以为在该组件中第二个 Hook 的调用像上次的渲染一样，对应得是 persistForm 的 effect，但并非如此。从这里开始，后面的 Hook 调用都被提前执行，导致 bug 的产生。
// 如果我们想要有条件地执行一个 effect，可以将判断放到 Hook 的_内部_：
useEffect(function persistForm() {
  // 将条件判断放置在 effect 中
  if ("name" !== "") {
    localStorage.setItem("formData", "name");
  }
});

// 在 useEffect 中调用用函数时，要把该函数在 useEffect 中申明，不能放到外部申明，然后再在 useEffect 中调用
// 要记住 effect 外部的函数使用了哪些 props 和 state 很难。这也是为什么 通常你会想要在 effect 内部 去声明它所需要的函数。 这样就能容易的看出那个 effect 依赖了组件作用域中的哪些值
// 只有 当函数（以及它所调用的函数）不引用 props、state 以及由它们衍生而来的值时，你才能放心地把它们从依赖列表中省略

// useEffect 不能接收 async 作为回调函数
// useEffect 接收的函数，要么返回一个能清除副作用的函数，要么就不返回任何内容。而 async 返回的是 promise。

// 不要过度依赖 useMemo
// useMemo 本身也有开销。useMemo 会「记住」一些值，同时在后续 render 时，将依赖数组中的值取出来和上一次记录的值进行比较，如果不相等才会重新执行回调函数，否则直接返回「记住」的值。这个过程本身就会消耗一定的内存和计算资源。因此，过度使用 useMemo 可能会影响程序的性能。
// 在使用 useMemo 前，应该先思考三个问题：
// 传递给 useMemo 的函数开销大不大？ 有些计算开销很大，我们就需要「记住」它的返回值，避免每次 render 都去重新计算。如果你执行的操作开销不大，那么就不需要记住返回值。否则，使用 useMemo 本身的开销就可能超过重新计算这个值的开销。因此，对于一些简单的 JS 运算来说，我们不需要使用 useMemo 来「记住」它的返回值。
// 返回的值是原始值吗？ 如果计算出来的是基本类型的值（string、 boolean 、null、undefined 、number、symbol），那么每次比较都是相等的，下游组件就不会重新渲染；如果计算出来的是复杂类型的值（object、array），哪怕值不变，但是地址会发生变化，导致下游组件重新渲染。所以我们也需要「记住」这个值。
// 在编写自定义 Hook 时，返回值一定要保持引用的一致性。 因为你无法确定外部要如何使用它的返回值。如果返回值被用做其他 Hook 的依赖，并且每次 re-render 时引用不一致（当值相等的情况），就可能会产生 bug。所以如果自定义 Hook 中暴露出来的值是 object、array、函数等，都应该使用 useMemo 。以确保当值相同时，引用不发生变化。
