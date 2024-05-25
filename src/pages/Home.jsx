import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import FeaturedBlogPosts from "../components/Featuredblogposts";
import IntroPosts from "../components/IntroPosts";
import IntroPosts2 from "../components/IntroPosts2";
import RecentPosts from "../components/Recentposts";
import PostFormWidget from "../components/PostFormWidget";
import { db } from "../firebase-config";
import {
  getFirestore,
  getDocs,
  doc,
  setDoc,
  collection,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { UserContext } from "../context/user.context";

function Home() {
  const { currentUser } = useContext(UserContext);
  const [posts, setposts] = useState([]);

  useEffect(() => {
    getpost();
  }, []);

  const getpost = async () => {
    const querySnapshot = await getDocs(collection(db, "blogposts"));
    const postData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setposts(postData); // Update state with new posts
  };

  return (
    <Layout>
      <div className="bg-gradient-to-tl from-gray-400 to-indigo-200 pt-4">
        <div className="container mx-auto sm:mx-10 ">
          {posts.map((items) => (
            <FeaturedBlogPosts post={items} key={items.id} />
          ))}
          <div className="grid grid-cols-4 lg:grid-cols-10 ">
            <div className="lg:col-span-8 col-span-3">
              {posts.map((items) => (
                <IntroPosts2 post={items} key={items.id} />
              ))}
            </div>
          </div>
        </div>
        {currentUser ? <PostFormWidget /> : null}
      </div>
    </Layout>
  );
}

export default Home;
