import React from "react";
import { db } from "../../../firebase-config";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  writeBatch,
} from "firebase/firestore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "react-select";
import {
  useStyles,
  StyledTableRow,
  StyledTableCell,
  ColorButtonRed,
  ColorButtonCyan,
  ColorButtonGreen,
} from "../ApprovalStyle";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../../approval/paginate.css";
import { approveONOFF, editONOFF, deleteUser } from "./AdminFunctions";
toast.configure();

function AdfuncMtech() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const getUsers = (semester) => {
    onSnapshot(
      query(
        collection(db, "hostel8/users/clients"),
        where("course", "==", "MTech"),
        where("semester", "==", semester)
      ),
      (snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
  };

  useEffect(() => getUsers(1), []);

  const disapproveUserBatch = async () => {
    const batch = writeBatch(db);
    users.forEach((user) => {
      const userRef = doc(db, "hostel8/users/clients", user.id);
      batch.update(userRef, { approved: false });
    });
    await batch.commit().catch((reason) => {
      toast.error(reason.message.substring(0, reason.message.indexOf(":")), {
        position: toast.POSITION.TOP_CENTER,
      });
    });
    toast.error("Disapproved All", { position: toast.POSITION.TOP_CENTER });
  };

  const approveUserBatch = async () => {
    const batch = writeBatch(db);
    users.forEach((user) => {
      const userRef = doc(db, "hostel8/users/clients", user.id);
      batch.update(userRef, { approved: true });
    });
    await batch.commit().catch((reason) => {
      toast.error(reason.message.substring(0, reason.message.indexOf(":")), {
        position: toast.POSITION.TOP_CENTER,
      });
    });
    toast.success("Approved All", { position: toast.POSITION.TOP_CENTER });
  };

  const editUserBatch = async () => {
    const batch = writeBatch(db);
    users.forEach((user) => {
      const userRef = doc(db, "hostel8/users/clients", user.id);
      batch.update(userRef, { canEdit: true });
    });
    await batch.commit().catch((reason) => {
      toast.error(reason.message.substring(0, reason.message.indexOf(":")), {
        position: toast.POSITION.TOP_CENTER,
      });
    });
    toast.success("Edit Given to Everyone", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const removeEditUserBatch = async () => {
    const batch = writeBatch(db);
    users.forEach((user) => {
      const userRef = doc(db, "hostel8/users/clients", user.id);
      batch.update(userRef, { canEdit: false });
    });
    await batch.commit().catch((reason) => {
      toast.error(reason.message.substring(0, reason.message.indexOf(":")), {
        position: toast.POSITION.TOP_CENTER,
      });
    });
    toast.error("Edit Revoked from Everyone", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const deleteBatch = async () => {
    const batch = writeBatch(db);
    if (window.confirm("Are you sure?") === true) {
      users.forEach((user) => {
        const userRef = doc(db, "hostel8/users/clients", user.id);
        batch.delete(userRef);
        toast.success("Deleted All", { position: toast.POSITION.TOP_CENTER });
      });
    } else {
      toast.info("Process Cancelled", { position: toast.POSITION.TOP_CENTER });
    }
    await batch.commit().catch((reason) => {
      toast.error(reason.message.substring(0, reason.message.indexOf(":")), {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  const getDisplayUser = () => {
    return users
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((user) => {
        return (
          <>
            <StyledTableRow key={user.id}>
              <StyledTableCell>{user.name}</StyledTableCell>
              <StyledTableCell>{user.roll}</StyledTableCell>
              <StyledTableCell>{user.approved ? 'Yes' : 'No'}</StyledTableCell>
              <StyledTableCell>{user.canEdit ? 'Yes' : 'No'}</StyledTableCell>
              <StyledTableCell align="center">
                <ColorButtonCyan
                  size="small"
                  variant="contained"
                  onClick={() => {
                    approveONOFF(user.id);
                  }}
                >
                  Change Approval
                </ColorButtonCyan>
                <ColorButtonGreen
                  size="small"
                  variant="contained"
                  onClick={() => {
                    editONOFF(user.id);
                  }}
                >
                  Edit
                </ColorButtonGreen>
                <ColorButtonRed
                  size="small"
                  variant="contained"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete
                </ColorButtonRed>
              </StyledTableCell>
            </StyledTableRow>
          </>
        );
      });
  };

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const options = [
    { value: 1, label: "1st Sem" },
    { value: 2, label: "2nd Sem" },
    { value: 3, label: "3rd Sem" },
    { value: 4, label: "4th Sem" },
    { value: 5, label: "5th Sem" },
    { value: 6, label: "6th Sem" },
    { value: 7, label: "7th Sem" },
    { value: 8, label: "8th Sem" },
  ];

  const handleChange = (sem) => {
    getUsers(sem);
  };

  return (
    <>
      {" "}
      <br />
      <div>
        <Select
          options={options}
          placeholder="1st Sem"
          onChange={(event) => {
            handleChange(event.value);
          }}
        />
      </div>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Roll Number</StyledTableCell>
              <StyledTableCell>Approved&nbsp;?</StyledTableCell>
              <StyledTableCell>Can Edit&nbsp;?</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {getDisplayUser()}
            <TableRow>
              <StyledTableCell colSpan={5}>
                <Box textAlign="left">
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#2E666D",
                      marginRight: 5,
                    }}
                  >
                    Batch Functions:
                  </span>
                  <ColorButtonCyan
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={approveUserBatch}
                    className={classes.margin}
                  >
                    Approve All
                  </ColorButtonCyan>
                  <ColorButtonGreen
                    style={{ marginLeft: 10 }}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={editUserBatch}
                    className={classes.margin}
                  >
                    Edit All
                  </ColorButtonGreen>
                  <ColorButtonGreen
                    style={{ marginLeft: 10 }}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={removeEditUserBatch}
                    className={classes.margin}
                  >
                    Remove Edit
                  </ColorButtonGreen>
                  <ColorButtonRed
                    style={{ marginLeft: 10 }}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={disapproveUserBatch}
                    className={classes.margin}
                  >
                    Disapprove All
                  </ColorButtonRed>
                  <ColorButtonRed
                    style={{ marginLeft: 10 }}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={deleteBatch}
                    className={classes.margin}
                  >
                    Delete All
                  </ColorButtonRed>
                </Box>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="react-paginate" align="center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          onPageChange={changePage}
          pageCount={pageCount}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </>
  );
}

export default AdfuncMtech;
