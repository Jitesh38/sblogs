import { useState, useEffect } from "react";
import { fetchData, updateData } from "../../utils";
import { NavLink, useParams } from "react-router";
import parse from "html-react-parser";
import SaveLogo from "../../assets/save.svg";
import SavedLogo from "../../assets/saved.svg";

const BlogPostPage = () => {
  const { id } = useParams();

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    async function fetchAllBlogs() {
      let data = await fetchData(`post/v/${id}`);
      console.log(data.comment);
      if (data) {
        console.log(data);
        setBlog(data);
        setComments(data?.comment);
        setLikes(data?.likedBy?.length);
        setLiked(data?.isLiked);
        setBookmark(data?.isBookmarked);
      }
    }
    fetchAllBlogs();
  }, []);

  const handleLike = async () => {
    let data = await updateData("post/like", { id: blog?.id }, "PUT", false);
    console.log(data);
    setLiked(!liked);
    setLikes((prev) => prev + 1);
  };

  const handleBookmark = async () => {
    let data = await updateData(
      "post/save",
      { postID: blog.id },
      "POST",
      false
    );
    console.log(data);
    setBookmark((prev) => !prev);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments([
      ...comments,
      {
        postid: blog?.id,
        comment: commentInput,
      },
    ]);
    setCommentInput("");

    let data = await updateData("comment", {
      postid: blog?.id,
      comment: commentInput,
    });
    console.log(data);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow-lg">
        <figure>
          <img
            src={`${import.meta.env.VITE_API_URL}/public/temp/${
              blog?.postImage
            }`}
            alt={blog?.title}
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="card-body space-y-4">
          <h1 className="text-3xl font-bold">{blog?.title}</h1>

          <div className="flex items-center justify-between gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.VITE_API_URL}/public/temp/${
                  blog?.user?.avatar
                }`}
                alt={blog?.user?.username}
                className="w-8 h-8 rounded-full"
              />
              <NavLink
                to={`/user/${blog?.user?.username}`}
                className="hover:text-gray-950"
              >
                <span>{blog?.user?.username}</span>
              </NavLink>
              <span>{new Date(blog?.createdAt).toLocaleDateString()}</span>
            </div>
            {bookmark ? (
              <img
                src={SavedLogo}
                alt=""
                width={20}
                className="cursor-pointer fill-black"
                onClick={handleBookmark}
              />
            ) : (
              <img
                src={SaveLogo}
                alt=""
                width={20}
                className="cursor-pointer fill-black"
                onClick={handleBookmark}
              />
            )}
          </div>

          <p className="text-base leading-relaxed">
            {parse(`${blog?.content}`)}
          </p>

          <div className="flex items-center gap-4 mt-4">
            {liked ? (
              <button className={"btn btn-sm btn-secondary"}>
                {likes} {"Liked ❤️"}
              </button>
            ) : (
              <button className={"btn btn-sm btn-outline"} onClick={handleLike}>
                {likes > 0 ? likes : ""} {"Like"}
              </button>
            )}
          </div>

          {/* Comment Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Comments</h3>

            <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Write a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </form>

            <div className="space-y-2">
              {comments?.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
              ) : (
                comments?.map((comment) => (
                  <div key={comment.id} className="p-3 bg-base-200 rounded-md">
                    <div className="flex items-center gap-3 mb-1">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`${import.meta.env.VITE_API_URL}/public/temp/${
                          comment.user?.avatar
                        }`}
                        alt={comment.user?.username}
                      />
                      <NavLink
                        to={`/user/${comment?.user?.username}`}
                        className="hover:text-gray-950"
                      >
                        <span className="text-sm font-medium">
                          {comment.user?.username}
                        </span>
                      </NavLink>
                    </div>
                    <p className="text-sm">{comment.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
