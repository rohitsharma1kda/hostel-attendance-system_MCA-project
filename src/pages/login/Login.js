import React from "react";
import logo from "../../components/LOGOv2.1.png";
import "./Login.css";

const Login = (props) => {
  const {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,
    error,
  } = props;

  return (
    <div className="App" align="center">
      <img src={logo} alt={logo} width="120" height="120" />
      <div className="form-inner">
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            placeholder="mail@mail.com"
            type="text"
            name="email"
            id="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            placeholder="********"
            type="password"
            name="password"
            id="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
        </div>
        <p className="errorMsg">{error}</p>
        <div className="btnholder">
          <button onClick={handleLogin}>LOGIN </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
