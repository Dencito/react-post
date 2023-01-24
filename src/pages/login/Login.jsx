import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const [invalidUser, setInvalidUser] = useState(true);
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch } = useContext(Context);

  const handlSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    if (user === null) {
      setInvalidUser(false);
      try {
        const res = await axios.post("https://api-mongodb-p-sts-production.up.railway.app/api/auth/login", {
          username: userRef.current.value,
          password: passwordRef.current.value,
        });
        setInvalidUser(false);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (error) {
        setTimeout(() => {
          setInvalidUser(true);
        }, 2000);
        dispatch({ type: "LOGIN_FAILURE" });
      }
    }
  };

  console.log(user);
  return user ? (
    <div className="login">
      <span className="loginTitle">Usted ya se encuentra logeado</span>
    </div>
  ) : (
    <div className="login">
      <span className="loginTitle">Ingresar</span>
      <form className="loginForm" onSubmit={handlSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Nombre de usuario"
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Contraseña..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit">
          Ingresar
        </button>
      </form>

      <Link to="/register" className="link">
        <button className="loginRegisterButton">Register</button>
      </Link>

      {invalidUser || userRef === "" || passwordRef === "" ? (
        ""
      ) : (
        <span className="error">Revise los datos de su cuenta</span>
      )}
    </div>
  );
}
