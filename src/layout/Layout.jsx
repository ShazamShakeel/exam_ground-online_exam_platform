import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import Settings from "@mui/icons-material/Settings";
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import StudentSidebarListItems from "utils/constants/StudentSidebarListItems";
import TeacherSidebarListItems from "utils/constants/TeacherSidebarListItems";

const drawerWidth = 270;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [listItems] = useState(
    localStorage.getItem("userRole") === "teacher"
      ? TeacherSidebarListItems
      : StudentSidebarListItems
  );

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    isSmall && setIsOpen(false);
  }, [isSmall]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={isOpen}
        elevation={1}
        sx={{
          backgroundColor: "background.default",
          "& .MuiToolbar-root": {
            px: "1rem",
          },
        }}
      >
        <Toolbar sx={{ backgroundColor: "#fff" }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            sx={{
              marginRight: 2,
              ...(isOpen && { display: "none" }),
            }}
            onClick={handleDrawerOpen}
            size="large"
            color="primary.main"
          >
            <MenuIcon />
          </IconButton>
          <Box ml="auto" hidden={isOpen && isSmall}>
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  margin: "0 12px 0 12px",
                }}
              >
                <Avatar
                  alt="Demo"
                  src="/static/images/avatar/1.jpg"
                  sizes="small"
                >
                  EG
                </Avatar>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Exam Ground
                </Typography>
              </Box>
              <Box>
                <Select
                  IconComponent={ExpandMoreIcon}
                  sx={{
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    backgroundColor: "#fff",
                  }}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        <DrawerHeader>
          <img
            src={require("assets/images/SidebarLogo.png")}
            alt="logo"
            height="auto"
            width="125px"
          />
          <IconButton onClick={handleDrawerClose} sx={{ ml: "auto" }}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box
          sx={{
            flexGrow: "1",
            overflowY: "auto",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: 5,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "white",
              borderRadius: 2,
            },
          }}
        >
          <List>
            {listItems.map((route) => (
              <ListItem key={route?.path} disablePadding>
                <ListItemButton to={route?.path} component={NavLink}>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight="bold">
                        {route.title}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton to="/settings" component={NavLink}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight="bold">
                      Settings
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Main open={isOpen}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
