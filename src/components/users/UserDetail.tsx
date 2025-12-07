// COMPONENTE PRINCIPAL PARA VISUALIZAR EL DETALLE DE LOS USUARIOS
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Apartment from "@mui/icons-material/Apartment";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Email from "@mui/icons-material/Email";
import LocationPin from "@mui/icons-material/LocationPin";
import People from "@mui/icons-material/People";
import Phone from "@mui/icons-material/Phone";
import Web from "@mui/icons-material/Web";
import type { Users } from "./types/types";
import { getUserById } from "../../api/users/user";

export default function UserDetail() {
  // Definimos los estados y/o hooks principales que se utilizarán en el componente
  const { id: ID } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [values, setValues] = useState<Users>({
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });
  const {
    name,
    username,
    email,
    address: { street, suite, city, zipcode },
    phone,
    website,
    company: { name: companyName, catchPhrase },
  } = values;

  // useEffect para realizar la petición a la API
  // NOTA: Se puede utilizar un hook personalizado para realizar la petición fuera del componente y mantener el componente más limpio.
  useEffect(() => {
    const obtenerRegistro = async () => {
      try {
        const res = await getUserById(ID as string | number);
        setValues(res);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Hubo un error al obtener el usuario.");
      }
    };
    if (ID) obtenerRegistro();
  }, [ID]);

  const goBack = () => {
    navigate("/users");
  };

  return (
    <Card elevation={5}>
      <CardContent sx={{ p: 5 }}>
        {error && <>{error}</>}
        {isLoading ? (
          <>...Cargando...</>
        ) : (
          <Stack spacing={2} direction={"column"} justifyContent={"center"}>
            <Stack
              spacing={1}
              direction={"column"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              bgcolor={"#e4e4e4ff"}
              borderRadius={1}
              p={2}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: { xs: 40, sm: 60 },
                  height: { xs: 40, sm: 60 },
                }}
              >
                {name.slice(0, 2)}
              </Avatar>
              <Typography component="p" variant="h5" fontWeight={600}>
                {name}
              </Typography>
              <Typography component="p" variant="subtitle2">
                @{username}
              </Typography>
            </Stack>
            <Stack
              spacing={1}
              direction={"column"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Typography component="p" variant="h6" sx={{ color: "#646464" }}>
                Contacto
              </Typography>
              <Typography component="p" variant="subtitle2" display={"flex"}>
                <Email fontSize="small" sx={{ mr: 1, color: "#646464" }} />
                {email}
              </Typography>
              <Typography component="p" variant="subtitle2" display={"flex"}>
                <Phone fontSize="small" sx={{ mr: 1, color: "#646464" }} />
                {phone}
              </Typography>
              <Typography component="p" variant="subtitle2" display={"flex"}>
                <Web fontSize="small" sx={{ mr: 1, color: "#646464" }} />
                {website}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              spacing={1}
              direction={"column"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Typography component="p" variant="h6" sx={{ color: "#646464" }}>
                Ubicación
              </Typography>
              <Typography component="p" variant="subtitle2" display={"flex"}>
                <LocationPin
                  fontSize="small"
                  sx={{ mr: 1, color: "#646464" }}
                />
                {suite}, {street} - {city}, {zipcode}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              spacing={1}
              direction={"column"}
              display={"flex"}
              justifyContent={"center"}
            >
              <Typography component="p" variant="h6" sx={{ color: "#646464" }}>
                Compañia
              </Typography>
              <Typography component="p" variant="subtitle2" display={"flex"}>
                <Apartment fontSize="small" sx={{ mr: 1, color: "#646464" }} />
                {companyName}
              </Typography>
              <Typography component="p" variant="subtitle2" display={"flex"}>
                <People fontSize="small" sx={{ mr: 1, color: "#646464" }} />
                {catchPhrase}
              </Typography>
            </Stack>
          </Stack>
        )}
        <Box
          component="footer"
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Stack
            spacing={2}
            direction={{ xs: "column-reverse", sm: "row" }}
            justifyContent="end"
            sx={{ width: "100%", mt: 2 }}
          >
            <Button
              sx={{ width: { xs: "100%", sm: "auto" } }}
              type="button"
              size="medium"
              variant="contained"
              color="secondary"
              onClick={goBack}
              startIcon={<ChevronLeft />}
            >
              Regresar
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
