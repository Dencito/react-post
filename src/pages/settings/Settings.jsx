import axios from "axios";
import { useContext, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import { Context } from "../../context/Context";
import "./settings.css";
export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "https://api-mongodb-p-sts-production.up.railway.app/images/"
  const handleSubmit = async (e) => {
    dispatch({type: "UPDATE_START"})
    e.preventDefault();
    const updateUser = {
      userId: user._id,
      username,
      email,
      password,
    };


    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilePic = filename;

      try {
        await axios.post("https://api-mongodb-p-sts-production.up.railway.app/api/upload", data);
      } catch (error) {}
    }

    try {
      const res = await axios.put(`https://api-mongodb-p-sts-production.up.railway.app/api/users/` + user._id, updateUser);
      setSuccess(true)
      dispatch({type: "UPDATE_SUCCESS", payload: res.data})
    } catch (error) {
      dispatch({type: "UPDATE_FAILURE"})
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://react-post-six.vercel.app/api/users/${user._id}`, {
        data: { userId: user._id },
      });
      dispatch({ type: "LOGOUT" });
    } catch (error) {}
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Actualiza cuenta</span>
          <span className="settingsDeleteTitle" onClick={handleDelete}>Eliminar cuenta</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label htmlFor="">Foto de perfil</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-regular fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>

          <label>Nombre de usuario</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña</label>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} />

          <button className="settingsSubmit" type="submit">Actualizar</button>
          {success && <span className="successUpdate">Cuenta actualizada!</span>}
        </form>
      </div>
      <SideBar />
    </div>
  );
}
