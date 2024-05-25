import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const FetchedQuillContent = ({ content, postId, post }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) {
      const quill = new Quill("#fetched-editor-container", {
        theme: "bubble",
        readOnly: true,
        modules: {
          toolbar: false,
        },
      });

      quill.clipboard.dangerouslyPasteHTML(content);

      quillRef.current = quill;
    } else {
      quillRef.current.root.innerHTML = ""; // clear the previous content
      quillRef.current.clipboard.dangerouslyPasteHTML(content); // update with new content
    }
    return () => {
      if (quillRef.current && quillRef.current.quill) {
        quillRef.current.quill.destroy();
      }
    };
  }, [content, postId, post]);

  return <div id="fetched-editor-container"></div>;
};

export default FetchedQuillContent;
