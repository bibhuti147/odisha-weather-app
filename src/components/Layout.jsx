import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Header2 from "./Header2";

function Layout({ children }) {
  return (
    <div>
      <Header2 />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
