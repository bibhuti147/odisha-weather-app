import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { db, signOutUser } from "../firebase-config";
import { BlogContext } from "../context/blog.context";
import { AdminContext } from "../context/admin.context";
import { deleteDoc, doc } from "firebase/firestore";

const AdminDashboard = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { adminUser } = useContext(AdminContext);
  const { getAllBlogs } = useContext(BlogContext);
  const postId = useParams().adminId;
  const navigate = useNavigate();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const admin = currentUser
    ? adminUser.find((user) => user.uid === currentUser.uid)
    : null;
  if (admin) {
    if (currentUser.uid != postId) navigate("/");
  }

  const adminBlogs = getAllBlogs.filter((blog) => blog.author.id === admin.uid);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
    navigate("/");
  };

  // Blog Delete Function
  const deleteBlogs = async (id) => {
    try {
      await deleteDoc(doc(db, "blogposts", id));
      toast.success("Blogs deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    null;
  }, [getAllBlogs]);

  return (
    <Layout>
      <div className="py-10">
        <div className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
          <div className="left">
            <img
              className=" w-40 h-40  object-cover rounded-full border-2 border-pink-600 p-1"
              src={admin.photoURL}
              alt="profile"
            />
          </div>
          <div className="right">
            <h1
              className="text-center font-bold text-2xl mb-2"
              style={{ color: "black" }}
            >
              {admin.displayName}
            </h1>
            <h2 style={{ color: "black" }} className="font-semibold">
              {admin.email}
            </h2>
            <h2 style={{ color: "black" }} className="font-semibold">
              <span>Total Blog : </span> {adminBlogs.length}
            </h2>
            <div className=" flex gap-2 mt-2">
              <Link to="/createpost">
                <div className=" mb-2">
                  <button
                    style={{
                      background: "rgb(30, 41, 59)",
                      color: "white",
                    }}
                    className="px-8 py-2"
                  >
                    create blog
                  </button>
                </div>
              </Link>
              <div className="mb-2">
                <button
                  onClick={signOutHandler}
                  style={{
                    background: "rgb(30, 41, 59)",
                    color: "white",
                  }}
                  className="px-8 py-2"
                >
                  logout
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Line  */}
        <hr className="border-2 border-gray-400" />
        {/* Table  */}
        <div className="">
          <div className=" container mx-auto px-4 max-w-7xl my-5">
            <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
              {/* table  */}
              <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500">
                {/* thead  */}
                <thead
                  style={{
                    background: "rgb(30, 41, 59)",
                  }}
                  className="text-xs"
                >
                  <tr>
                    <th
                      style={{ color: "white" }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      S.No
                    </th>
                    <th
                      style={{ color: "white" }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Thumbnail
                    </th>
                    <th
                      style={{ color: "white" }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Title
                    </th>
                    <th
                      style={{ color: "white" }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Category
                    </th>
                    <th
                      style={{ color: "white" }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Date
                    </th>
                    <th
                      style={{ color: "white" }}
                      scope="col"
                      className="px-6 py-3"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                {/* tbody  */}

                {adminBlogs.length > 0 ? (
                  <>
                    {adminBlogs.map((blog, index) => {
                      return (
                        <tbody>
                          <tr
                            className=" border-b-2"
                            style={{ background: "white" }}
                          >
                            {/* S.No   */}
                            <td
                              style={{ color: "black" }}
                              className="px-6 py-4"
                            >
                              {index + 1}.
                            </td>
                            {/* Blog Thumbnail  */}
                            <th
                              style={{ color: "black" }}
                              scope="row"
                              className="px-6 py-4 font-medium "
                            >
                              {/* thumbnail  */}
                              <img
                                className="w-16 rounded-lg"
                                src={blog.thumbnail}
                                alt="thumbnail"
                              />
                            </th>
                            {/* Blog Title  */}
                            <td
                              style={{ color: "black" }}
                              className="px-6 py-4"
                            >
                              {blog.title}
                            </td>
                            {/* Blog Category  */}
                            <td
                              style={{ color: "black" }}
                              className="px-6 py-4"
                            >
                              {blog.category}
                            </td>
                            {/* Blog Date  */}
                            <td
                              style={{ color: "black" }}
                              className="px-6 py-4"
                            >
                              <p className="text-black whitespace-nowrap">
                                Created At:
                              </p>
                              {blog.createdAt.toDate().toLocaleString()}{" "}
                              {blog.editedAt && (
                                <>
                                  <p className="text-black whitespace-nowrap">
                                    Edited At:
                                  </p>
                                  {blog.editedAt.toDate().toLocaleString()}
                                </>
                              )}
                            </td>
                            {/* Delete Blog  */}
                            <td
                              style={{ color: "black" }}
                              className="px-6 py-4 flex justify-center gap-2"
                            >
                              <button
                                onClick={() => deleteBlogs(blog.id)}
                                className=" px-4 py-1 rounded-lg text-white font-bold bg-red-500 focus:outline-none"
                              >
                                {" "}
                                Delete
                              </button>
                              <Link to={`/blogedit/${blog.id}`}>
                                <button className=" px-4 py-1 rounded-lg text-white font-bold bg-green-500 focus:outline-none">
                                  {" "}
                                  Edit
                                </button>
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <h1>No Posts Found</h1>
                  </>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
