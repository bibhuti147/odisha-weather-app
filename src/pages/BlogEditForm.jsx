import React, { useContext, useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import Layout from "../components/Layout";
import { UserContext } from "../context/user.context";
import { db, storage } from "../firebase-config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import { AdminContext } from "../context/admin.context";
import { BlogContext } from "../context/blog.context";

const BlogEditForm = () => {
  const { postId } = useParams();
  const { currentUser } = useContext(UserContext);
  const { adminUser } = useContext(AdminContext);
  const { getAllBlogs } = useContext(BlogContext);

  let admin = adminUser.find((user) => user.uid === currentUser.uid);
  let post = getAllBlogs.find((blog) => blog.id === postId);

  const [title, setTitle] = useState(post.title);
  const [excerpt, setExcerpt] = useState(post.excerpt);
  const [thumbnail, setThumbnail] = useState(post.thumbnail);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);
  const [allIndiaPost, setAllIndiaPost] = useState(post.allIndiaPost);
  const [featuredBlogPostsValue, setFeaturedBlogPostsValue] = useState(
    post.featuredBlogPostsValue
  );
  const [uploadedImages, setUploadedImages] = useState([]);

  const quillRef = useRef(null);

  const sanitizeContent = (content) => {
    // Remove <p> tags from the content
    return content.replace(/<\/?p>/g, "");
  };

  const addBlog = async (e) => {
    e.preventDefault();
    const updatedFields = {
      title: title || post.title,
      excerpt: excerpt || post.excerpt,
      content: sanitizeContent(content) || post.content,
      category: category || post.category,
      allIndiaPost: allIndiaPost || post.allIndiaPost,
      featuredBlogPostsValue:
        featuredBlogPostsValue || post.featuredBlogPostsValue,
    };

    try {
      const thumbnailUrl =
        thumbnail instanceof File ? await uploadImage(thumbnail) : thumbnail;
      const postDocRef = doc(db, "blogposts", postId);

      const updatedPost = {
        ...updatedFields,
        thumbnail: thumbnailUrl || post.thumbnail,
        postImages:
          uploadedImages.length > 0 ? uploadedImages : post.postImages,
        likeValues: post.likes,
        viewValues: post.views,
        createdAt: post.createdAt,
        editedAt: new Date(),
        author: { name: admin.displayName, id: admin.uid },
      };

      await updateDoc(postDocRef, updatedPost);
      toast.success("Post Updated Successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error(error.message);
    }
  };

  const uploadImage = (thumbnail) => {
    if (!thumbnail || !(thumbnail instanceof File)) {
      return Promise.reject("Thumbnail is missing or not a file object");
    }

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
      const postDocRef = doc(db, "blogposts", postId);
      const thumbnailUrl = await uploadImage(thumbnail);
      const postContentUrls =
        uploadedImages.length > 0
          ? uploadedImages
          : post.postImages.filter((url) => url !== thumbnailUrl);
      const profileImageUrl = currentUser.photoURL;
      const createdAt = post.createdAt;
      const editedAt = new Date();
      const likeValues = post.likes;
      const viewValues = post.views;
      const sanitizedContent = sanitizeContent(content);
      try {
        await updateDoc(postDocRef, {
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
          editedAt,
          author: { name: admin.displayName, id: admin.uid },
          likes: likeValues,
          views: viewValues,
        });
        toast.success("Post Added Successfully");
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    if (quillRef.current && post.content) {
      const quill = quillRef.current;
      quill.root.innerHTML = post.content; // Set the initial content of the editor
      return;
    }

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

    // Set initial content if available
    if (post.content) {
      quill.root.innerHTML = post.content;
    }

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
  }, [post.content]);

  return (
    <Layout>
      <div className="px-6 lg:px-64 mx-auto bg-gradient-to-tl from-sky-50 to-indigo-200">
        <h1 className="pt-2 text-3xl font-bold mb-6 text-center">Edit Post</h1>
        <form className="space-y-4">
          <div className="mb-3">
            {/* Thumbnail  */}
            {thumbnail && (
              <img
                className=" w-full rounded-md mb-3 "
                loading="lazy"
                src={
                  thumbnail instanceof File
                    ? URL.createObjectURL(thumbnail)
                    : post.thumbnail
                }
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
              value={title}
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
              value={excerpt}
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
              value={featuredBlogPostsValue}
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
              value={category}
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
              value={allIndiaPost}
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
              <Link to="/">Edit Post</Link>
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default BlogEditForm;
