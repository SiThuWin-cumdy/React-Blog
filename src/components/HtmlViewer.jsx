import React from "react";
import DOMPurify from "dompurify";

function HtmlViewer({ html }) {
  const safeHtml = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}

export default HtmlViewer;
