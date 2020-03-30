import { lazy } from "react";

const UseState = lazy(() => import("./UseState"));
const Optimize_1 = lazy(() => import("./UseState/Optimize_1"));
const Optimize_2 = lazy(() => import("./UseState/Optimize_2"));
const UseReducer = lazy(() => import("./UseReducer"));
const UseContext = lazy(() => import("./UseContext"));
const UseEffect = lazy(() => import("./UseEffect"));
const UseRef = lazy(() => import("./UseRef&UseImperativeHandle"));
const ForwardRef = lazy(() => import("./UseRef&UseImperativeHandle/forwardRef"));
const UseImperativeHandle = lazy(() => import("./UseRef&UseImperativeHandle/useImperativeHandle"));
const CustomHook = lazy(() => import("./CustomHook"));

export {
  UseState,
  Optimize_1,
  Optimize_2,
  UseReducer,
  UseContext,
  UseEffect,
  UseRef,
  ForwardRef,
  UseImperativeHandle,
  CustomHook
};
