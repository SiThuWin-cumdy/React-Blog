import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import conf from "../../conf/conf.js";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <>
      <label className="text-left font-medium text-md">{label}</label>
      <Controller
        name={name || "content"}
        control={control}
        rules={{ required: "Content is required" }}
        render={({ field }) => (
          <Editor
            apiKey={conf.tinymceAPI}
            initialValue={defaultValue}
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
                // "checklist",
                // "mediaembed",
                // "casechange",
                // "formatpainter",
                // "pageembed",
                // "a11ychecker",
                // "tinymcespellchecker",
                // "permanentpen",
                // "powerpaste",
                // "advtable",
                // "advcode",
                // "advtemplate",
                // "ai",
                // "uploadcare",
                // "mentions",
                // "tinycomments",
                // "tableofcontents",
                // "footnotes",
                // "mergetags",
                // "autocorrect",
                // "typography",
                // "inlinecss",
                // "markdown",
                // "importword",
                // "exportword",
                // "exportpdf",
              ],
              height: 700,
              menubar: true,
              skin: "oxide-dark",
              content_css: "dark",
              toolbar:
                "undo redo | blocks | bold italic underline | align | bullist numlist | link | removeformat | code",
              branding: false,
            }}
            value={field.value}
            onEditorChange={(html) => field.onChange(html)}
            onBlur={field.onBlur}
          />
        )}
      />
    </>
  );
}

export default RTE;
