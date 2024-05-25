import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/admin.context";
import { BlogContext } from "../context/blog.context";

const Authors = () => {
  const { adminUser } = useContext(AdminContext);
  const { getAllBlogs } = useContext(BlogContext);
  const [index, setIndex] = useState(5);

  const numberOfBlogs = (admin) => {
    const filteredBlogs = getAllBlogs.filter(
      (blog) => blog.author.id === admin.uid
    );
    return filteredBlogs.length;
  };

  const end = () => {
    if (index != 5) {
      if (adminUser.length - index < 2) {
        setIndex(adminUser.length);
      } else {
        setIndex(index + 5);
      }
    }
  };

  useEffect(() => {
    end();
  }, [index]);

  return (
    <div class="px-8">
      <h1 class="mb-4 text-xl font-bold text-black">Authors</h1>
      <div
        class="flex flex-col max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md"
        style={{ backgroundColor: "#ffffff", color: "#000" }}
      >
        <ul class="-mx-4">
          {adminUser.slice(0, index).map((author) => (
            <li class="flex items-center my-4">
              <img
                src={author.photoURL}
                alt="avatar"
                class="object-cover w-10 h-10 mx-4 rounded-full"
              />
              <p>
                <Link
                  to={{
                    pathname: "/aboutus",
                    search: `?author=${encodeURIComponent(author.displayName)}`,
                  }}
                  class="mx-[-4px] font-bold hover:underline"
                >
                  {author.displayName}
                </Link>
                <span class="mx-2 text-sm font-light">
                  Created {numberOfBlogs(author)} Posts
                </span>
              </p>
            </li>
          ))}
        </ul>
        {adminUser.length > 5 ? (
          <>
            {index != adminUser.length ? (
              <button
                onClick={() => setIndex((index) => index + 5)}
                className="focus:outline-none"
              >
                <p className="font-semibold text-[#49c5b6] hover:underline text-left hover:text-blue-600">
                  See More...
                </p>
              </button>
            ) : (
              <button
                onClick={() => setIndex(2)}
                className="focus:outline-none"
              >
                <p className="font-semibold text-[#49c5b6] hover:underline text-left">
                  See Less...
                </p>
              </button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Authors;
