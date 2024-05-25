import React from "react";

const Replycommentbox = () => {
  return (
    <div>
      <form className="max-w-2xl  bg-white rounded-lg border p-2 mx-auto mt-4">
        <div className="px-3 mb-2 mt-2">
          <textarea
            placeholder="Comment"
            className="w-96 bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
          ></textarea>
        </div>
        <div className="flex justify-end px-4">
          <input
            type="submit"
            className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
            value="Comment"
          />
        </div>
      </form>
    </div>
  );
};

export default Replycommentbox;
