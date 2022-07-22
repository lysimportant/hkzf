import { FC, lazy, memo } from "react";
import type { LazyExoticComponent } from "react";
import type { RouteObject } from "react-router-dom";
interface Routes<T = any> extends Omit<RouteObject, "element" | "children"> {
  component: LazyExoticComponent<FC<T>>;
  children?: Routes[];
}

const rotues: Routes[] = [
  {
    path: "/",
    component: lazy(() => import("../pages/Home"))
  },
  {
    path: "/home",
    component: lazy(() => import("../pages/Home")),
    children: [
      {
        path: "/home",
        component: lazy(() => import("@/pages/Home/Child/Index"))
      },
      {
        path: "/home/list",
        component: lazy(() => import("@/pages/Home/Child/HouseList"))
      },
      {
        path: "/home/news",
        component: lazy(() => import("@/pages/Home/Child/News"))
      },
      {
        path: "/home/profile",
        component: lazy(() => import("@/pages/Home/Child/Profile"))
      }
    ]
  },
  {
    path: "/citylist",
    component: lazy(() => import("../pages/CityList"))
  },
  {
    path: "/search",
    component: lazy(() => import("../pages/Search"))
  },
  {
    path: "/map",
    component: lazy(() => import("../pages/Map"))
  }
];

function withRoute(routes: Routes[]): RouteObject[] {
  const result: RouteObject[] = [];
  routes.forEach(route => {
    const { component: Comp, children, ...rest } = route;
    const route_ = {
      ...rest,
      element: <Comp />,
      ...(Array.isArray(children) &&
        children.length > 0 && { children: withRoute(children) })
    };
    result.push(route_);
  });
  return result;
}

const router = withRoute(rotues);
export default router;
