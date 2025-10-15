import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../features/postsSlice.js";
import { Button, RTE } from "../index.js";
import conf from "../../conf/conf.js";
import appwriteService from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function PostForm({ initial }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      title: initial?.title ?? "",
      author: initial?.author ?? "",
      excerpt: initial?.excerpt ?? "",
      slug: initial?.slug ?? "",
      featuredImage: initial?.featuredImage ?? "",
      content: initial?.content ?? "<p>Write something awesome…</p>",
    },
  });
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitBlog = async (data) => {
    // e.preventDefault();
    if (!data?.title.trim()) return;

    const dbPost = await appwriteService.createPost({
      ...data,
      status: "active",
      userId: auth.userData.$id || "anonymous",
    });

    if (dbPost) {
      dispatch(
        addPost({
          ...data,
          id: dbPost.$id,
          status,
        })
      );
      navigate(`/`);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitBlog)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            {...register("title", {
              required: "Title is required",
            })}
            placeholder="Title"
            className="bg-surface/60 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-600/50"
          />
          <input
            {...register("author", {
              required: "Author is required",
            })}
            placeholder="Author"
            className="bg-surface/60 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-600/50"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            {...register("slug", {
              required: "Slug is required",
            })}
            placeholder="Slug"
            className="w-full bg-surface/60 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-600/50"
          />
          <input
            {...register("excerpt", {
              required: "Excerpt is required",
            })}
            placeholder="Short excerpt…"
            className="w-full bg-surface/60 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-600/50"
          />
        </div>
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
        {errors.content && (
          <p className="text-sm text-red-400">{errors.content.message}</p>
        )}
        <div className="flex items-center justify-end">
          {/* <button
            type="submit"
            className="rounded-xl px-4 py-2.5 bg-brand-600 text-white hover:brightness-110"
          >
            Publish
          </button> */}
          <Button type="submit" className="w-[100px]">
            Publish
          </Button>
        </div>
      </form>
    </>
  );
}

export default PostForm;
