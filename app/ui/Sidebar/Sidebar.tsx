"use client";

import React from "react";
import { styled, type Theme, CSSObject } from "@mui/material/styles";
import {
  Drawer as MuiDrawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  Home as HomeIcon,
  FileCopy as FileCopyIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
} from "@mui/icons-material";
import Link from "next/link";
// import { usePathname } from "next/navigation";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MenuItems = [
  {
    title: "home",
    href: "/dashboard/",
    icon: <HomeIcon />,
  },
  {
    title: "invoices",
    href: "/dashboard/invoices",
    icon: <FileCopyIcon />,
  },
  {
    title: "customers",
    href: "/dashboard/customers",
    icon: <SupervisedUserCircleIcon />,
  },
];

const Sidebar = () => {
  //   const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const onMouseEnter = () => {
    setOpen(true);
  };

  const onMouseLeave = () => {
    setOpen(false);
  };
  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <DrawerHeader />
      <Divider />
      <List>
        {MenuItems.map(({ title, href, icon }) => (
          <Link
            key={title}
            href={href}
            scroll={false}
            // className={pathname === `/dashboard/${title}` ? "active" : ""}
            style={{ textDecoration: "none", color: "MenuText" }}
          >
            <ListItem
              disablePadding
              sx={{
                display: "block",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={title.charAt(0).toUpperCase() + title.slice(1)}
                  sx={{
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
