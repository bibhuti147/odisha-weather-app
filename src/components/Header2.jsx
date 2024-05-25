import React, { useState } from "react";
import {
  Navbar,
  Typography,
  Avatar,
  Collapse,
  Dialog,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineShareAlt, AiOutlineSearch } from "react-icons/ai";
import logo2 from "../assets/images/logo2.png";
import logo3 from "../assets/images/logo3.png";
import { UserContext } from "../context/user.context";
import {
  analytics,
  createUserDocumentFromAuth,
  signOutUser,
  signUpWithGooglePopup,
} from "../firebase-config";
import { AdminContext } from "../context/admin.context";
import { IoReorderThree } from "react-icons/io5";
import { AllUsersContext } from "../context/allusers.context";
import { BlogContext } from "../context/blog.context";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { logEvent } from "firebase/analytics";

export default function Header2() {
  let admin;
  const [openNav, setOpenNav] = React.useState(false);
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser, setLikedPosts } =
    useContext(UserContext);
  const { getAllUsers } = useContext(AllUsersContext);
  const { getAllBlogs } = useContext(BlogContext);
  const { adminUser } = useContext(AdminContext);
  const [searchText, setSearchText] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const navigate = useNavigate();

  const logGoogleUser = async () => {
    const { user } = await signUpWithGooglePopup();
    createUserDocumentFromAuth(user);
    const userdata = getAllUsers.find((userdata) => user.uid === userdata.uid);
    localStorage.setItem("admin", JSON.stringify(user));
    try {
      localStorage.setItem("UserData", JSON.stringify(userdata));
    } catch (error) {
      console.error("Failed to stringify userdata:", error);
    }
    const userData = JSON.parse(localStorage.getItem("UserData"));
    const likedPosts = userData ? userData.likedPosts : [];
    setLikedPosts(likedPosts);
    logEvent(analytics, "login_button_pressed"); // Log login button press event
    setCurrentUser(user);
  };

  if (currentUser) {
    admin = adminUser.find((user) => user.uid === currentUser.uid);
  }

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const signOutHandler = async () => {
    await signOutUser();
    localStorage.clear();
    logEvent(analytics, "logout_button_pressed"); // Log logout button press event
    setCurrentUser(null);
  };

  const location = useLocation();
  const shareUrl = location.pathname + location.search;

  const share = async () => {
    try {
      await navigator.share({
        title: "Odisha Weather Website",
        url: `https://odishaweather.com/#${shareUrl}`,
        image: logo3,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleSubmit = () => {
    setOpen(!open);
    setOpenNav(!openNav);
  };

  const handleSearch = (searchText) => {
    const posts = searchText
      ? getAllBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : null;
    setFilteredBlogs(posts);
    setSearchText("");
  };

  const handleClick = (post) => {
    navigate(`/blogpost/${post.id}`);
    setOpen(!open);
    setOpenNav(!openNav);
    setSearchText("");
    handleSearch(searchText);
    scrollToTop();
  };

  // All NavList
  const navList = (
    <ul className="mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="search for posts"
        className="w-full h-10 text-black outline-none lg:hidden bg-white border-2 border-gray-300  focus:border-gray-300 focus:ring-0"
      />
      {filteredBlogs && filteredBlogs.length ? (
        filteredBlogs.map((blog) => (
          <div className="bg-white -mt-3 m-auto w-full lg:hidden">
            <div
              onClick={() => handleClick(blog)}
              className="flex m-auto gap-3 py-2 px-1"
            >
              <img
                src={blog.thumbnail}
                alt="blog thumbnail"
                className="w-15 h-12"
              />
              <div>
                <p className="text-black line-clamp-1">{blog.title}</p>
                <p className="text-black whitespace-nowrap">
                  {blog.createdAt.toDate().toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-black bg-white -mt-3 w-full m-auto lg:hidden">
          No Results Found...
        </p>
      )}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal "
        onClick={scrollToTop}
        style={{ color: "white" }}
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </Typography>
      {admin ? (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          onClick={scrollToTop}
          className="p-1 font-normal"
          style={{ color: "white" }}
        >
          <Link to={`/dashboard/${admin.uid}`} className="flex items-center">
            Dashboard
          </Link>
        </Typography>
      ) : null}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        onClick={scrollToTop}
        className="p-1 font-normal"
        style={{ color: "white" }}
      >
        <Link to="/aboutus" className="flex items-center">
          About Us
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        onClick={scrollToTop}
        className="p-1 font-normal"
        style={{ color: "white" }}
      >
        <Link to="/contactus" className="flex items-center">
          Contact Us
        </Link>
      </Typography>
      {currentUser ? (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
          style={{ color: "white" }}
        >
          <button onClick={signOutHandler} className="flex items-center">
            Logout
          </button>
        </Typography>
      ) : (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          onClick={logGoogleUser}
          className="p-1 font-normal cursor-pointer"
          style={{ color: "white" }}
        >
          Login
        </Typography>
      )}
    </ul>
  );

  return (
    <>
      {/* Navbar  */}
      <Navbar
        className="sticky inset-0 z-20 h-max max-w-full border-none rounded-none py-2 px-4 lg:px-8 lg:py-2"
        style={{ background: "rgb(30, 41, 59)" }}
      >
        {/* Desktop View  */}
        <div className="flex items-center justify-between text-blue-gray-900">
          {/* Home Page Link  */}
          <Typography
            as="a"
            className="mr-6 cursor-pointer py-1.5 text-xl font-bold flex gap-2 items-center"
            style={{ color: "white" }}
          >
            {/* Logo Image  */}
            <img
              className="w-10 h-10 rounded-full transition duration-200 ease-in-out transform hover:scale-150"
              src={logo2}
            />
            {/* Logo Text  */}
            <Link to={"/"}>
              <span
                style={{ fontFamily: "Lobster" }}
                className="whitespace-nowrap text-2xl"
              >
                Odisha Weather
              </span>
            </Link>
          </Typography>
          {/* All Items  */}
          <div className="flex items-center gap-2">
            {/* Navlist  */}
            <div className="hidden lg:block">{navList}</div>
            {/* Search Icon */}
            {/* Share Icon */}
            <div>
              <AiOutlineSearch
                onClick={() => handleSubmit()}
                size={20}
                color="white"
                className="cursor-pointer"
              />
            </div>
            {open ? (
              <div className="text-black absolute top-14 right-20 hidden lg:block">
                <input
                  type="text"
                  placeholder="Search for posts"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full bg-white border-2 border-gray-300  focus:border-gray-300 focus:ring-0"
                />
                <FaRegArrowAltCircleRight
                  onClick={() => handleSearch(searchText)}
                  size={20}
                  className="absolute top-[11px] right-1 cursor-pointer hover:text-[#002379]"
                />
                {filteredBlogs ? (
                  filteredBlogs.map((blog) => (
                    <div className="bg-white -mt-1 m-auto w-full hidden lg:block">
                      <div
                        onClick={() => handleClick(blog)}
                        className="flex m-auto gap-3 py-2 px-1 hover:bg-gray-300"
                      >
                        <img
                          src={blog.thumbnail}
                          alt="blog thumbnail"
                          className="w-32 h-15 cursor-pointer"
                        />
                        <div>
                          <p className="text-black whitespace-nowrap cursor-default">
                            {blog.title}
                          </p>
                          <p className="text-black cursor-default">
                            {blog.createdAt.toDate().toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-black bg-white -mt-1 w-full m-auto hidden lg:block">
                    Results not found...
                  </p>
                )}
              </div>
            ) : null}
            {/* Admin Profile Pic */}
            {currentUser ? (
              <div>
                <div className="">
                  <Avatar
                    key={1}
                    src={currentUser.photoURL}
                    alt="avatar"
                    className="p-0.5 rounded-full text-red-500 md:w-14 md:h-10 w-10 h-9"
                  />
                </div>
              </div>
            ) : null}

            {/* dark And Light Button */}

            {/* Mobile Toggle  */}
            <div>
              <div
                className="text-inherit rounded-lg lg:hidden focus:outline-none p-1"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
                style={{
                  background: "#57606f",
                  color: "white",
                }}
              >
                {openNav ? (
                  <IoReorderThree size={30} />
                ) : (
                  <IoReorderThree size={30} />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Mobile View */}
        <Collapse open={openNav}>
          {/* NavList  */}
          <div className="lg:hidden">{navList}</div>
        </Collapse>
      </Navbar>
    </>
  );
}
