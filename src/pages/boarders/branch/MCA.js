import React from "react";
import { db } from "../../../firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
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
} from "../../approval/ApprovalStyle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../../approval/paginate.css";
toast.configure();

function MCA() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 7;
  const pagesVisited = pageNumber * usersPerPage;

  const getUsers = (semester) => {
    onSnapshot(
      query(
        collection(db, "hostel8/users/clients"),
        where("course", "==", "MCA"),
        where("semester", "==", semester)
      ),
      (snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
  };

  useEffect(() => getUsers(1), []);

  const getDisplayUser = () => {
    return users
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((user) => {
        return (
          <>
            <StyledTableRow key={user.id}>
              <StyledTableCell>{user.course}</StyledTableCell>
              <StyledTableCell>{user.branch}</StyledTableCell>
              <StyledTableCell>{user.roll}</StyledTableCell>
              <StyledTableCell>{user.name}</StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
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
            <StyledTableCell>Branch</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Roll Number</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>{getDisplayUser()}</TableBody>
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

export default MCA;
