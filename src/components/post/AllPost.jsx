import React, { useEffect, useState } from "react";
import { PostCard } from "../index";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost as deletePostAction,
  posts as postsAction,
} from "../../features/postsSlice";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";

function AllPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);

  useEffect(() => {
    let mounted = true;
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        const filtered = posts?.documents?.map((doc) => ({
          $id: doc.$id,
          title: doc.title,
          status: doc.status,
          slug: doc.slug,
          featuredImage: doc.featuredImage,
          userId: doc.userId,
          content: doc.content,
        }));
        dispatch(postsAction(filtered));
      }
    });
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const handleDelete = (post) => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        if (post.featuredImage) {
          appwriteService.deleteFile(post.featuredImage);
        }
        dispatch(deletePostAction(post.$id));
        navigate("/");
      }
    });
  };
  return (
    <>
      <section className="grid gap-6 md:grid-cols-2">
        {posts?.map((p) => (
          <PostCard
            key={p.$id ?? p.id ?? p.slug}
            post={p}
            onDelete={() => handleDelete(p)}
          />
        ))}
      </section>
    </>
  );
}

export default AllPost;
