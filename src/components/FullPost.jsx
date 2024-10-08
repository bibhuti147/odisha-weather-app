import React, { useContext, useEffect, useState } from "react";
import Morefromauthor from "./Morefromauthor";
import Morefromcategory from "./Morefromcategory";
import CommentBox from "./Commentbox";
import Commentposts from "./Commentposts";
import { LiaComment } from "react-icons/lia";
import FetchedQuillContent from "./FetchedQuillContent";
import {
  analytics,
  createUserDocumentFromAuth,
  db,
  signUpWithGooglePopup,
} from "../firebase-config";
import { UserContext } from "../context/user.context";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { doc, updateDoc } from "firebase/firestore";
import { AllUsersContext } from "../context/allusers.context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineShareAlt } from "react-icons/ai";
import { logEvent } from "firebase/analytics";
import ReactGA from "react-ga4";

const FullPost = ({ post, postId, currentUser }) => {
  const { getAllUsers } = useContext(AllUsersContext);
  const { setCurrentUser, likedPosts, setLikedPosts } = useContext(UserContext);

  const location = useLocation();
  const shareUrl = location.pathname + location.search;

  const navigate = useNavigate();
  const handleClick = async (blog, setIndex) => {
    // Update view count for the blog post
    const postDocRef = doc(db, "blogposts", blog.id);
    try {
      await updateDoc(postDocRef, {
        views: blog.views + 1,
      });
    } catch (error) {
      console.error("Error updating view count: ", error);
    }
    setIndex(3);
    // Navigate to the blog post page
    navigate(`/blogpost/${blog.id}`);

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  const share = async () => {
    try {
      await navigator.share({
        title: "Odisha Weather Website",
        url: `https://odishaweather.com/#${shareUrl}`,
        image: post.thumbnail,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }

    ReactGA.event({
      category: `Blogpost_${post.title} Shared`,
      action: `Blogpost_${post.title} Shared`,
    });
  };

  const logGoogleUser = async () => {
    const { user } = await signUpWithGooglePopup();
    createUserDocumentFromAuth(user);
    const userdata = getAllUsers.find((userdata) => user.uid === userdata.uid);
    localStorage.setItem("admin", JSON.stringify(user));
    try {
      localStorage.setItem("UserData", JSON.stringify(userdata));
    } catch (error) {
      console.error("Failed to stringify userdata:", error);
    }
    const userData = JSON.parse(localStorage.getItem("UserData"));
    const likedPostsArray = userData ? userData.likedPosts : [];
    setLikedPosts(likedPostsArray);
    logEvent(analytics, "login_button_pressed"); // Log login button press event
    setCurrentUser(user);
  };

  const handleLike = async () => {
    const userDocRef = doc(db, "users", currentUser.uid);
    const postDocRef = doc(db, "blogposts", postId);
    try {
      // Check if post is already liked
      const userData = JSON.parse(localStorage.getItem("UserData"));
      const likedPostsArray = userData.likedPosts || [];
      const alreadyLiked = likedPostsArray.includes(postId);
      const updatedLikedPosts = alreadyLiked
        ? likedPostsArray.filter((id) => id !== postId)
        : [...likedPostsArray, postId];
      setLikedPosts(updatedLikedPosts);

      if (alreadyLiked) {
        await updateDoc(userDocRef, { likedPosts: updatedLikedPosts });
        await updateDoc(postDocRef, { likes: post.likes - 1 });
        logEvent(analytics, "post_liked", {
          postId: postId,
          // Optionally, you can include additional information about the user who liked the post
          userId: currentUser.uid,
        });
      } else {
        await updateDoc(userDocRef, { likedPosts: updatedLikedPosts });
        await updateDoc(postDocRef, { likes: post.likes ? post.likes + 1 : 1 });
        logEvent(analytics, "post_disliked", {
          postId: postId,
          // Optionally, you can include additional information about the user who liked the post
          userId: currentUser.uid,
        });
      }

      // Update local storage with updated liked posts
      userData.likedPosts = updatedLikedPosts;
      localStorage.setItem("UserData", JSON.stringify(userData));
    } catch (error) {
      console.log("Error:", error);
    }

    ReactGA.event({
      category: `Blogpost_${post.title} LikeButton`,
      action: `Blogpost_${post.title} LikeButton Clicked`,
    });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("UserData"));
    if (userData) {
      setLikedPosts(userData.likedPosts || []);
    }
  }, [post, postId]);

  return (
    <div
      className="overflow-x-hidden"
      style={{ backgroundColor: "#B4B4B8", color: "black" }}
    >
      <div className="px-6 py-8">
        <div className="w-full">
          <main className="mt-1-10">
            <div className="mb-5 md:mb-0 w-full max-w-screen-md mx-auto">
              <h1 className="font-bold text-5xl mb-6">{post.title}</h1>
              <div className="flex">
                <img
                  className="h-10 w-10 rounded-full object-cover cursor-pointer transition-transform transform hover:scale-125"
                  src={post.profileImageUrl}
                  alt="profileimage"
                />
                <Link to="/aboutus">
                  <p className="font-semibold text-lg items-center px-2 py-1 hover:underline cursor-pointer">
                    {post.author.name}
                  </p>
                </Link>
              </div>
              {post.editedAt ? (
                <>
                  <p className="font-semibold text-lg">
                    Edited:{" "}
                    {post.editedAt.toDate().toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-lg">
                    Created:{" "}
                    {post.createdAt.toDate().toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </>
              )}

              <div className="mt-5 shadow-lg rounded-md">
                <img
                  className="rounded-t-md w-full h-pull z-0 object-cover"
                  src={post.thumbnail}
                  alt="thumbnail"
                />
                <p className="text-sm bg-white font-medium p-2 rounded-b-md">
                  {post.excerpt}
                </p>
              </div>
            </div>
            <div className="max-w-screen-md mx-auto text-lg leading-relaxed border-b-2 border-gray-300">
              <FetchedQuillContent
                content={post.content}
                postId={postId}
                post={post}
              />
            </div>
            <div className="px-4 lg:px-0 max-w-screen-md mx-auto text-lg leading-relaxed border-b-2 border-gray-300 mb-4">
              <div className="flex justify-between py-2 my-1">
                <div className="flex">
                  {currentUser ? (
                    <button onClick={handleLike} className="focus:outline-none">
                      {likedPosts.includes(postId) ? (
                        <BiSolidLike className="text-red-500" />
                      ) : (
                        <BiLike className="text-gray-800" />
                      )}
                    </button>
                  ) : (
                    <BiLike className="text-gray-500" />
                  )}
                  {typeof post.likes === "undefined" ? (
                    <p className="w-5 h-5 text-sm ml-1">0</p>
                  ) : (
                    <p className="w-5 h-5 text-sm ml-1">{post.likes}</p>
                  )}
                  <LiaComment className="w-5 h-5 ml-2" />
                  {typeof post.comments === "undefined" ? (
                    <p className="w-5 h-5 text-sm ml-1">0</p>
                  ) : (
                    <p className="w-5 h-5 text-sm ml-1">
                      {post.comments.length}
                    </p>
                  )}
                </div>
                <div>
                  <AiOutlineShareAlt
                    onClick={() => share()}
                    className="w-5 h-5 ml-2 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </main>
          <div className="md:flex justify-center md:mx-12 md:gap-5">
            <div className="w-full mb-5 md:w-1/2 md:mb-0">
              {currentUser ? (
                <CommentBox postId={postId} />
              ) : (
                <h1 className="text-lg font-bold text-gray-700 md:text-2xl mt-10 ml-1 md:ml-12 mb-[-10px] text-center">
                  If you want to comment please{" "}
                  <button
                    className="bg-red-500 px-1 text-[#B0C5A4] transition-transform transform hover:scale-105 rounded-lg shadow-lg"
                    onClick={logGoogleUser}
                  >
                    Sign Up
                  </button>
                </h1>
              )}
            </div>
            {/*<div className="w-full mb-5 md:w-1/2 md:mb-0">
              <Subscriptionbox />
            </div>*/}
          </div>
          {post.comments ? <Commentposts post={post} postId={postId} /> : null}
        </div>
        <Morefromauthor post={post} postId={postId} handleClick={handleClick} />
        <Morefromcategory
          post={post}
          postId={postId}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default FullPost;
