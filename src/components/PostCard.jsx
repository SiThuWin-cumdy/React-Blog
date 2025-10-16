import React from "react";
import Container from "./Container";

function PostCard({ post, onDelete, onEdit }) {
  return (
    <Container className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold leading-tight">{post?.title}</h3>
          <p className="text-inkDim text-sm mt-1">
            by {post.author} • {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(post)}
            className="rounded-xl px-3 py-1.5 text-sm bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 border border-blue-500/20 cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(post)}
            className="rounded-xl px-3 py-1.5 text-sm bg-red-500/10 text-red-300 hover:bg-red-500/20 border border-red-500/20 cursor-pointer"
          >
            Delete
          </button>
        </div>
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
