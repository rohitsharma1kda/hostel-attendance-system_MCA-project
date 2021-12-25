import React from "react";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { auth } from "./firebase-config";
import Sidebar from "./components/Sidebar";
import Login from  "./pages/login/Login"
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./components/styles";


const App = () => {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({});

  const clearErrors = async () => {
    setError("");
  };

  const clearInputs = async () => {
    setLoginEmail("");
    setLoginPassword("");
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleLogin = async () => {
    clearErrors();
    const adminCheck = await getDocs(collection(db, "hostel8/users/admins"));
    adminCheck.forEach((doc) => {

      try {
        if(loginEmail === doc.id) {
          signInWithEmailAndPassword(auth, loginEmail, loginPassword).catch((error) => 
          setError(error.code.substring(5) + "!"))
        }
      }catch (e){
         setError(e.message)
      }
    });
  };

  const handleLogout = async () => {
    await signOut(auth);
    clearInputs();
  };

  return (
    <MuiThemeProvider theme={theme}>
       {/* Rest of the pages are inside the sidebar */}
       {user ? (
        <Sidebar handleLogout={handleLogout} />
      ) : (
        <Login
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          handleLogin={handleLogin}
          error={error}
        />
      )}
       {/* Routes Defined Here */}

      {/* Routes end here */}
     </MuiThemeProvider>
  );

};

export default App;
//stable
