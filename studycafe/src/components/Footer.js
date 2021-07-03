import React from 'react';
import { Container, Toolbar, Typography, AppBar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: "#400CCC",
  },
}));


export default function Footer() {
    return (
        <AppBar position="static" color="primary">
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit">
              © Webgrus team 35.
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    )
}
