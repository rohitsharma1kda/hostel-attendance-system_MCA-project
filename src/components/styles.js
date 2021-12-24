import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core";
const drawerWidth = 240;

export const theme = createTheme({
  palette: {
    primary: {
      light: "#e3e3e3",
      main: "#e4e4e4",
    },
    secondary: {
      main: "#00ffff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#3F96A0',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor : "#1F1F1F"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,

  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  button: {
    color: '#eee',
    backgroundColor: '#3F96A0',
    padding: "50px",
    margin: "2px 2px",
    fontSize: "12px",
    grid: "default",
    '&:hover': {
      backgroundColor: '#1d5d65',
      color: '#eee'
  }
  },
}));

export default useStyles;
