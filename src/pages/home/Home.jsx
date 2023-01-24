import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import Posts from "../../components/posts/Posts";
import "./home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search, pathname} = useLocation()
  search ? document.title = `Posts de: ${search.split("=")[1]}` : document.title = "home"

  console.log(search)

  useEffect(() => {
    const fetchPost = async () => {
      const res = (await axios.get("https://api-mongodb-p-sts-production.up.railway.app/api/posts" + search));
      setPosts(res.data);
    };
    fetchPost()
  }, []);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <SideBar />
      </div>
    </>
  );
}
