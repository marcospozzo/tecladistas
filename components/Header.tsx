"use client";

import {
  INSTRUMENTS,
  LOGIN,
  LOGOUT,
  PICTURES,
  PROFESSIONALS,
  STUDIOS,
  URL_SHORT,
} from "@/utils/constants";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Page } from "@/types";
import { useState } from "react";

const pages: Page[] = [
  { title: INSTRUMENTS, path: "/instrumentos" },
  { title: PROFESSIONALS, path: "/profesionales" },
  { title: STUDIOS, path: "/estudios" },
];

const settings: Page[] = [
  {
    title: LOGOUT,
    path: "/api/auth/signout",
  },
];

const Header = () => {
  const pathname = usePathname();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElSubMenu, setAnchorElSubMenu] = useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenSubMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSubMenu(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setAnchorElSubMenu(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {URL_SHORT}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <div key={page.title}>
                  <Link href={page.path} passHref>
                    <MenuItem
                      onClick={
                        page.subpages ? handleOpenSubMenu : handleCloseNavMenu
                      }
                    >
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </Link>
                  {page.subpages && (
                    <Menu
                      sx={{ mt: "45px" }}
                      anchorEl={anchorElSubMenu}
                      anchorOrigin={{ vertical: "top", horizontal: "left" }}
                      keepMounted
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                      open={Boolean(anchorElSubMenu)}
                      onClose={handleCloseNavMenu}
                    >
                      {page.subpages.map((subpage) => (
                        <MenuItem
                          key={subpage.title}
                          onClick={handleCloseNavMenu}
                        >
                          <Link href={subpage.path}>
                            <Typography textAlign="center">
                              {subpage.title}
                            </Typography>
                          </Link>
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </div>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {URL_SHORT}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Box key={page.title}>
                {page.subpages ? (
                  <>
                    <Button
                      onClick={handleOpenSubMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.title}
                    </Button>
                    <Menu
                      sx={{ mt: "45px" }}
                      anchorEl={anchorElSubMenu}
                      anchorOrigin={{ vertical: "top", horizontal: "left" }}
                      keepMounted
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                      open={Boolean(anchorElSubMenu)}
                      onClose={handleCloseNavMenu}
                    >
                      {page.subpages.map((subpage) => (
                        <Link key={subpage.title} href={subpage.path} passHref>
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                              {subpage.title}
                            </Typography>
                          </MenuItem>
                        </Link>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Link key={page.title} href={page.path} passHref>
                    <Button
                      onClick={handleCloseNavMenu}
                      className={
                        pathname === page.path ? "is-active" : undefined
                      }
                      sx={{ my: 2, mx: 1, color: "white", display: "block" }}
                    >
                      {page.title}
                    </Button>
                  </Link>
                )}
              </Box>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir ajustes">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Synth knob" src="/logo.svg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                  <Link href={isLoggedIn ? setting.path : "/entrar"}>
                    <Typography textAlign="center">
                      {isLoggedIn ? setting.title : LOGIN}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
