import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home2 from "./pages/Home2";
import Contactus from "./pages/Contactus";
import Aboutus from "./pages/Aboutus";
import Authentication from "./pages/Authentication";
import BlogPosts from "./pages/Blogposts";
import BlogPostForm from "./pages/BlogPostForm";
import AdminDashboard from "./pages/AdminDashboard";
import { useContext, useState } from "react";
import { AdminContext } from "./context/admin.context";
import Pparagraph from "./pages/Pparagraph";
import Tcparagraph from "./pages/Tcparagraph";
import BlogEditForm from "./pages/BlogEditForm";
function App() {
  const [prevLocation, setPrevLocation] = useState(null);
  const handleNavigation = (location) => {
    setPrevLocation(location);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home2 onNavigate={handleNavigation} />} />
        <Route
          path="/contactus"
          element={<Contactus onNavigate={handleNavigation} />}
        />
        <Route
          path="/aboutus"
          element={<Aboutus onNavigate={handleNavigation} />}
        />
        <Route
          path="/authentication"
          element={<Authentication onNavigate={handleNavigation} />}
        />
        <Route
          path="/blogpost/:postId"
          element={<BlogPosts onNavigate={handleNavigation} />}
        />
        <Route
          path="/privacy"
          element={<Pparagraph onNavigate={handleNavigation} />}
        />
        <Route
          path="/terms"
          element={<Tcparagraph onNavigate={handleNavigation} />}
        />
        <Route
          path="/createpost"
          element={
            <ProtectedRouteForAdmin>
              <BlogPostForm onNavigate={handleNavigation} />
            </ProtectedRouteForAdmin>
          }
        />
        <Route
          path="/dashboard/:adminId"
          element={
            <ProtectedRouteForAdmin>
              <AdminDashboard onNavigate={handleNavigation} />
            </ProtectedRouteForAdmin>
          }
        />
        <Route
          path="/blogedit/:postId"
          element={
            <ProtectedRouteForAdmin>
              <BlogEditForm onNavigate={handleNavigation} />
            </ProtectedRouteForAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

export const ProtectedRouteForAdmin = ({ children }) => {
  const { adminUser } = useContext(AdminContext);
  const admin = JSON.parse(localStorage.getItem("admin"));
  if (adminUser.find((user) => admin?.uid === user.uid)) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};
