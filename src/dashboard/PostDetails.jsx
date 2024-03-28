import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { route } from "../App";
import DashboardSlide from "../components/DashboardSlide";
import PostCard from "../components/PostCard";
import Footer from "../components/Footer";
import LandingHeader from "../components/LandingHeader";

const PostDetails = ({ isInDash }) => {
  const [postDetails, setPostDetails] = useState({});
  const id = useParams().id;
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(`${route}analytic/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPostDetails(data.data);
      });
  }, []);
  return (
    <>
      <div className="container mx-auto">
        {isInDash && <DashboardSlide />}
        {postDetails?._id && <PostCard post={postDetails} />}
      </div>
    </>
  );
};

export default PostDetails;
