import React from "react";

const BlogCard = ({ title, description, image, author, date }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Blog" className="w-full h-48 object-cover rounded-t-2xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm">{author.name}</span>
          </div>
          <span className="text-xs text-gray-500">{date}</span>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
