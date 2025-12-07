// COMPONENTE PARA MANEJAR LA VENTANA MODAL PARA LOS DETALLES DE MANERA GLOBAL
import React from "react";
import {
  Container,
  Modal,
  type ModalProps,
  type ContainerProps,
} from "@mui/material";

type Props = {
  modalProps?: ModalProps;
  containerProps?: ContainerProps;
  children?: React.ReactNode;
};

export default function UIModal({
  modalProps,
  containerProps,
  children,
}: Props) {
  return (
    <Modal open disableEscapeKeyDown {...modalProps}>
      <Container
        component="div"
        sx={{
          overflow: "auto",
          height: "100%",
          width: "100%",
          p: { xs: 2, sm: 5 },
        }}
        disableGutters
        {...containerProps}
      >
        {children}
      </Container>
    </Modal>
  );
}
