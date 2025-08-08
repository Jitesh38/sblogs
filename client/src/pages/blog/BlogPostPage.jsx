import { useState, useEffect } from "react";
import { fetchData, updateData } from "../../utils";
import { useParams } from "react-router";
import parse from "html-react-parser";

const BlogPostPage = () => {
  const { id } = useParams();

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function fetchAllBlogs() {
      let data = await fetchData(`post/v/${id}`);
      console.log(data.comment);
      if (data) {
        setBlog(data);
        setComments(data?.comment);
      }
    }
    fetchAllBlogs();
  }, []);

  const handleLike = () => setLiked(!liked);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments([
      ...comments,
      {
        postid: blog?.id,
        comment: commentInput,
      }
    ]);
    setCommentInput("");

    let data = await updateData("comment", {
      postid: blog?.id,
      content: commentInput,
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

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <img
              src={`${import.meta.env.VITE_API_URL}/public/temp/${
                blog?.user?.avatar
              }`}
              alt={blog?.user?.username}
              className="w-8 h-8 rounded-full"
            />
            <span>{blog?.user?.username}</span> |{" "}
            <span>{new Date(blog?.createdAt).toLocaleDateString()}</span>
          </div>

          <p className="text-base leading-relaxed">
            {parse(`${blog?.content}`)}
          </p>

          <div className="flex items-center gap-4 mt-4">
            <button
              className={`btn btn-sm ${
                liked ? "btn-secondary" : "btn-outline"
              }`}
              onClick={handleLike}
            >
              {liked ? "Liked ❤️" : "Like"}
            </button>
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
                    <p>{comment.comment}</p>
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
