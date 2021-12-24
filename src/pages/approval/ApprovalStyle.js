import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { cyan, red, green } from "@material-ui/core/colors";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    color: theme.palette.getContrastText(cyan[700]),
    backgroundColor: cyan[800],
  },
  body: {
    fontSize: 14,
    fontWeight: "bold",
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const ColorButtonCyan = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(cyan[700]),
    backgroundColor: cyan[800],
    "&:hover": {
      color: theme.palette.getContrastText(cyan[700]),
      backgroundColor: cyan[700],
    },
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 2,
  },
}))(Button);

export const ColorButtonRed = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[600],
    "&:hover": {
      color: theme.palette.getContrastText(red[700]),
      backgroundColor: red[500],
    },
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 2,
  },
}))(Button);

export const ColorButtonGreen = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    "&:hover": {
      backgroundColor: green[600],
    },
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 2,
  },
}))(Button);

export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  margin: {
    margin: theme.spacing(0),
  },
}));
