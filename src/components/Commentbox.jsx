import React, { useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { analytics, db } from "../firebase-config";
import { logEvent } from "firebase/analytics";

function CommentBox({ postId }) {
  const { currentUser } = useContext(UserContext);
  const [comment, setComment] = useState();

  const handlecomment = async (e) => {
    e.preventDefault();
    if (currentUser) {
      const postDocRef = doc(db, "blogposts", postId);
      const profileImageUrl = currentUser.photoURL;
      const createdAt = new Date();
      const profileId = currentUser.uid;

      try {
        // Update the blogposts document with the new comment field
        await updateDoc(postDocRef, {
          comments: arrayUnion({
            name: currentUser.displayName,
            date: createdAt,
            dp: profileImageUrl,
            commenttext: comment,
            commenterid: profileId,
          }),
        });

        logEvent(analytics, "comment_posted", {
          userId: profileId,
          postId: postId,
          comment_text: comment,
          timestamp: createdAt.toISOString(),
        });

        setComment("");
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    }
  };
  return (
    <div class="px-6 py-5 bg-slate-100 rounded-xl shadow-lg">
      <h2 class="text-xl mb-4 tracking-wider font-lighter text-gray-900 dark:text-gray-200">
        Leave a Comment
      </h2>
      <p class="text-gray-600 mb-4">
        Your email address will not be published.*
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="mb-4 col-span-1 md:col-span-3">
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            class="w-full px-3 py-2 rounded-sm border dark:border-none border-gray-300 focus:outline-none border-solid focus:border-dashed resize-none"
            placeholder="Type Comment...*"
            rows="5"
            required
          ></textarea>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          onClick={handlecomment}
          class="py-4 px-6 bg-blue-950 text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 rounded-full"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}

export default CommentBox;
