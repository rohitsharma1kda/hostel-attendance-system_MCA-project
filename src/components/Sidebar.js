import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useStyles from "./styles";
import Drawer from "@material-ui/core/Drawer";
import { useTheme } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Boarders from "../pages/boarders/Boarders";
import Approval from "../pages/approval/Approval";
import Timer from "../pages/timer/Timer";
import Report from "../pages/report/Report";
import logo from "./LOGOv2.1.png";

export default function Sidebar({handleLogout}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ backgroundColor: "#3F96A0", color: "#F2F2F2" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} style={{ color: "#3F96A0" }}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <div align="center">
          <img src={logo} alt={logo} width="92" height="92" />
        </div>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          size="large"
          href="/boarders"
        >
          Boarder's List
        </Button>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          size="large"
          href="/adfunc"
        >
          Admin Functions
        </Button>

        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          size="large"
          href="/report"
        >
          Report
        </Button>

        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          size="large"
          href="/timer"
        >
          Timer
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          style={{
            backgroundColor: '#D93535',
            color: '#F2F2F2',
            padding: "6px"}}
          onClick={handleLogout}>
            LOG OUT
        </Button>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/boarders" component={Boarders} />
              <Route path="/adfunc" component={Approval} />
              <Route exact path="/report" component={Report} />
              <Route exact path="/timer" component={Timer} />
            </Switch>
          </div>
        </BrowserRouter>
      </main>
    </div>
  );
}
