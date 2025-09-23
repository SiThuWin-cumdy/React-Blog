import React from "react";
import Card from "./Card";

function PostCard({ post, onDelete }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold leading-tight">{post?.title}</h3>
          <p className="text-inkDim text-sm mt-1">
            by {post.author} • {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => onDelete(post.id)}
          className="rounded-xl px-3 py-1.5 text-sm bg-red-500/10 text-red-300 hover:bg-red-500/20 border border-red-500/20"
        >
          Delete
        </button>
      </div>
      <p className="mt-4 text-ink/90">{post.excerpt}</p>
      <div
        className="prose prose-invert max-w-none mt-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Card>
  );
}

export default PostCard;
