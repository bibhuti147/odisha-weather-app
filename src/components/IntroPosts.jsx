import React from "react";
import { Link } from "react-router-dom";

const IntroPosts = ({ post }) => {
  return (
    <div class="mt-6">
      <div class="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md">
        <div class="flex items-center justify-between">
          <span class="font-light text-gray-600"></span>
          <div class="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">
            {post.category}
          </div>
        </div>
        <div className="relative overflow-hidden shadow-md pb-80 mb-6 mt-4">
          <img
            src={post.thumbnail}
            alt=""
            className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
            loading="lazy"
          />
        </div>
        <div class="mt-2">
          <div class="text-2xl font-bold text-gray-700 hover:underline">
            {post.title}
          </div>
          <p class="mt-2 text-gray-600">{post.excerpt}</p>
        </div>
        <div class="flex items-center justify-between mt-4">
          <Link to={`/blogpost/${post.id}`}>
            <span class="text-blue-500 transition duration-500 transform hover:bg-black hover:text-white text-base font-medium px-1 py-2 rounded-full">
              Continue Reading
            </span>
          </Link>
          <div>
            <div class="flex items-center">
              <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                <svg
                  class="w-4 h-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                24
              </span>
              <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                <svg
                  class="w-4 h-4 mr-1"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
                89
              </span>
              <img
                src={post.profileImageUrl}
                alt="avatar"
                class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              />
              <h1 class="font-bold text-gray-700 hover:underline">
                {post.author.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPosts;
