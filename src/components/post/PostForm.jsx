import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../../features/postsSlice.js";
import { Button, RTE, Input } from "../index.js";
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
    if (!data?.title.trim() || !data?.slug) return;
    if (initial) {
      if (data?.featuredImage) {
        const deleteFile = await appwriteService.deletePost(
          data?.featuredImage
        );
      }
      const dbPost = await appwriteService.updatePost(initial.slug, {
        ...data,
        status: "active",
      });
      if (dbPost) {
        dispatch(
          updatePost({
            ...data,
            status,
            id: dbPost.$id,
          })
        );
        navigate(`/`);
      }
    } else {
      if (data?.image[0]) {
        const file = await appwriteService.uploadFile(data?.image[0]);
        if (file) {
          data.featuredImage = file.$id;
        }
      }

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
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitBlog)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Title :"
            type="text"
            className=""
            {...register("title", {
              required: "Title is required",
            })}
          />

          <Input
            label="Slug :"
            type="text"
            className=""
            {...register("slug", {
              required: "Slug is required",
            })}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Author :"
            type="text"
            className=""
            {...register("author", {
              required: "Author is required",
            })}
          />

          <Input
            label="Excerpt :"
            type="text"
            className=""
            {...register("excerpt", {
              required: "Excerpt is required",
            })}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Input
            label="FeaturedImage :"
            type="file"
            className=""
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !initial })}
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
          {errors.content && (
            <p className="text-sm text-red-400">{errors.content.message}</p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" className="w-[100px]">
            Publish
          </Button>
        </div>
      </form>
    </>
  );
}

export default PostForm;
