import React, { useEffect, useState } from "react";
import { collection, query } from "firebase/firestore";
import { db } from "../../firebase-config";
import { onSnapshot } from "firebase/firestore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ColorButtonCyan, StyledTableCell } from "../approval/ApprovalStyle";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate"
import "./paginate.css";

const Report = () => {
  const presentHeaders = [
    { label: "Course", key: "course" },
    { label: "Branch", key: "branch" },
    { label: "Semester", key: "semester" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "TimeStamp", key: "time" },
    { label: "Image", key: "image" },
    { label: "Hostel Block Name", key: "hostelBlockName" },
  ];

  const absentHeaders = [
    { label: "Course", key: "course" },
    { label: "Branch", key: "branch" },
    { label: "Semester", key: "semester" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Hostel Block Name", key: "hostelBlockName" },
  ];
  var date;
  var indexStudent=0;
  var [inputDate, setInputDate] = useState("");
  const attendanceDocCollection = "hostel8/attendance";
  const [presentStudents, setPresentStudents] = useState([]); //Students present on a particular date
  const [users, setUsers] = useState([]); //Storing all clients in DB
  var storePresentStudents = []; //Storing variables along with the branch name in separate variable

  var indexOfPresentStudents=[];
  var storeAbsentStudents = [];

  //PaginationPresent

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  //PaginationAbsent
  const [pageNumberAbsent, setPageNumberAbsent] = useState(0);
  const usersPerPageAbsent = 5;
  const pagesVisitedAbsent = pageNumberAbsent * usersPerPageAbsent;
  

    
  useEffect(() => {
    onSnapshot(query(collection(db, "hostel8/users/clients")), (snapshot) =>
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

  //Local Time converter to write in excel
  function tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  }

  const getAttendance = () => {
    var selectedDate = document
      .getElementById("datepicker")
      .value.toString()
      .split("-");
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    date =
      months[selectedDate[1] - 1] +
      " " +
      selectedDate[2] +
      ", " +
      selectedDate[0];
    setInputDate(date);
    onSnapshot(
      query(collection(db, attendanceDocCollection + "/" + date)),
      (snapshot) => {
        setPresentStudents(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    );
  };

  const displayStoredPresentStudents = () => {
    return storePresentStudents.slice(pagesVisited, pagesVisited + usersPerPage).map((user)=>{
      return (
        <TableRow>
        <StyledTableCell><img src={user.image} height="90px" width="90px" alt="studentImage"></img></StyledTableCell>
        <StyledTableCell>{user.branch}</StyledTableCell>
        <StyledTableCell>{user.semester}</StyledTableCell>
        <StyledTableCell>{user.name}</StyledTableCell>
        <StyledTableCell>{user.email}</StyledTableCell>
        <StyledTableCell>{user.time}</StyledTableCell>
        </TableRow>
      );
    })
  }

  const displayStoredAbsentStudents = () => {
      return storeAbsentStudents.slice(pagesVisitedAbsent, pagesVisitedAbsent + usersPerPageAbsent).map((user)=>{
      return (
        <TableRow style={{height: "50px"}}>
        <StyledTableCell>{user.name}</StyledTableCell>
        <StyledTableCell>{user.branch}</StyledTableCell>
        <StyledTableCell>{user.semester}</StyledTableCell>
        <StyledTableCell>{user.email}</StyledTableCell>
        </TableRow>
      );
    })
  }

  const pageCount = Math.ceil(presentStudents.length/usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  const pageCountAbsent = Math.ceil((users.length-presentStudents.length)/usersPerPageAbsent);
  const changePageAbsent = ({ selected }) => {
    setPageNumberAbsent(selected);
  };

  return (
    <div>
      <h3>Attendance Reports</h3>
      <br />
      <h6>Select Date</h6>
      <input
        style={{
          width: "20%",
          padding: "6px 20px",
        }}
        type="date"
        id="datepicker"
        onChange={() => getAttendance()}
      ></input>
      {presentStudents.length > 0 ? (
        <>
          <div className="container">
            {" "}
            <br />
            <div
              style={{
                backgroundColor: "#207A85",
                padding: "10px",
                width: "30%",
                color: "#f2f2f2",
              }}
            >
              <h6 align="left">
                <br />
                PRESENT - {presentStudents.length}
                <br />
                TOTAL - {users.length}
                <br />
                PERCENTAGE -{" "}
                {((presentStudents.length / users.length) * 100).toFixed(2)}%
              </h6>
            </div>
            <br />
            <h5 align="left">STUDENTS PRESENT</h5>
            <Table size="small">
              <TableHead>
                <TableRow>
                <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Branch</StyledTableCell>
                  <StyledTableCell>Semester</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>TimeStamp</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* eslint-disable-next-line array-callback-return */}
                {presentStudents.map((record) => {
                  const newUser = {
                    name: record.name,
                    email: record.email,
                    time: tConv24(record.timeStamp),
                    image: record.imageUrl,
                    branch: "",
                    semester: "",
                    course : ""
                  };

                  for (var i = 0; i < users.length; i++) {
                    const user = users[i];
                    if (user.email === record.email) {
                      newUser.branch = user.branch;
                      newUser.semester = user.semester;
                      newUser.course = user.course;
                      indexOfPresentStudents.push(i);
                      break;
                    }
                  }

                  storePresentStudents.push(newUser);
                })}

               {/* Present Students */
               displayStoredPresentStudents()
               }
               
              </TableBody>

            </Table>
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
            <div align="center">
              <ColorButtonCyan variant="contained" className="mt-2">
                <CSVLink
                  style={{ color: "#f2f2f2" }}
                  filename={inputDate + " present.csv"}
                  data={storePresentStudents}
                  headers={presentHeaders}
                >
                  Download
                </CSVLink>
              </ColorButtonCyan>
              <br />
              <br />
              {
                // eslint-disable-next-line array-callback-return
                users.map((user,index)=>{
                  if(index === indexOfPresentStudents[indexStudent]){
                    indexStudent++;
                  }else
                  {
                    storeAbsentStudents.push(user)
                  }
                })
              }

            <h5 align="left">STUDENTS ABSENT</h5>
              <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Branch</StyledTableCell>
                  <StyledTableCell>Semester</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>

               {/* Absent Students */
               displayStoredAbsentStudents()
               }
               
              </TableBody>
              </Table>
              <div className="react-paginate" align="center">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                onPageChange={changePageAbsent}
                pageCount={pageCountAbsent}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </div>
              <ColorButtonCyan variant="contained" className="mt-2">
                <CSVLink
                  style={{ color: "#f2f2f2" }}
                  filename={inputDate + " absent.csv"}
                  data={storeAbsentStudents}
                  headers={absentHeaders}
                >
                  Download
                </CSVLink>
              </ColorButtonCyan>
            </div>
          </div>
        </>
      ) : (
        <h5>
          <br />
          Attendance not available in database
        </h5>
      )}
    </div>
  );
};

export default Report;
