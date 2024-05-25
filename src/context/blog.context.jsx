import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useState, createContext, useEffect } from "react";
import { db } from "../firebase-config";

export const BlogContext = createContext({
  getAllBlogs: null,
  setGetAllBlogs: () => null,
});

export const BlogProvider = ({ children }) => {
  const [getAllBlogs, setGetAllBlogs] = useState([]);

  useEffect(() => {
    let unsubscribe; // Declare unsubscribe variable here
    const getBlogs = () => {
      try {
        const q = query(collection(db, "blogposts"));
        unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let blogArray = [];
          QuerySnapshot.forEach((doc) => {
            blogArray.push({ ...doc.data(), id: doc.id });
          });
          blogArray.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
          setGetAllBlogs(blogArray);
        });
      } catch (error) {
        console.log("Error getting the blogs: ", error);
      }
    };

    getBlogs();

    return () => {
      // Cleanup function
      if (unsubscribe) {
        unsubscribe(); // Call unsubscribe if it's defined
      }
    };
  }, []);

  // Blog Delete Function
  const deleteBlogs = async (id) => {
    try {
      await deleteDoc(doc(db, "blogposts", id));
      getBlogs();
      toast.success("Blogs deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const value = { getAllBlogs };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
