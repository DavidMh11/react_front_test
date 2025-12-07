// COMPONENTE PARA MANEJAR LOS ERRORES QUE APAREZCAN AL USAR AL USAR DATAGRID DE MUI
import {
  alpha,
  Button,
  darken,
  lighten,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Cached from "@mui/icons-material/Cached";

// Definimos un estilo predeterminado para el contenedor para que se ajuste a la posición del Datagri
const StyledDiv = styled("div")(({ theme: t }) => ({
  position: "absolute",
  zIndex: 10,
  fontSize: "0.875em",
  bottom: 0,
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  border: `1px solid ${lighten(alpha(t.palette.divider, 1), 0.88)}`,
  backgroundColor: t.palette.background.default,
  ...t.applyStyles("dark", {
    borderColor: darken(alpha(t.palette.divider, 1), 0.68),
  }),
}));

// El componente puede recibir una función cualquiera, por ejemplo, para realizar una nueva petición (en caso de ser un error de red) o para navegación
type Props = {
  error: string;
  onClick?: () => void;
};

export default function ErrorOverlay({ error, onClick }: Props) {
  if (!error) {
    return null;
  }
  return (
    <StyledDiv>
      <Stack
        direction="column"
        spacing={0.5}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" component="span">
          {error}
        </Typography>
         {onClick && (
          <Button
            variant="contained"
            onClick={onClick}
            startIcon={<Cached />}
          >
            Recargar
          </Button>
        )}
      </Stack>
    </StyledDiv>
  );
}
