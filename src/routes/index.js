import {
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
} from "../components";

// exact 参数只能配置一个, 一般默认配置跟域名
// 这里的多级路由只能用绝对路径, 不能使用相对路径

export const routes = [
  {
    path: "/useState",
    component: UseState,
    routes: [
      {
        path: "/useState/optimize_1",
        component: Optimize_1
      },
      {
        path: "/useState/optimize_2",
        component: Optimize_2
      }
    ]
  },
  {
    path: "/useReducer",
    component: UseReducer
  },
  {
    path: "/useContext",
    component: UseContext
  },
  {
    path: "/useEffect",
    component: UseEffect
  },
  {
    path: "/useRef",
    component: UseRef,
    routes: [
      {
        path: "/useRef/forwardRef",
        component: ForwardRef
      },
      {
        path: "/useRef/useImperativeHandle",
        component: UseImperativeHandle
      }
    ]
  },
  {
    path: "/customhook",
    component: CustomHook
  }
];
