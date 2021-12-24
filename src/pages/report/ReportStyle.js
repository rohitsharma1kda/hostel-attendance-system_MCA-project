import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { cyan } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";

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
