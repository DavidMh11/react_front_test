// COMPONENTE PRINCIPAL PARA VISUALIZAR EL LISTADO DE USUARIOS USANDO DATAGRID
import { useMemo, useState } from "react";
import {
  DataGrid,
  useGridApiRef,
  type GridInitialState,
  type GridDataSource,
  GridGetRowsError,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { esES } from "@mui/x-data-grid/locales";
import type { GridColDef } from "@mui/x-data-grid";
import type { Users } from "./types/types";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import { getUsers } from "../../api/users/user";
import ErrorOverlay from "../error/DataGridError/DataGridError";
import { Box } from "@mui/material";
import { cleanText } from "../../lib/utils";

const pageSizeOptions = [5, 10, 15];

export default function UsersList() {
  // Definimos los estados y/o hooks principales que se utilizarán en el componente
  const apiRef = useGridApiRef();
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  // Usamos GridDataSource para un mejor manejo de la información proveniente de la API, lo cual nos permite realizar un filtrado, agrupación y paginación de manera más sencilla y rápida.
  // REF: https://mui.com/x/react-data-grid/server-side-data/

  // Al realizar todas las acciones mencionadas del lado del cliente no se aprovecha al máximo todas las funciones pero al obtener la información desde una API que permita
  // la paginación, agrupación y filtrado desde el servidor, dicho componente resulta más práctico para obtener la información y usar las acciones mencionadas.
  const dataSource: GridDataSource = useMemo(
    () => ({
      // Definimos la función que obtiene la información de la API, dicha función se ejecuta al acceder al componente, pero además se ejecuta al haber un cambio en la agrupación, filtro o paginación
      // del componente. Se puede acceder a esos valores desde los parámetros de la función para enviarlos a nuestro servidor.

      // Como extra, usamos useMemo para añadir más dependencias en caso de que queramos manejar el filtrado, agrupación y paginación de manera externa.
      getRows: async ({ filterModel: { quickFilterValues }, start, end }) => {
        // Obtenemos los datos de la API
        const data = await getUsers();
        console.log(quickFilterValues);

        // Filtramos y paginamos de acuerdo a los valores proporcionados por el Datagrid.
        const formattedData = data
          .slice(Number(start), end + 1)
          .filter((item) => {
            if (quickFilterValues && quickFilterValues.length > 0)
              return quickFilterValues?.some(
                (value) =>
                  item.username.includes(value) || item.name.includes(value)
              );
            else {
              return true;
            }
          });
        // Retornamos la información formateada para mostrar en el Datagrid.
        return {
          rows: formattedData,
          rowCount: data.length,
        };
      },
    }),
    // Dependencias que pueden activar la función getRows()
    []
  );

  // Definimos un estado inicial para el Datagrid
  const initialState: GridInitialState = useMemo(
    () => ({
      pagination: {
        paginationModel: {
          pageSize: 5,
        },
        rowCount: 0,
      },
    }),
    []
  );

  // Definimos las columnas que vamos a mostrar en el Datagrid de acuerdo a la interfaz del usuario.
  const columns: GridColDef<Users>[] = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 1,
      display: "flex",
      minWidth: 150,
    },
    {
      field: "username",
      headerName: "Usuario",
      flex: 1,
      display: "flex",
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Correo",
      flex: 1,
      display: "flex",
      minWidth: 250,
    },
    {
      headerName: "Acciones",
      field: "activo",
      type: "actions",
      align: "center",
      flex: 1,
      display: "flex",
      minWidth: 150,
      getActions: ({ row }) => {
        const gridActions = [];
        gridActions.push(
          <GridActionsCellItem
            icon={<Visibility color="primary" />}
            onClick={() => getUserById(row.id)}
            label="Ver"
            title="Ver"
          />
        );
        return gridActions;
      },
    },
  ];

  // Definimos una función que usaremos en nuestro componente de error, para realizar una nueva petición para intentar obtener la info en caso de un error de conectividad.
  const reloadUsers = () => {
    setError("");
    apiRef.current?.dataSource.fetchRows();
  };

  const getUserById = (id: number) => {
    navigate(`/users/${id}`);
  };

  return (
    <Box sx={{ minHeight: 400, position: "relative" }}>
      <DataGrid
        apiRef={apiRef}
        initialState={initialState}
        getRowId={(row) => row.id}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSorting
        filterDebounceMs={1000}
        dataSource={dataSource}
        dataSourceCache={null}
        // Esta sección nos devuelve el error en caso de suceder un error dentro del useMemo "dataSource"
        onDataSourceError={(dataSourceError) => {
          if (dataSourceError.cause instanceof AxiosError) {
            setError(dataSourceError.cause.code);
            return;
          }
          if (dataSourceError instanceof GridGetRowsError) {
            setError(dataSourceError.message);
            return;
          }
        }}
        pagination
        pageSizeOptions={pageSizeOptions}
        showToolbar
        localeText={{
          ...esES.components.MuiDataGrid.defaultProps.localeText,
          toolbarColumns: "",
          toolbarFilters: "",
          toolbarDensity: "",
          toolbarExport: "",
          noRowsLabel: "Sin registros",
        }}
        // Aquí sanitizamos el input de búsqueda de manera simple para solamente permitir valores de acuerdo a una regex que solamente envía números y letras, para validar
        // se puede acceder a la consola del navegador para visualizar que solo se envían los valores correctos.
        slotProps={{
          toolbar: {
            quickFilterProps: {
              quickFilterFormatter: (items: unknown[]) =>
                cleanText(items.join("")),
              quickFilterParser: (searchText) =>
                cleanText(searchText)
                  .split(" ")
                  .filter((word) => word !== ""),
            },
          },
        }}
      />
      {/* Componente de error */}
      {error && <ErrorOverlay error={error} onClick={reloadUsers} />}
    </Box>
  );
}
