// TEMA PRINCIPAL DE LA APLICACIÓN
// NOTA: Usé un tema personalizado que ya había usado en otra aplicación, por esa razón la función recibe el modo "light" o "dark" para el cambio de modo a pesar de no existir un botón que cambié entre modos.
// OPCIONAL: Se puede cambiar el modo manualmente editando el valor "mode" para visualizar como se vería la app en modo oscuro
import { createTheme } from "@mui/material/styles";
import { esES } from '@mui/material/locale';

export const globalTheme = (mode: "light" | "dark") =>
    createTheme({
        palette: {
            mode,
            primary: {
                light: "#3A0088",
                dark: "#240055",
                main: "#6500EE",
            },
            secondary: {
                main: "#2F3133",
                light: "#434547",
                dark: "#212121",
            },
            error: {
                main: "#ff3434",
                light: "#ff6464",
                dark: "#c70e0e",
                contrastText: "#FFFFFF"
            },
            warning: {
                main: "#d9a327",
                light: "#ddb132",
                dark: "#8e581a",
                contrastText: "#FFFFFF"
            },
            info: {
                main: "#25a7d2",
                light: "#4cbee4",
                dark: "#146c90",
                contrastText: "#FFFFFF"
            },
            success: {
                main: "#23c446",
                light: "#4bdd6a",
                dark: "#167f2d",
                contrastText: "#FFFFFF"
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (theme) => ({
                    "*::-webkit-scrollbar": {
                        width: 5,
                        height: 5,
                    },
                    "*::-webkit-scrollbar-track": {
                        WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                    },
                    "*::-webkit-scrollbar-thumb": {
                        WebkitBoxShadow: `inset 0 0 50rem ${theme.palette.primary.main}`,
                    },
                }),
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        fontSize: 11
                    }
                }
            },
            MuiTextField: {
                defaultProps: {
                    autoComplete: "one-time-code",
                    size: "small",
                },
            },
            MuiContainer: {
                styleOverrides: {
                    root: {
                        backgroundColor: "transparent",
                    },
                },
            },
            MuiModal: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                        margin: "auto",
                        width: "100%",
                        paddingLeft: 20,
                        paddingRight: 20,
                        [theme.breakpoints.up("md")]: {
                            paddingLeft: 150,
                            paddingRight: 150,
                        },
                        paddingTop: 20,
                        paddingBottom: 20,
                        outline: "none",
                    }),
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        ":hover": {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,

                            ".MuiListItemIcon-root": {
                                color: theme.palette.primary.contrastText,
                            },
                        },
                        "&.Mui-selected": {
                            "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                            },
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,

                            ".MuiListItemIcon-root": {
                                color: theme.palette.primary.contrastText,
                            },
                        },
                        borderRadius: theme.spacing(0.8),
                        marginLeft: theme.spacing(0.5),
                        marginRight: theme.spacing(0.5),
                        marginTop: theme.spacing(0.5),
                        marginBottom: theme.spacing(0.5),
                        paddingLeft: theme.spacing(1),
                        paddingRight: theme.spacing(1),
                        paddingTop: theme.spacing(0.2),
                        paddingBottom: theme.spacing(0.2),
                    }),
                },
            }
        },
    }, esES);