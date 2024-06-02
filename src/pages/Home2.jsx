import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Authors from "../components/Authors";
import IntroPosts2 from "../components/IntroPosts2";
import Weatherwidget from "../components/Weatherwidget";
import Carousel from "../components/Featuredblogposts";
import { BlogContext } from "../context/blog.context";
import translateText from "../GoogleTranslate";
import { analytics } from "../firebase-config";
import { logEvent } from "firebase/analytics";

function Home2() {
  const { getAllBlogs } = useContext(BlogContext);
  const [currentCategoryType, setCurrentCategoryType] =
    useState("All India Posts");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const start = (page - 1) * 6;
  const end = start + 6;

  // Log a screen_view event when the component mounts
  useEffect(() => {
    logEvent(analytics, "screen_view", {
      firebase_screen: "Home2",
      firebase_screen_class: "Home2",
    });
  }, []);

  const handlePrevClick = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  const handleNextClick = () => {
    if (end < getAllBlogs.length) {
      setPage((page) => page + 1);
    }
  };

  const getBlogsByTime = (time) => {
    setPage(1);
    if (posts.length) {
      if (time != "Latest") {
        setPosts(
          getAllBlogs.filter(
            (blog) =>
              new Date(blog.createdAt * 1000) - new Date().getTime() == time
          )
        );
      } else {
        setPosts(getAllBlogs);
      }
    } else {
      setPosts(getAllBlogs);
    }
  };

  const getBlogs = (category) => {
    if (category === "All Posts") {
      setPosts(getAllBlogs);
    } else {
      const allodiaposts = getAllBlogs.filter(
        (blog) => blog.allIndiaPost === "NO"
      );
      setPosts(allodiaposts.filter((blog) => blog.category === category));
    }
    setPage(1);
  };

  const featuredPosts = getAllBlogs.filter(
    (blog) => blog.featuredBlogPostsValue === "1"
  );

  const categoryTypes = Array.from(
    new Set(getAllBlogs.map((obj) => obj.category))
  );

  useEffect(() => {
    setPosts(
      currentCategoryType === "All India Posts"
        ? getAllBlogs.filter((blog) => blog.allIndiaPost !== "YES")
        : getAllBlogs.filter((blog) => blog.allIndiaPost === "YES")
    );
  }, [currentCategoryType, getAllBlogs]);
  return (
    <Layout>
      <div className="overflow-x-hidden bg-[#B4B4B8]">
        <h1 class="text-xl font-bold md:text-2xl mt-10 ml-6 md:ml-12 mb-[-10px]">
          Trending Post
        </h1>
        <div className="px-6 md:px-14 pt-8">
          <div className="m-auto">
            <Carousel fposts={featuredPosts} key={featuredPosts.id} />
          </div>
        </div>
        <div className="px-6 py-8">
          <div className="container flex flex-col lg:flex-row justify-between mx-auto">
            <div className="w-full lg:w-8/12 mb-4 lg:mb-0">
              <div className="w-full lg:hidden mb-10">
                <Weatherwidget />
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl hidden font-bold ml-4 md:text-2xl md:block">
                  Post
                </h1>
                <div className="flex justify-between gap-3 ml-3">
                  {currentCategoryType === "All India Posts" ? (
                    <button
                      onClick={() => setCurrentCategoryType("Odia Posts")}
                      className="w-full px-2 whitespace-nowrap text-gray-800 rounded-md shadow-sm border-none focus:outline-none"
                      style={{ backgroundColor: "#B5C0D0" }}
                    >
                      India Posts
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentCategoryType("All India Posts")}
                      className="w-full px-2 whitespace-nowrap text-gray-800 rounded-md shadow-sm border-none focus:outline-none"
                      style={{ backgroundColor: "#B5C0D0" }}
                    >
                      Odia Posts
                    </button>
                  )}
                  {currentCategoryType !== "All India Posts" ? null : (
                    <select
                      onChange={(e) => getBlogs(e.target.value)}
                      className="w-[110%] md:w-full text-gray-800 rounded-md shadow-sm border-none focus:outline-none"
                      style={{ backgroundColor: "#B5C0D0" }}
                    >
                      <option value="All Posts">All Posts</option>
                      {categoryTypes.map((category) => (
                        <option value={category}>{category}</option>
                      ))}
                    </select>
                  )}

                  <select
                    onChange={(e) => getBlogsByTime(e.target.value)}
                    className="w-full text-gray-800 rounded-md shadow-sm border-none focus:outline-none"
                    style={{ backgroundColor: "#B5C0D0" }}
                  >
                    <option value="latest">Latest</option>
                    {getAllBlogs.find(
                      (blog) =>
                        new Date(blog.createdAt * 1000).getTime() -
                          new Date().getTime() ==
                        7
                    ) ? (
                      <option value="7">Last Week</option>
                    ) : null}
                    {getAllBlogs.find(
                      (blog) =>
                        new Date(blog.createdAt * 1000) -
                          new Date().getTime() ==
                        30
                    ) ? (
                      <option value="30">Last Month</option>
                    ) : null}
                  </select>
                </div>
              </div>
              <div className="mt-5 rounded-lg py-1">
                <section class="transition-all duration-150 px-1 py-6 w-full gap-5 grid md:grid-cols-3 sm:grid-cols-1">
                  {posts.slice(start, end).map((item) => (
                    <IntroPosts2 post={item} key={item.id} />
                  ))}
                </section>
              </div>
              <div className="mt-8">
                <div className="flex justify-center">
                  <button
                    onClick={handlePrevClick}
                    className="px-3 py-2 mx-1 font-medium text-black bg-white rounded-md focus:outline-none"
                  >
                    previous
                  </button>
                  {posts.length == 0 ? (
                    <div>
                      {Array.from(
                        {
                          length: Math.min(
                            3,
                            Math.ceil(getAllBlogs.length / 6)
                          ),
                        },
                        (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setPage(i + (page - 1) * 3 + 1)}
                            className={`px-3 py-2 mx-1 font-medium text-black bg-white rounded-md focus:outline-none ${
                              page === i + (page - 1) * 3 + 1
                                ? "bg-gray-300 text-black"
                                : ""
                            }`}
                          >
                            {i + (page - 1) * 3 + 1}
                          </button>
                        )
                      )}
                    </div>
                  ) : (
                    <div>
                      {Array.from(
                        {
                          length: Math.min(
                            3,
                            Math.ceil(posts.length / 6) - page + 1
                          ),
                        },
                        (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setPage(i + page)}
                            className={`px-3 py-2 mx-1 font-medium text-black bg-white rounded-md focus:outline-none ${
                              page === i + page - 1
                                ? "bg-gray-300 text-black"
                                : ""
                            }`}
                          >
                            {i + page}
                          </button>
                        )
                      )}
                    </div>
                  )}
                  <button
                    onClick={handleNextClick}
                    className="px-3 py-2 mx-1 font-medium bg-white text-black rounded-md focus:outline-none"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden w-full lg:w-4/12 lg:block">
              <Weatherwidget />
              <Authors />
            </div>
          </div>
        </div>
      </div>
      {/*{currentUser ? <PostFormWidget /> : null}*/}
    </Layout>
  );
}

export default Home2;
