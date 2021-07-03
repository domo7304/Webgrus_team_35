import { AppBar, Toolbar, Typography, makeStyles,Button } from "@material-ui/core";
import React from "react";
import { Home } from '@material-ui/icons';


  const headersData = [
    {
      label: "커뮤니티",
      href: "/community",
    },
    {
      label: "시설소개",
      href: "/intro",
    },
    {
      label: "시설예약",
      href: "/reservation",
    },
    {
      label: "오시는 길",
      href: "/coming",
    },
    {
        label: "로그인",
        href: "/login",
      },
  ];
  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "#400CCC",
    },
    logo: {
      fontFamily: "Work Sans, sans-serif",
      fontWeight: 600,
      color: "#FFFEFE",
      textAlign: "left",
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
     },
     toolbar: {
        display: "flex",
        justifyContent: "space-between",
      },
  }));

export default function Header() {
    const { header, logo, menuButton, toolbar } = useStyles();

const displayDesktop = () => {
    return (
    <Toolbar className={toolbar}>
        {studyLogo}
        <div>{getMenuButtons()}</div>
    </Toolbar>
    );
    }

const studyLogo = (
    //<Typography variant="h6" color="h1">
    <Typography variant="body1" color="inherit">
        Study-Joa
    </Typography>
);

const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
           // component: RouterLink,
            className: menuButton
          }}
        >
          {label}
        </Button>
      );
    });
  };


  return (

        //<AppBar className={header}>
        <AppBar position="static" color="primary">
            {displayDesktop()}
        </AppBar>

  );
}

