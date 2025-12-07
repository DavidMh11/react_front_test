import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserDetail from "../UserDetail";
import * as userApi from "../../../api/users/user";

const mockUser = {
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
};

const renderRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter initialEntries={["/users/1"]}>
      <Routes>
        <Route path="/users/:id" element={component} />
      </Routes>
    </MemoryRouter>
  );
};

describe("UserDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("muestra todos los datos del usuario correctamente", async () => {
    vi.spyOn(userApi, "getUserById").mockResolvedValue(mockUser);

    renderRouter(<UserDetail />);

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeDefined();
      expect(screen.getByText("Sincere@april.biz")).toBeDefined();
      expect(screen.getByText("1-770-736-8031 x56442")).toBeDefined();
      expect(screen.getByText("Romaguera-Crona")).toBeDefined();
    });
  });

  test("muestra mensaje de error cuando la API falla", async () => {
    vi.spyOn(userApi, "getUserById").mockRejectedValue(
      new Error("Error en la API")
    );

    renderRouter(<UserDetail />);

    await waitFor(
      () => {
        expect(screen.getByText(/error|fallo/i)).toBeDefined();
      },
      { timeout: 3000 }
    );
  });
});
