import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../features/postsSlice";
import appwriteService from "../appwrite/config";

function Home() {
  // const posts = useSelector((state) => state.posts);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  const dispatch = useDispatch();
  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* <PostEditor /> */}
        <section className="grid gap-6 md:grid-cols-2">
          {posts?.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              onDelete={(id) => dispatch(deletePost(id))}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Home;
