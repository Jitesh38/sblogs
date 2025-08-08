import BlogCard from "../../components/BlogCard";
import BlogPostPage from "./BlogPostPage";
import { fetchData } from "../../utils";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

function All_Blogs() {
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    async function fetchAllBlogs() {
      let data = await fetchData("post");
      console.log(data);
      if (data) {
        setBlogs(data);
      }
    }
    fetchAllBlogs();
  }, []);
  console.log(blogs);
  return (
    <div className="flex-center flex-row gap-10 flex-wrap items-center mx-auto">
      {blogs?.map((blog) => (
        <div key={blog.id}>
          <NavLink to={`blog/${blog?.slug}`}>
            <BlogCard
              title={blog?.title}
              description={blog?.description}
              author={{
                name: blog?.user?.username,
                avatar: `${import.meta.env.VITE_API_URL}/public/temp/${blog?.user?.avatar}`,
              }}
              date={new Date(blog?.createdAt).toLocaleDateString()}
              image={`${import.meta.env.VITE_API_URL}/public/temp/${blog?.postImage}`}
            />
          </NavLink>
        </div>
      ))}
  
    </div>
  );
}

export default All_Blogs;
