//This is old one code for rich text editor using react-quill 
// {Firstly i check my react version which is 19.1.1 and then i found react-quill is not compatible with react 18 and above so i used react-quilljs which is compatible with react 18 and above. So i have to replace react-quill with react-quilljs}


// {For this i have done: npm uninstall react-quill and then npm install react-quilljs }
// {Now i have to create RichTextEditor.jsx file using react-quilljs and then import it in CourseTab.jsx file}
// {Here is the old code for RichTextEditor.jsx using react-quill}
// {After this i again start my dev server and check the rich text editor is working fine or not}
// {If I have follow another way i should have downgraded my react version to 17 but it will create issue in other parts of my application so i have used react-quilljs instead of react-quill}

// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const RichTextEditor =() => {
//   const [value, setValue] = useState('');

//   return <ReactQuill theme="snow" value={value} onChange={setValue} />;
// }
// export default RichTextEditor;

// src/components/RichTextEditor.jsx



// import React from "react";
// import { useQuill } from "react-quilljs";
// import "quill/dist/quill.snow.css";

// const RichTextEditor = ({input, setInput}) => {
//   const { quill, quillRef } = useQuill();

//   const handleChange = (value) => {
//     setInput({ ...input, description:value});
//   }
//   return <div ref={quillRef} value={input.description} onChange={handleChange} />;
// };

// export default RichTextEditor;

// import React, { useEffect } from "react";
// import { useQuill } from "react-quilljs";
// import "quill/dist/quill.snow.css";

// const RichTextEditor = ({ input, setInput }) => {
//   const { quill, quillRef } = useQuill();

//   // ✅ Attach listener once when Quill is ready
//   useEffect(() => {
//     if (!quill) return;

//     const handleChange = () => {
//       const value = quill.root.innerHTML;
//       setInput((prev) => ({ ...prev, description: value }));
//     };

//     quill.on("text-change", handleChange);

//     // ✅ Cleanup listener on unmount
//     return () => {
//       quill.off("text-change", handleChange);
//     };
//   }, [quill, setInput]);

//   // ✅ Load existing description only once
//   useEffect(() => {
//     if (quill && input.description && quill.root.innerHTML !== input.description) {
//       quill.root.innerHTML = input.description;
//     }
//   }, [quill]);

//   return <div ref={quillRef} />;
// };

// export default RichTextEditor;

import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const RichTextEditor = ({ input, setInput }) => {
  const { quill, quillRef } = useQuill();

  // Listen for content changes
  useEffect(() => {
    if (!quill) return;

    const handleChange = () => {
      const value = quill.root.innerHTML;
      setInput((prev) => ({ ...prev, description: value }));
    };

    quill.on("text-change", handleChange);
    return () => quill.off("text-change", handleChange);
  }, [quill, setInput]);

  // Populate existing description when loaded
  useEffect(() => {
    if (quill && input.description && quill.root.innerHTML !== input.description) {
      quill.clipboard.dangerouslyPasteHTML(input.description);
    }
  }, [quill, input.description]);

  return <div ref={quillRef} />;
};

export default RichTextEditor;
