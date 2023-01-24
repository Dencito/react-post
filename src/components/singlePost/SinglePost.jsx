import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlepost.css";
import moment from "moment";
import { Context } from "../../context/Context";
import axios from "axios";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await Axios.get(`https://api-mongodb-p-sts-production.up.railway.app/api/posts/${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://api-mongodb-p-sts-production.up.railway.app/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://api-mongodb-p-sts-production.up.railway.app/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      /* window.location.reload(); */
      setUpdateMode(false)
    } catch (error) {}
  };
  document.title = title;
  const PF = "https://api-mongodb-p-sts-production.up.railway.app/images/";
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {/* 1hr 16min */}
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => {
                    setUpdateMode(true);
                  }}
                ></i>
                <i
                  className="singlePostIcon fa-regular fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAutor">
            Autor:
            <Link className="link" to={`/?user=${post.username}`}>
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {moment(post.createdAt).format("HH:mm | DD.MM.YYYY")}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Actualizar
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        )}
      </div>
    </div>
  );
}
