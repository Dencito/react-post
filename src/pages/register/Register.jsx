import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  document.title = "register";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    try {
      const res = await axios.post(`https://api-mongodb-p-sts-production.up.railway.app/api/auth/register`, {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login")
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Registrarme</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Nombre de usuario</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Bloggero02"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="email"
          className="registerInput"
          placeholder="example@example.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Contraseña..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="registerButton">Ingresar</button>
      </form>

      <Link to="/login" className="link">
        <button className="registerLoginButton">Login</button>
      </Link>

      {error && <span className="error">Ocurrio un error</span>}
    </div>
  );
}
