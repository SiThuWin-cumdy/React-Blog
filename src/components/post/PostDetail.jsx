import React from "react";
import { HtmlViewer } from "../index";
import appwriteService from "../../appwrite/config";
function PostDetail({ post }) {
  return post ? (
    <div>
      <h5>{post.title}</h5>
      {post.featuredImage && (
        <img
          src={appwriteService.getFileview(post.featuredImage)}
          alt={post.title}
          className="rounded-xl w-full my-2"
        />
      )}

      <HtmlViewer html={post.content} />
    </div>
  ) : null;
}

export default PostDetail;
