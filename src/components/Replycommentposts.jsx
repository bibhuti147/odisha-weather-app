import React from "react";

const Replycommentposts = () => {
  return (
    <div class="flex flex-row pt-1 ml-10 md:ml-16">
      <img
        class="w-12 h-12 border-2 border-gray-300 rounded-full"
        alt="Emily's avatar"
        src="https://images.unsplash.com/photo-1581624657276-5807462d0a3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80"
      />
      <div class="flex-col mt-1">
        <div class="flex items-center flex-1 px-4 font-bold leading-tight">
          Emily
          <span class="ml-2 text-xs font-normal text-gray-500">5 days ago</span>
        </div>
        <div class="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
          I created it using TailwindCSS
        </div>
        <button class="inline-flex items-center px-1 pt-2 ml-1 flex-column">
          <BiLike class="w-5 h-5 ml-2 text-gray-600 cursor-pointer hover:text-gray-700" />
        </button>
        <button className="inline-flex items-center px-1 -ml-1 flex-column">
          <FaReply className="w-5 h-5 text-gray-600 cursor-pointer fill-current hover:text-gray-900" />
        </button>
      </div>
    </div>
  );
};

export default Replycommentposts;
