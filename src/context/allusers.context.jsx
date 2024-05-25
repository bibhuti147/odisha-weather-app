import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useState, createContext, useEffect } from "react";
import { db } from "../firebase-config";

export const AllUsersContext = createContext({
  getAllUsers: null,
  setGetAllUsers: () => null,
});

export const AllUserProvider = ({ children }) => {
  const [getAllUsers, setGetAllUsers] = useState([]);

  useEffect(() => {
    let unsubscribe; // Declare unsubscribe variable here
    const getUsers = () => {
      try {
        const q = query(collection(db, "users"));
        unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let userArray = [];
          QuerySnapshot.forEach((doc) => {
            userArray.push({ ...doc.data(), id: doc.id });
          });
          userArray.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
          setGetAllUsers(userArray);
        });
      } catch (error) {
        console.log("Error getting the blogs: ", error);
      }
    };

    getUsers();

    return () => {
      // Cleanup function
      if (unsubscribe) {
        unsubscribe(); // Call unsubscribe if it's defined
      }
    };
  }, []);

  // Blog Delete Function
  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      getUsers();
      toast.success("Blogs deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const value = { getAllUsers };
  return (
    <AllUsersContext.Provider value={value}>
      {children}
    </AllUsersContext.Provider>
  );
};
