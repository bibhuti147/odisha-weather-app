import React from "react";
import { LuMailPlus } from "react-icons/lu";

const Aboutauthor = ({ post }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg px-10 py-8 items-center mx-12">
      <div className="container px-0 mx-auto sm:px-5">
        <img
          src={post.profileImageUrl}
          alt="profile"
          class="rounded-full w-15 h-15 object-cover"
        ></img>
        <div className="flex justify-between">
          <div>
            <h1 className="text-black text-xl font-bold">
              Written by {post.author.name}
            </h1>
          </div>
          <div>
            <button className="flex bg-green-600 hover:bg-green-800 text-base text-white font-semibold rounded-2xl px-4 py-1">
              Subscribe
              <LuMailPlus className="ml-2 mt-1" />
            </button>
          </div>
        </div>
        <div>About Author</div>
      </div>
    </div>
  );
};

export default Aboutauthor;
