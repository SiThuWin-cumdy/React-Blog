import React from "react";
import Container from "./Container";
import { useSelector } from "react-redux";

function PostCard({ post, onDelete, onEdit }) {
  const auth = useSelector((state) => state.auth);
  // if (!auth.userData) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <Container className="p-5 h-[200px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold leading-tight text-left">
            {post?.title}
          </h3>
          <p className="text-inkDim text-sm mt-1">
            by {post.author} • {new Date(post.updatedAt).toLocaleString()}
          </p>
        </div>

        {auth.userData && (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onEdit(post);
              }}
              className="rounded-xl px-3 py-1.5 text-sm bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border border-blue-500/20 cursor-pointer"
            >
              Edit
            </button>
            <button
              onClick={() => {
                e.stopPropagation();  
                e.preventDefault();
                onDelete(post);
              }}
              className="rounded-xl px-3 py-1.5 text-sm bg-red-500/10 text-red-300 hover:bg-red-500/20 border border-red-500/20 cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 text-ink/90">{post.excerpt}</p>
      <div
        className="prose prose-invert max-w-none mt-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Container>
  );
}

export default PostCard;
