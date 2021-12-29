import { Home, MyList } from "../pages";

const routeList = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: Home,
    permission: false,
  },
  {
    name: "MyList",
    path: "/my-list",
    exact: true,
    component: MyList,
    permission: false,
  },
];

export default routeList;
