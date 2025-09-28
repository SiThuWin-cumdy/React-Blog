import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/postsSlice";
import { Card } from "../components/index";
import conf from '../conf/conf.js';
import appwriteService from '../appwrite/config';
function PostEditor() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("<p>Write something awesome…</p>");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const dbPost = await appwriteService.createPost({ title, slug, content,featuredImage: '', status: 'active', userId: '123' });

    if (dbPost) {
      dispatch(
        addPost({ title, author: author || "Anonymous", excerpt, content })
      );
    }
    console.log('post', { title, author: author || "Anonymous", excerpt, content })

    setTitle("");
    setAuthor("");
    setExcerpt("");
  };

  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold mb-4">Create a Post</h2>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="bg-surface/60 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-600/50"
          />
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            className="bg-surface/60 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-600/50"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug"
            className="w-full bg-surface/60 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-600/50"
          />
          <input
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short excerpt…"
            className="w-full bg-surface/60 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-600/50"
          />
        </div>

        <Editor
          apiKey={conf.tinymceAPI}
          init={{
            plugins: [
              // Core editing features
              "anchor",
              "autolink",
              "charmap",
              "codesample",
              "emoticons",
              "link",
              "lists",
              "media",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
              // Your account includes a free trial of TinyMCE premium features
              // Try the most popular premium features until Oct 7, 2025:
              "checklist",
              "mediaembed",
              "casechange",
              "formatpainter",
              "pageembed",
              "a11ychecker",
              "tinymcespellchecker",
              "permanentpen",
              "powerpaste",
              "advtable",
              "advcode",
              "advtemplate",
              "ai",
              "uploadcare",
              "mentions",
              "tinycomments",
              "tableofcontents",
              "footnotes",
              "mergetags",
              "autocorrect",
              "typography",
              "inlinecss",
              "markdown",
              "importword",
              "exportword",
              "exportpdf",
            ],
            height: 700,
            menubar: true,
            skin: "oxide-dark",
            content_css: "dark",
            toolbar:
              "undo redo | blocks | bold italic underline | align | bullist numlist | link | removeformat | code",
            branding: false,
          }}
          onEditorChange={(v) => setContent(v)}
        />
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="rounded-xl px-4 py-2.5 bg-brand-600 text-white hover:brightness-110"
          >
            Publish
          </button>
        </div>
      </form>
    </Card>
  );
}

export default PostEditor;
