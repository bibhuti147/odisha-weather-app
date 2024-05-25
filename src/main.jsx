import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/user.context.jsx";
import { BlogProvider } from "./context/blog.context.jsx";
import { AdminProvider } from "./context/admin.context.jsx";
import { AllUserProvider } from "./context/allusers.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminProvider>
      <AllUserProvider>
        <BlogProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </BlogProvider>
      </AllUserProvider>
    </AdminProvider>
  </React.StrictMode>
);
