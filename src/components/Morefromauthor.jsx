import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/blog.context";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { AiOutlineShareAlt } from "react-icons/ai";

const Morefromauthor = ({ post, postId, handleClick }) => {
  const { getAllBlogs } = useContext(BlogContext);
  const [index, setIndex] = useState(3);
  const [isOpen, setIsOpen] = useState(0);

  const posts = getAllBlogs.filter(
    (blog) => blog.id != postId && blog.author.id === post.author.id
  );

  const share = async (blog) => {
    try {
      await navigator.share({
        title: "Odisha Weather Website",
        url: `https://odishaweather.com/#/blogpost/${blog.id}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const end = () => {
    if (index != 3) {
      if (posts.length - index < 3) {
        setIndex(posts.length);
      } else {
        setIndex(index + 3);
      }
    }
  };

  useEffect(() => {
    end();
  }, [index, postId]);

  return (
    <div className="text-center">
      <h1 class="text-lg text-left font-bold text-gray-700 md:text-2xl mt-10 ml-8 md:ml-12 mb-[-10px]">
        More From Author
      </h1>
      <section class="transition-all duration-150 sm:px-3 md:px-12 py-6 w-full gap-5 grid md:grid-cols-3 sm:grid-cols-1">
        {posts.slice(0, index).map((blog) => (
          <div
            className="rounded-lg shadow-lg hover:shadow-2xl w-full"
            style={{ backgroundColor: "#ffffff", color: "#000" }}
          >
            <div class="relative md:flex-shrink-0">
              <img
                src={blog.thumbnail}
                alt="Blog Cover"
                onClick={() => handleClick(blog, setIndex)}
                class="object-cover w-full rounded-t-lg md:h-56 h-48"
              />
              <button
                onClick={() => setIsOpen(!isOpen)}
                class="absolute top-2 right-2 bg-white text-black py-2 px-2 rounded-md focus:outline-none"
              >
                <PiDotsThreeOutlineVerticalFill />
              </button>
              <div class="absolute top-2 right-12">
                <button
                  onClick={() => share(blog)}
                  class="bg-white text-black py-2 px-2 rounded-md focus:outline-none"
                >
                  <AiOutlineShareAlt />
                </button>
              </div>
              {isOpen ? (
                <div class="absolute top-11 right-2 bg-gray-800 text-white text-sm py-2 px-2 rounded-md font-semibold">
                  CATEGORY : {post.category}
                </div>
              ) : null}
              <div
                onClick={() => handleClick(blog, setIndex)}
                class="flex items-center justify-center px-4 py-2 overflow-hidden"
              >
                <div class="flex flex-row items-center">
                  <div class="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    <span>
                      {typeof blog.views == "undefined" ? (
                        <span>0</span>
                      ) : (
                        <span>{blog.views}</span>
                      )}
                    </span>
                  </div>

                  <div class="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      ></path>
                    </svg>
                    {typeof blog.comments == "undefined" ? (
                      <span>0</span>
                    ) : (
                      <span>{blog.comments.length}</span>
                    )}
                  </div>

                  <div class="text-xs font-medium text-gray-500 flex flex-row items-center">
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      ></path>
                    </svg>
                    <span>
                      {typeof blog.likes == "undefined" ? (
                        <span>0</span>
                      ) : (
                        <span>{blog.likes}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <hr class="border-gray-300" />
            <div
              onClick={() => handleClick(blog, setIndex)}
              class="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto"
            >
              <span>
                <h2 class="text-2xl font-bold tracking-normal line-clamp-1">
                  {blog.title}
                </h2>
              </span>
            </div>
            <section class="px-4 py-2 my-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center flex-1">
                  <img
                    class="object-cover h-10 rounded-full"
                    src={blog.profileImageUrl}
                    alt="Avatar"
                  />
                  <div class="flex flex-col mx-2">
                    <span class="font-semibold hover:underline cursor-default">
                      {blog.author.name}
                    </span>
                    <span class="text-xs text-left">
                      {blog.createdAt.toDate().toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
                {/*<p class="mt-1 text-xs text-gray-600">9 minutes read</p>*/}
              </div>
            </section>
          </div>
        ))}
      </section>
      {index != posts.length && posts.length > 3 ? (
        <button
          onClick={() => setIndex((index) => index + 3)}
          className="items-center text-center px-10 py-1 text-lg bg-white text-black font-semibold rounded-xl ring-2 ring-slate-300 hover:ring-slate-400 focus:outline-none"
        >
          See More Posts
        </button>
      ) : (
        <button
          onClick={() => setIndex(3)}
          className={`items-center text-center px-10 py-1 text-lg bg-white text-black font-semibold rounded-xl ring-2 ring-slate-300 hover:ring-slate-400 focus:outline-none ${
            posts.length <= 3 ? "disabled:opacity-50" : ""
          }`}
        >
          No More Posts...
        </button>
      )}
    </div>
  );
};

export default Morefromauthor;
