import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import FullPost from "../components/FullPost";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { BlogContext } from "../context/blog.context";
import ReactGA from "react-ga4";

const BlogPosts = () => {
  const { currentUser } = useContext(UserContext);
  const { getAllBlogs } = useContext(BlogContext);
  const { postId } = useParams();

  const post = getAllBlogs.find((blog) => blog.id === postId);

  useEffect(() => {
    if (post) {
      ReactGA.initialize(import.meta.env.VITE_MEASUREMENT_ID);

      // Send a pageview hit
      ReactGA.send({
        hitType: "pageview",
        page: `${post.title}`,
        title: `${post.title}`,
      });
    }
  }, [post, postId]);

  // Check if post exists before accessing its properties
  if (!post) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <Layout>
      <FullPost post={post} postId={postId} currentUser={currentUser} />
    </Layout>
  );
};

export default BlogPosts;
