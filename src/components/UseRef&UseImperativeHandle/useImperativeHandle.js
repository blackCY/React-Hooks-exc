import React, {
  useState,
  useEffect,
  createRef,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";

/**
 * useImperativeHandle 可以让你在使用 ref 时，自定义暴露给父组件的实例值，不能让父组件想干嘛就干嘛
 * 在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用
 * 父组件可以使用操作子组件中的多个 ref
 */

function Child(props, parentRef) {
  // 子组件内部自己创建 ref
  let focusRef = useRef();
  let inputRef = useRef();
  useImperativeHandle(parentRef, () => {
    // 这个函数会返回一个对象
    // 该对象会作为父组件 current 的值
    // 通过这种方式, 父组件可以使用操作子组件的多个 ref
    return {
      focusRef,
      inputRef,
      name: "计数器",
      focus() {
        focusRef.current.focus();
      },
      changeText(text) {
        inputRef.current.value = text;
      }
    };
  });
  return (
    <>
      <input ref={focusRef} />
      <input ref={inputRef} />
    </>
  );
}

Child = forwardRef(Child);

export default function UseImperativeHandle() {
  const parentRef = useRef();
  function getFocus() {
    parentRef.current.focus();
    parentRef.current.changeText("<script>alert(1)</script>");
    console.log(parentRef.current.name);
  }
  return (
    <>
      <hr />
      <Child ref={parentRef} />
      <button onClick={getFocus}>获得焦点</button>
    </>
  );
}
