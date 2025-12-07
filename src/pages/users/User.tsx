// PÁGINA DEL COMPONENTE DEL DETALLE DEL USUARIO
import { Fragment } from "react";
import UserDetail from "../../components/users/UserDetail";
import UIModal from "../../components/ui/UIModal";

export default function User() {
  return (
    <Fragment>
      <UIModal containerProps={{ maxWidth: "lg" }}>
        <UserDetail />
      </UIModal>
    </Fragment>
  );
}
