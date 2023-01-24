import "./post.css";
import moment from "moment";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "https://api-mongodb-p-sts-production.up.railway.app/images/"
  return (
    <div className="post">
      <Link to={`https://api-mongodb-p-sts-production.up.railway.app/post/${post._id}`} className="link">
      {post.photo && <img className="postImg" src={PF+post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>

        
          <span className="postTitle">{post.title}</span>
        
        <hr />
        <span className="postDate">
          {moment(post.createdAt).format("DD-MM-YYYY")}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
      </Link>
    </div>
  );
}
