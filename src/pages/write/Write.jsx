import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";
/* import sharp from 'sharp';
import path from 'path-browserify' */


export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      file,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("https://api-mongodb-p-sts-production.up.railway.app/api/upload", data);
      } catch (error) {}
    }

    try {
      const res = await axios.post(`https://api-mongodb-p-sts-production.up.railway.app/api/posts`, newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };


  //codigo para bajar la calidad, inconpatible
  /* const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      file,
    };
    if (file.path) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      sharp(file)
        .jpeg({ quality: 80 })
        .toBuffer()
        .then((outputBuffer) => {
          data.append("file", outputBuffer, {
            contentType: "image/jpeg",
            name: filename,
          })});
      newPost.photo = filename;

      try {
        await axios.post("/api/upload", data);
      } catch (error) {}
    }

    try {
      const res = await axios.post(`/api/posts`, newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };
 */
  

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Escribi tu historia..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="button writeSubmit" type="submit">
          Publicar
        </button>
      </form>
    </div>
  );
}
