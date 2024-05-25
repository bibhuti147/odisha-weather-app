import React from "react";
import { LuPencilLine } from "react-icons/lu";
import { Link } from "react-router-dom";
const PostFormWidget = () => {
  return (
    <div class="relative">
      <button class="z-20 text-white flex flex-col shrink-0 grow-0 justify-around fixed bottom-0 right-5 rounded-lg mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10">
        <div class="flex group">
          <div class=" absolute -left-[125px] top-[10px] px-4 py-2 bg-slate-200 text-black rounded-lg text-lg opacity-0 transition duration-300 transform -translate-x-full group-hover:opacity-100 group-hover:translate-x-0">
            Create Post
          </div>
          <div class="p-3 border-4 border-white bg-green-600 transition duration-500 transform hover:-translate-y-1 inline-block hover:bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            <Link to="/createpost">
              <svg
                class="w-10 h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 "
                fill="currentColor"
                viewBox="-1 -1 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <LuPencilLine />
              </svg>
            </Link>
          </div>
        </div>
      </button>
    </div>
  );
};

export default PostFormWidget;
