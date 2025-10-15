import React, { useState } from "react";

import { Container, PostForm } from "../components/index";
function PostEditor() {
  return (
    <Container className="p-5">
      <h2 className="text-lg font-semibold mb-4">Create a Post</h2>
      <PostForm />
    </Container>
  );
}

export default PostEditor;
