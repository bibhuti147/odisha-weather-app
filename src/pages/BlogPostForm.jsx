import React, { useContext, useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Layout from "../components/Layout";
import { UserContext } from "../context/user.context";
import { db, storage } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import { AdminContext } from "../context/admin.context";

const BlogPostForm = () => {
  const { currentUser } = useContext(UserContext);
  const { adminUser } = useContext(AdminContext);

  let admin = adminUser.find((user) => user.uid === currentUser.uid);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [allIndiaPost, setAllIndiaPost] = useState("");
  const [featuredBlogPostsValue, setFeaturedBlogPostsValue] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);

  const quillRef = useRef(null);

  const sanitizeContent = (content) => {
    // Remove <p> tags from the content
    return content.replace(/<\/?p>/g, "");
  };

  const addBlog = async () => {
    if (
      title === "" ||
      excerpt === "" ||
      content === "" ||
      category === "" ||
      allIndiaPost === "" ||
      thumbnail === ""
    ) {
      toast.error("Please Fill All Fields");
      return;
    }
    createPost();
  };

  const uploadImage = (thumbnail) => {
    if (!thumbnail) return Promise.reject("Thumbnail is missing");

    return new Promise((resolve, reject) => {
      const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
      uploadBytes(imageRef, thumbnail)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              resolve(url);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const createPost = async () => {
    if (currentUser) {
      const postDocRef = collection(db, "blogposts");
      const thumbnailUrl = await uploadImage(thumbnail);
      const postContentUrls = uploadedImages.map((url) => ({ url }));
      const profileImageUrl = currentUser.photoURL;
      const createdAt = new Date();
      const sanitizedContent = sanitizeContent(content);
      try {
        await addDoc(postDocRef, {
          title,
          excerpt,
          thumbnail: thumbnailUrl,
          category,
          postImages: postContentUrls,
          allIndiaPost,
          profileImageUrl,
          featuredBlogPostsValue,
          content: sanitizedContent,
          createdAt,
          author: { name: admin.displayName, id: admin.uid },
          likes: 0,
          views: 1,
        });
        toast.success("Post Added Successfully");
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error(error);
      }
    }

    const newPost = {
      title: title,
      thumbnail: thumbnail,
    };

    try {
      const response = await fetch(
        "https://api-3wz1kdexv-odisha-weathers-projects.vercel.app/new-post.js",
        {
          mode: "no-cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        }
      );

      if (response.ok) {
        alert("Post created and subscribers notified.");
      } else {
        alert("Failed to notify subscribers.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (!quillRef.current) {
      const quill = new Quill("#editor-container", {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        },
      });

      // Listen for image uploads
      quill.getModule("toolbar").addHandler("image", () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = () => {
          const file = input.files[0];
          if (file) {
            // Upload image to Firebase Storage
            const imageRef = ref(storage, `blogimage/${file.name}`);
            uploadBytes(imageRef, file)
              .then((snapshot) => getDownloadURL(snapshot.ref))
              .then((url) => {
                // Insert image URL into Quill editor
                const range = quill.getSelection();
                quill.insertEmbed(range.index, "image", url);
                setUploadedImages((prevImages) => [...prevImages, url]);
              })
              .catch((error) => {
                console.error("Error uploading image: ", error);
              });
          }
        };
      });

      // Listen for text-change event and update content state
      quill.on("text-change", () => {
        setContent(quill.root.innerHTML);
      });

      quillRef.current = quill;
    }
  }, []);

  return (
    <Layout>
      <div className="px-6 lg:px-64 mx-auto bg-gradient-to-tl from-sky-50 to-indigo-200">
        <h1 className="pt-2 text-3xl font-bold mb-6 text-center">
          Create a New Post
        </h1>
        <form className="space-y-4">
          <div className="mb-3">
            {/* Thumbnail  */}
            {thumbnail && (
              <img
                className=" w-full rounded-md mb-3 "
                loading="lazy"
                src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
                alt="thumbnail"
              />
            )}
            {/* Text  */}
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-semibold"
            ></Typography>
            {/* First Thumbnail Input  */}
            <input
              type="file"
              label="Upload thumbnail"
              className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter your post title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700"
            >
              Excerpt
            </label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter your post excerpt"
              onChange={(event) => {
                setExcerpt(event.target.value);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="FeaturedBlogPostsValue"
              className="block text-sm font-medium text-gray-700"
            >
              Do you want this to be a Featured Blog Post?
            </label>
            <input
              type="text"
              id="FeaturedBlogPostsValue"
              name="FeaturedBlogPostsValue"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="For YES type 1 , For NO type 0"
              onChange={(event) => {
                setFeaturedBlogPostsValue(event.target.value);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter the category for this post"
              onChange={(event) => {
                setCategory(event.target.value.toUpperCase());
              }}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Do you want this to be an All India Post?
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder="If you want to then type YES , If you don't then type NO"
              onChange={(event) => {
                setAllIndiaPost(event.target.value.toUpperCase());
              }}
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <div
              id="editor-container"
              className="h-64 border border-gray-300 rounded-md"
            ></div>
          </div>
          <div>
            <button
              type="submit"
              onClick={addBlog}
              className="inline-flex items-center px-4 py-2 mb-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Link to="/">Create Post</Link>
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default BlogPostForm;
