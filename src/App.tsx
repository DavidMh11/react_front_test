// COMPONENTE PRINCIPAL DE LA APLICACIÓN
import { useMemo } from "react";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { globalTheme } from "./themes/theme";
import MenuApplication from "./MenuApplication";
import AppRoutes from "./Routes";

function App() {
  const theme = useMemo(() => globalTheme("light"), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        id="app"
        component="main"
        fixed
        disableGutters
        sx={{
          margin: 0,
          minWidth: "100%",
          height: "100dvh",
          overflow: "auto",
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? "white" : "#292929",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={
                <MenuApplication>
                  <AppRoutes />
                </MenuApplication>
              }
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
