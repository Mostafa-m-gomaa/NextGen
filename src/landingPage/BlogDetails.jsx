import { useParams } from "react-router-dom";
// import { blogs } from "../blogsData";
import { blogs } from "../blData";
import { useEffect, useRef } from "react";

const BlogDetails = () => {
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id == id);
  const container = useRef(null);
  useEffect(() => {
    container.current.innerHTML = blog.content;
  }, []);
  return (
    <section id="blogSection" className=" py-12">
      <div className="container text-lg  mx-auto">
        <h1 className="text-4xl font-semibold">{blog.title}</h1>
        <div className="mx-4 my-4">
          <h5>{blog.publisher}</h5>
          <span>{blog.date}</span>
        </div>
      </div>
      <img src={blog.image} className="w-full py-10" alt="" />
      <div
        ref={container}
        className="container mx-auto max-w-[1000px] blog-container"
      ></div>
    </section>
  );
};

export default BlogDetails;
