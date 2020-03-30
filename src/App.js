import React, { Suspense } from "react";
import { NavLink as Link } from "react-router-dom";
import { routes } from "./routes";
import { matchRoutes, renderRoutes } from "react-router-config";
/**
 * Hooks
 * React 一直都提倡使用函数组件, 但是有时候需要使用 state 或者其他的一些功能时, 只能使用类组件, 因为函数组件没有实例, 没有生命周期函数, 只有类组件才有
 * Hooks 是 React 16.8 新增的特性, 它可以让你在不编写类组件的情况下使用 state 以及其他的一些特性
 * 如果你在编写函数组件并意识到需要向其添加一些 state, 以前的做法是必须将其转换为 class, 现在你可以直接在现有的函数组件中使用 Hooks
 * 凡是 use 开头的都是 Hooks
 */

/**
 * Hooks 解决的问题
 * 1.类组件的不足
 *   1.状态逻辑难复用: 在组件之间复用逻辑很难, 可能要用到 render props(渲染属性) 或者 HOC, 但是无论是渲染属性, 还是 HOC, 都会在原先的组件外包裹一层父容器 div, 导致层级冗余
 *   2.趋向复杂难以维护:
 *     1.在生命周期函数中混杂不相干的逻辑(如在 componentDidMount 中注册事件以及其他逻辑, 在 componentWillUnmount 中卸载事件, 这样不分散的写法, 很容易写出 bug)
 *     2.类组件到处都是对状态的访问和处理, 导致组件很难拆分成更小的组件
 *   3.this 指向问题: 父组件给子组件传递函数时, 必须绑定 this
 *     第一种是在构造函数中绑定 this：那么每次父组件刷新的时候，如果传递给子组件其他的 props 值不变，那么子组件就不会刷新；
 *     第二种是在 render() 函数里面绑定 this：因为 bind 函数会返回一个新的函数，所以每次父组件刷新时，都会重新生成一个函数，即使父组件传递给子组件其他的 props 值不变，子组件每次都会刷新
 *     第三种是使用箭头函数：父组件刷新的时候，即使两个箭头函数的函数体是一样的，都会生成一个新的箭头函数，所以子组件每次都会刷新；
 *     第四种是使用类的静态属性：原理和第一种方法差不多，比第一种更简洁
 * 2. Hooks 的优势
 *   1.能优化类组件的三大问题
 *   2.能在无需修改组件结构的状态下复用逻辑(自定义 Hooks)
 *   3.能将组件中相互关联的部分拆分成更小的函数(比如设置订阅或者请求数据)
 *   4.副作用的关注点分离: 副作用指那些没有发生在数据向视图转换过程中的逻辑，如 ajax 请求、访问原生dom 元素、本地持久化缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志等。以往这些副作用都是写在类组件生命周期函数中的, 而 useEffect 在全部渲染完毕后才会执行, useLayoutEffect 会在浏览器 layout 之后, painting 之前执行
 */

/**
 * 注意事项:
 * 1.只能在函数内部的最外层调用 Hook, 不要在循环 or 判断条件中 or 子函数中调用
 * 2.只能在 React 的函数组件中调用 Hook, 不要在其他 JS 函数中调用
 */

function Lazy() {
  return <>lazy...</>;
}

// matchRoutes 返回一个匹配的路由数组, 数组的每一项都包含两个属性: routes 和 match, match 代表匹配到的路由的信息, routes 代表自定义配置路由数组的信息
// matchRoutes(routes, pathname)
const branch = matchRoutes(routes, "/useState");
branch.map(({ route, match }) => {
  // console.log(route, match);
});

function App() {
  return (
    <>
      <li>
        <Link to="/useState">useState</Link>
      </li>
      <li>
        <Link to="/useReducer">useReducer</Link>
      </li>
      <li>
        <Link to="/useContext">useContext</Link>
      </li>
      <li>
        <Link to="/useEffect">useEffect</Link>
      </li>
      <li>
        <Link to="/useRef">useRef</Link>
      </li>
      <li>
        <Link to="/customHook">customHook</Link>
      </li>
      <Suspense fallback={<Lazy />}>
        {renderRoutes(routes)}
        {/* <Switch>
          <Route path="/" exact render={() => <>Index Page</>} />
          {routes.map(routes => {
            return (
              <Route
                key={routes.path}
                exact={!!routes.exact}
                path={routes.path}
                render={routeProps => <routes.component {...routeProps} />};
              />
            );
          })}
          <Route render={() => <>404...</>} />
        </Switch> */}
      </Suspense>
    </>
  );
}

export default App;
