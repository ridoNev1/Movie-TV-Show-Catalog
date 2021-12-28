import { Home } from "../pages";

const routeList = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: <Home />,
    permission: false,
  },
];

export default routeList;
