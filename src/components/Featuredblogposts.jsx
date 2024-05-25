import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";

const Carousel = ({ fposts }) => {
  if (!fposts || !fposts.length || !fposts[0].thumbnail) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? fposts.length - 1 : currentIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === fposts.length - 1 ? 0 : currentIndex + 1
    );
  };

  const navigate = useNavigate();
  const handleClick = async () => {
    // Update view count for the blog post
    const postDocRef = doc(db, "blogposts", fposts[currentIndex].id);
    try {
      await updateDoc(postDocRef, {
        views: fposts[currentIndex].views ? fposts[currentIndex].views + 1 : 1,
      });
    } catch (error) {
      console.error("Error updating view count: ", error);
    }
    // Navigate to the blog post page
    navigate(`/blogpost/${fposts[currentIndex].id}`);

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };

  // Function to handle autoslide
  const autoSlide = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === fposts.length - 1 ? 0 : currentIndex + 1
    );
  };

  useEffect(() => {
    // Start auto sliding every 5 seconds
    const interval = setInterval(autoSlide, 5000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [currentIndex]); // Run the effect whenever currentIndex changes

  // Swipeable handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextClick,
    onSwipedRight: handlePrevClick,
  });

  return (
    <div {...swipeHandlers}>
      <div
        onClick={handleClick}
        class="h-48 md:h-96 rounded-md shadow-2xl overflow-hidden bg-cover bg-center w-full"
        style={{
          backgroundImage: `url(${fposts[currentIndex].thumbnail})`,
        }}
      >
        <div class="bg-gray-900 bg-opacity-70 flex items-center h-full">
          <div class="px-2 md:px-8 mt-20 md:mt-40">
            <h2 class="text-sm md:text-2xl mb-1 text-white font-semibold line-clamp-2">
              {fposts[currentIndex].title}
            </h2>
            <div class="flex md:mt-4">
              <img
                src={fposts[currentIndex].profileImageUrl}
                class="md:h-10 md:w-10 h-7 w-7 rounded-full mr-2 object-cover"
              />
              <div>
                <p class="font-semibold text-white text-lg md:text-xl">
                  {" "}
                  {fposts[currentIndex].author.name}{" "}
                </p>
                <p class="font-semibold text-white text-xs mb-1">
                  {" "}
                  {fposts[currentIndex].createdAt
                    .toDate()
                    .toLocaleString("default", {
                      year: "numeric",
                      weekday: "short",
                      month: "short",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-[-15px] gap-1">
        {fposts.map((_, index) => (
          <button
            onClick={() => setCurrentIndex(index)}
            key={index}
            class={`w-2 focus:outline-none h-2 md:w-3 md:h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
