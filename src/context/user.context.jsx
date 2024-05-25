import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  likedPosts: [],
  setLikedPosts: () => {},
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("admin"))
  );

  const [likedPosts, setLikedPosts] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("UserData"));
    return userData && userData.likedPosts ? userData.likedPosts : [];
  });

  useEffect(() => {
    // Update localStorage when likedPosts changes
    const userData = JSON.parse(localStorage.getItem("UserData")) || {};
    userData.likedPosts = likedPosts;
    localStorage.setItem("UserData", JSON.stringify(userData));
  }, [likedPosts]);

  const value = { currentUser, setCurrentUser, likedPosts, setLikedPosts };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
