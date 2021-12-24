import { createTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#6dbcc5",
      main: "#419aa4",
    },
    secondary: {
      main: "#00ffff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  first_half: {
    padding: "300px",
    backgroundColor: "white",
  },
  second_half: {
    padding: "300px",
    backgroundColor: "#419aa4",
  },
}));

export default useStyles;
