import { useRoutes } from "react-router-dom";
import Users from "./pages/users/Users";
import User from "./pages/users/User";

export default function AppRoutes() {
  return useRoutes([
    {
      path: "/users",
      children: [
        {
          path: "",
          element: <Users />,
          children: [
            {
              path: ":id",
              element: <User />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <>404</>,
    },
  ]);
}
