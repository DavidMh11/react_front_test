// PÁGINA DEL COMPONENTE DEL LISTADO DE USUARIOS
import { Fragment } from "react";
import UsersList from "../../components/users/UsersList";
import { Outlet } from "react-router-dom";

export default function Users() {
  return (
    <Fragment>
      <UsersList />
      <Outlet />
    </Fragment>
  );
}
