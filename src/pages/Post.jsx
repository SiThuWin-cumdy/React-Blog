import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { PostDetail, Container } from "../components/index";
function Post() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const postFetch = await appwriteService.getPost(slug);
      setPosts(postFetch);
    };
    fetchData();
  }, [slug]);
  return post ? (
    <Container className="p-5 min-h-screen">
      <PostDetail post={post} />
    </Container>
  ) : null;
}

export default Post;
