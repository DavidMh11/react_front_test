// COMPONENTE DE MENÚ PARA LA APLICACIÓN
// NOTA: Usé un componente que ya había utilizado en otra aplicación.
import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  PeopleAlt,
} from "@mui/icons-material";
import PROFILE from "./assets/DavidMH.png";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  CssBaseline,
  Stack,
  useMediaQuery,
} from "@mui/material";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";

const drawerWidth = 200;
const appBarHeight = 64;

const mainMenu = [
  {
    id: 0,
    title: "Usuarios",
    icon: <PeopleAlt fontSize="small" />,
    path: "/users",
  },
];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  height: "auto",
  minHeight: "100dvh",
  width: `calc(${drawerWidth}px - 100%)`,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  backgroundColor: theme.palette.mode === "light" ? "#E6E6E6" : "transparent",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  height: appBarHeight,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.primary.main,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type MenuProps = {
  children?: React.ReactNode;
};

export default function MenuApplication({ children }: MenuProps) {
  const pageIndex = localStorage.getItem("PAGE_INDEX");
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobileSize = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobileSize);
  const [selectedIndex, setSelectedIndex] = useState(
    pageIndex ? Number(pageIndex) : 0
  );

  useEffect(() => {
    if (location) {
      const { pathname } = location;
      const path = pathname.split("/")[1];
      if (path === "perfil") {
        setSelectedIndex(0.1);
        return;
      }
      if (!path) navigate("/users");

      const currentPageIndex = localStorage.getItem("PAGE_INDEX");
      if (currentPageIndex !== String(selectedIndex)) {
        if (isMobileSize) setOpen(false);
        localStorage.setItem("PAGE_INDEX", String(selectedIndex));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, isMobileSize]);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                color: "primary.contrastText",
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <Box component="div">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              sx={{ p: 0 }}
            >
              <Avatar src={PROFILE} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        slotProps={{
          paper: {
            sx: {
              backgroundColor: (theme) =>
                theme.palette.mode === "light" ? "primary.dark" : "",
              color: "primary.contrastText",
            },
          },
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
            boxSizing: "border-box",
            border: "none",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: "primary.contrastText",
            }}
          >
            {theme.direction === "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            maxHeight: 150,
          }}
        >
          <ListItem sx={{ height: "100%" }}>
            <ListItemIcon>
              <Avatar
                variant="circular"
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  width: theme.spacing(5),
                  height: theme.spacing(5),
                }}
              >
                D
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Stack spacing={0}>
                  <Typography variant="caption" component="h6">
                    {"David Mondragon Hernandez"
                      .split(" ")
                      .map((n, i) => (i === 0 ? n : n[0]))
                      .join("")}
                  </Typography>
                </Stack>
              }
            />
          </ListItem>
        </List>
        <List
          //   component="nav"
          sx={{
            height: "100%",
            overflow: "auto",
          }}
        >
          {mainMenu.map((item) => (
            <RouterLink
              key={item.id}
              to={item.path}
              style={{ textDecoration: "none" }}
            >
              <ListItem disablePadding disableGutters>
                <ListItemButton
                  selected={selectedIndex === item.id}
                  onClick={() => handleListItemClick(item.id)}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        theme.palette.mode === "light"
                          ? "primary.contrastText"
                          : "primary.main",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color: "white",
                    }}
                    primary={
                      <Typography variant="subtitle2" component="h6">
                        {item.title}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </RouterLink>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
