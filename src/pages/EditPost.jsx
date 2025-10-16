import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";

function EditPost() {
  const [post, setPosts] = useState(null);
  const {slug} = useParams();
  const navigate = useNavigate(); 
  useEffect(() => {
    appwriteService.getPost(slug).then((post) => {
      if (post) {
        setPosts(post);
      }
    });
  }, [slug, navigate]);
  return post? (
    <Container className="p-5">
      <h2 className="text-lg font-semibold mb-4">Edit Post</h2>
      <PostForm initial={post} />
    </Container>
  ) :null;
}

export default EditPost;
