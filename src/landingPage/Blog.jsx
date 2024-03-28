import { Link } from "react-router-dom";
import { blogs } from "../blogsData";

const Blog = () => {
  return (
    <section className="container mx-auto space-y-8" id="blogSection">
      {blogs.map((blog) => (
        <Link
          to={`/blog/post-details/${blog.id}`}
          key={blog}
          style={{ }}
          // className="flex p-8 rounded-xl gap-8 items-center"
          className="flex flex-col p-8 rounded-xl gap-8 items-center sm:flex-row"
        >
          <div 
          // className="w-1/4 aspect-square rounded-xl transition hover:-translate-y-4 duration-300 overflow-hidden"
          className="w-1/2 sm:w-1/4 aspect-square rounded-xl transition hover:-translate-y-4 duration-300 overflow-hidden"

          >
            <img
              src={blog.image}
              className="w-full h-full object-cover "
              alt=""
            />
          </div>
          <div className="space-y-6">
            <h4 className="text-3xl  font-semibold ">{blog.title}</h4>
            <p className="text-lg">{blog.paragraph}</p>
            <div>
              <h5>{blog.publisher}</h5>
              <span>{blog.date}</span>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default Blog;
