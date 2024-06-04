"use client";

import { Page } from "@/types";
import { CONTACT, EMAIL } from "@/utils/constants";
import { AppBar, Box, Container, Toolbar } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";

const pages: Page[] = [{ title: CONTACT, path: "/contacto" }];

const Footer = () => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              textTransform: "uppercase",
            }}
          >
            {isLoggedIn ? (
              pages.map((page) => (
                <Link key={page.title} href={page.path} passHref>
                  {page.title}
                </Link>
              ))
            ) : (
              <Link
                href={`mailto:${EMAIL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {EMAIL}
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
