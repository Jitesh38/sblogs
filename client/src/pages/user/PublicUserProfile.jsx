import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { fetchData } from "../../utils";

// Mock data (replace with API fetch in real app)
const userData = {
  username: "jiteshdev",
  fullName: "Jitesh Prajapati",
  avatar: "https://i.pravatar.cc/150?img=15",
  blogs: [
    {
      id: 1,
      title: "Mastering React with DaisyUI",
      description:
        "Learn how to build beautiful UIs faster using DaisyUI, a plugin for Tailwind CSS.",
      image: "https://source.unsplash.com/600x400/?react,code",
      date: "July 26, 2025",
    },
    {
      id: 2,
      title: "How to Build a Blog in Next.js",
      description:
        "Step-by-step guide to creating a modern blog website using Next.js and Tailwind CSS.",
      image: "https://source.unsplash.com/600x400/?blog,web",
      date: "August 2, 2025",
    },
  ],
};

const PublicUserProfile = () => {
  let { username } = useParams();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchPublicUser() {
      let data = await fetchData(`user/s/${username}`);
      if (data) {
        setUserData(data);
      }
    }
    fetchPublicUser();
  }, []);
  console.log(username);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* User Header */}
      <div className="card bg-base-100 shadow-lg p-6 flex items-center gap-6">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={`${import.meta.env.VITE_API_URL}/public/temp/${
                userData?.avatar
              }`}
              alt={userData?.fullname}
            />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{userData?.fullname}</h1>
          <p className="text-gray-500">@{userData?.username}</p>
        </div>
      </div>

      {/* Blogs List */}
      <h2 className="text-xl font-semibold mt-8 mb-4">
        Blogs by {userData?.fullname}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {userData?.post.map((blog) => (
          <NavLink to={`/blog/${blog?.slug}`}>
            <div key={blog?.id} className="card bg-base-100 shadow-md">
              <figure>
                <img
                  src={`${import.meta.env.VITE_API_URL}/public/temp/${
                    blog?.postImage
                  }`}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog?.title}</h2>
                {/* <p className="text-sm text-gray-600">{blog?.content}</p> */}
                <p className="text-xs text-gray-400">{blog?.date}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">Read More</button>
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default PublicUserProfile;
