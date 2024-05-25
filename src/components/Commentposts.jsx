import React, { useContext, useEffect } from "react";
import { BiLike } from "react-icons/bi";
import { FaReply } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../context/user.context";
import { AdminContext } from "../context/admin.context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const Commentposts = ({ post, postId }) => {
  const { adminUser } = useContext(AdminContext);
  const { currentUser } = useContext(UserContext);

  let admin;

  if (currentUser) {
    admin = adminUser.find((user) => user.uid === currentUser.uid);
  }

  const deletecomment = async (comment) => {
    if (currentUser && currentUser.uid === comment.commenterid) {
      console.log(1);
      const postDocRef = doc(db, "blogposts", postId);
      console.log(2);
      try {
        const postDocSnapshot = await getDoc(postDocRef);
        console.log(3);
        if (postDocSnapshot.exists()) {
          const postData = postDocSnapshot.data();
          console.log(4);
          console.log(comment.date);
          const updatedComments = postData.comments.filter(
            (c) =>
              new Date(c.date.toDate()).getTime() !==
              new Date(comment.date.toDate()).getTime()
          );
          console.log(5);
          await updateDoc(postDocRef, { comments: updatedComments });
          console.log(6);
        }
      } catch (error) {
        console.error("Error deleting comment: ", error);
      }
    } else {
      console.error("User is not authorized to delete this comment.");
    }
  };

  function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
  }

  useEffect(() => {
    null;
  }, []);

  return (
    <section class="relative flex items-center justify-start px-2 md:px-12 py-8 antialiased">
      <div class="container px-0 mx-auto sm:px-5">
        {post.comments.map((comment) => (
          <div class="flex-col w-full py-4 mx-auto mt-3 bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-2/3 rounded-md">
            <div class="flex flex-row ml-1">
              <img
                class="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                alt="user's avatar"
                src={comment.dp}
              />
              <div class="flex-col mt-1">
                <div className="flex justify-between">
                  <div class="flex items-center flex-1 px-4 font-bold leading-tight text-xs md:text-base">
                    {adminUser.find(
                      (admin) => admin.uid === comment.commenterid
                    ) && (
                      <h1 className="px-1 bg-red-500 text-white rounded-md mr-1 font-semibold">
                        Admin
                      </h1>
                    )}
                    {comment.name}
                    <span class="ml-2 text-xs font-normal text-gray-500">
                      {comment.date.toDate().toLocaleString("en-IN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {currentUser && currentUser.uid === comment.commenterid && (
                    <button
                      onClick={() => deletecomment(comment)}
                      class="ml-2 text-xs font-normal text-gray-500 text-end hover:text-red-600 cursor-pointer focus:outline-none"
                    >
                      <MdDelete size={20} />
                    </button>
                  )}
                </div>
                <div class="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                  {comment.commenttext}
                </div>
                {/*<button class="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                  <BiLike class="w-5 h-5  ml-2 text-gray-600 cursor-pointer hover:text-gray-700" />
                </button>
                <button class="inline-flex items-center px-1 -ml-1 flex-column">
                  <FaReply class="w-5 h-5 text-gray-600 cursor-pointer fill-current hover:text-gray-900" />
                </button>*/}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Commentposts;
