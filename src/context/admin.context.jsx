import { collection, onSnapshot, query } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebase-config";

export const AdminContext = createContext({
  adminUser: null,
  setAdminUser: () => null,
});

export const AdminProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState([]);

  useEffect(() => {
    let unsubscribe;
    const getAdmins = () => {
      try {
        const q = query(collection(db, "admins"));
        unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let adminArray = [];
          QuerySnapshot.forEach((doc) => {
            adminArray.push({ ...doc.data(), id: doc.id });
          });
          adminArray.sort((a, b) => {
            if (a.power === b.power) {
              return 0;
            } else if (a.power) {
              return -1;
            } else {
              return 1;
            }
          });
          setAdminUser(adminArray);
        });
      } catch (error) {
        console.log("Error getting admins: ", error);
      }
    };

    getAdmins();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const value = { adminUser };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
