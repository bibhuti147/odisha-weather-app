import { React, useContext, useState } from "react";
import logo from "../assets/images/logo.svg";
import logo2 from "../assets/images/logo2.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { signOutUser } from "../firebase-config";
import { IoCreateOutline } from "react-icons/io5";
import { AdminContext } from "../context/admin.context";

function Header() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { adminUser } = useContext(AdminContext);
  let admin;

  if (currentUser) {
    admin = adminUser.find((user) => user.uid === currentUser.uid);
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const signOutHandler = async () => {
    await signOutUser();
    localStorage.clear();
    setCurrentUser(null);
  };

  return (
    <nav
      className="bg-[#C40C0C] font-sans flex text-center content-center sm:flex-row sm:text-left sm:justify-between px-2 py-2 sm:px-6 shadow sm:items-baseline w-full"
      style={{ color: "#FF8A08" }}
    >
      <div className="mt-1 mb-2 mr-4 sm:mb-0 sm:mr-0 flex flex-row ">
        <div className="mr-2">
          <img className="size-12 rounded-full" src={logo2} />
        </div>
        <div>
          <Link
            to="/"
            className="text-2xl no-underline hover:text-blue-dark font-sans font-bold"
          >
            OdishaWeather
          </Link>
          <br />
          <span className="text-xs">Weather Analysis of Odisha.</span>
        </div>
      </div>

      <div className="sm:mb-0 flex self-end mb-2">
        <input
          class="hidden sm:block border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
        />
        <p className="px-2 pt-3">About us</p>
        {admin ? (
          <div className="flex gap-2">
            <Link to="/createpost">
              <button className="focus:outline-none">
                <IoCreateOutline
                  style={{ color: "white" }}
                  className="bg-green-600 rounded-md items-center hover:p-1"
                  size={40}
                />
              </button>
            </Link>
            <div className="relative inline-block text-left">
              <button
                id="dropdownButton"
                onClick={toggleDropdown}
                className=" bg-gray-300 text-black hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-[9px] text-center inline-flex items-center"
                type="button"
              >
                Options{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {isOpen && (
                <div
                  id="dropdownMenu"
                  className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-[155px] dark:bg-gray-700 left-[-24px]"
                  aria-labelledby="dropdownButton"
                >
                  <ul class="space-y-3 py-3 pl-4 pr-2">
                    <li class="font-medium">
                      <div class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent text-black hover:border-indigo-700">
                        <div class="mr-3">
                          <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                          </svg>
                        </div>
                        <Link to={`/dashboard/${currentUser.uid}`}>
                          Dashboard
                        </Link>
                      </div>
                    </li>
                    <hr class="dark:border-gray-700" />
                    <li class="font-medium">
                      <div class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600">
                        <div class="mr-3 text-red-600">
                          <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            ></path>
                          </svg>
                        </div>
                        <button
                          className="text-red-600"
                          onClick={signOutHandler}
                        >
                          Logout
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <img
              src={currentUser.photoURL}
              alt="profile"
              class="rounded-full w-10 h-10 object-cover"
            ></img>
          </div>
        ) : (
          <button class="group relative h-[38px] w-24 overflow-hidden rounded-lg bg-gray-200 text-lg font-medium px-5 text-center">
            <Link to="/authentication">Login</Link>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;
