import BlogCard from "../../components/BlogCard";
import BlogPostPage from "./BlogPage";
import { fetchData } from "../../utils";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { UserContext } from "../../UserContextProvider/UserContextProvider";

function All_Blogs() {
  const [blogs, setBlogs] = useState(null);
  const { key } = useContext(UserContext);
  useEffect(() => {
    async function fetchAllBlogs() {
      // let data = await fetchData("post");
    let data = await fetchData(`post/search?q=${encodeURIComponent(key)}`);
      console.log(data);
      if (data) {
        setBlogs(data);
      }
    }
    fetchAllBlogs();
  }, [key]);
  console.log(blogs);
  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto mt-5">
  {blogs?.map((blog) => (
    <NavLink key={blog.id} to={`/blog/${blog?.slug}`}>
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
  ))}
</div>

  );
}

export default All_Blogs;
