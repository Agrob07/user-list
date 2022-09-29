import Clients from "../pages/Clients";
import Home from "../pages/Home";
import Users from "../pages/Users";

export const router = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/clients",
    element: <Clients />,
  },
];
