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

const Report = () => {
  const headers = [
    { label: "Branch", key: "branch" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "TimeStamp", key: "time" },
    { label: "Image", key: "image" },
  ];

  var date;
  var [inputDate, setInputDate] = useState("");
  const attendanceDocCollection = "hostel8/attendance";
  const [presentStudents, setPresentStudents] = useState([]); //Students present on a particular date
  const [users, setUsers] = useState([]); //Storing all clients in DB
  var storePresentStudents = []; //Storing variables along with the branch name in separate variable

  // var storeAbsentStudents = [
  //   {
  //     name: "",
  //     email: "",
  //     time: "",
  //     branch: "",
  //     image: "",
  //   },
  // ];

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
            <Table stickyHeader="true" size="small">
              <TableHead variant="head">
                <TableRow>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Branch</StyledTableCell>
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
                  };

                  for (var i = 0; i < users.length; i++) {
                    const user = users[i];
                    if (user.email === record.email) {
                      newUser.branch = user.branch;
                      // break;
                    }
                  }

                  storePresentStudents.push(newUser);
                })}

                {storePresentStudents.map((user) => {
                  return (
                    <TableRow>
                      <StyledTableCell>
                        <img
                          src={user.image}
                          height="90px"
                          width="90px"
                          alt="not availabe"
                        ></img>
                      </StyledTableCell>
                      <StyledTableCell>{user.branch}</StyledTableCell>
                      <StyledTableCell>{user.name}</StyledTableCell>
                      <StyledTableCell>{user.email}</StyledTableCell>
                      <StyledTableCell>{user.time}</StyledTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div align="center">
              <ColorButtonCyan variant="contained" className="mt-2">
                <CSVLink
                  style={{ color: "#f2f2f2" }}
                  filename={inputDate + " attendance.csv"}
                  data={storePresentStudents}
                  headers={headers}
                >
                  Download
                </CSVLink>
              </ColorButtonCyan>
              <br />
              <br />
              {/*Function for absent students */}
              {}
              {/* Table for Absent Students */}
              <Table size="small">
                <TableHead variant="head">
                  <TableRow>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell>Branch</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>TimeStamp</StyledTableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </div>
          </div>
        </>
      ) : (
        <h5>
          <br />
          Not Found! Check the selected date.
        </h5>
      )}
    </div>
  );
};

export default Report;
