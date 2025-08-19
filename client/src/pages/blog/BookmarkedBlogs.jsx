import React,{ useState, useEffect } from "react";
import { fetchData } from "../../utils";
import { NavLink } from "react-router";
import BlogCard from "../../components/BlogCard";


function BookmarkedPost() {
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    async function fetchAllBlogs() {
      // let data = await fetchData("post");
      let data = await fetchData(`post/bookmarks`);
      console.log(data);
      if (data) {
        setBlogs(data.bookmarks);
      }
    }
    fetchAllBlogs();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto mt-5">
      {blogs?.map((blog) => (
        <NavLink key={blog.id} to={`/blog/${blog?.slug}`}>
          <BlogCard
            title={blog?.title}
            description={blog?.description}
            author={{
              name: blog?.user?.username,
              avatar: `${import.meta.env.VITE_API_URL}/public/temp/${
                blog?.user?.avatar
              }`,
            }}
            date={new Date(blog?.createdAt).toLocaleDateString()}
            image={`${import.meta.env.VITE_API_URL}/public/temp/${
              blog?.postImage
            }`}
          />
        </NavLink>
      ))}
    </div>
  );
}

export default BookmarkedPost;
