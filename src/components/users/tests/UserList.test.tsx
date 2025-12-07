import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UsersList from "../UsersList";
import * as userApi from "../../../api/users/user";

// Mock de MUI X DataGrid - DEBE ESTAR AL INICIO
vi.mock("@mui/x-data-grid", async () => {
  const actual = await vi.importActual("@mui/x-data-grid");
  return actual;
});

// Ahora define las variables después del mock
const theme = createTheme();

const mockUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
];

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe("UsersList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("muestra la lista de usuarios correctamente desde la API", async () => {
    vi.spyOn(userApi, "getUsers").mockResolvedValue(mockUsers);

    renderWithProviders(<UsersList />);

    await waitFor(
      () => {
        expect(screen.getByText(/Leanne Graham/i)).toBeDefined();
        expect(screen.getByText(/Ervin Howell/i)).toBeDefined();
        expect(screen.getByText(/Sincere@april.biz/i)).toBeDefined();
        expect(screen.getByText(/Shanna@melissa.tv/i)).toBeDefined();
      },
      { timeout: 5000 }
    );
  });

  test("muestra mensaje de error cuando la API falla", async () => {
    const errorMessage = "Error al cargar usuarios";
    vi.spyOn(userApi, "getUsers").mockRejectedValue(new Error(errorMessage));

    renderWithProviders(<UsersList />);

    await waitFor(
      () => {
        expect(screen.queryByText(/error/i)).toBeDefined();
      },
      { timeout: 5000 }
    );
  });
});
