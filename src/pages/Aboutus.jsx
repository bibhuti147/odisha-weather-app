import React, { useEffect } from "react";
import Layout from "../components/Layout";
import logo3 from "../assets/images/logo3.png";
import biswajit from "../assets/images/biswajit.jpg";
import abhishek from "../assets/images/abhishek.jpg";
import sarthak from "../assets/images/sarthak.jpg";
import soumya from "../assets/images/s.svg";
import chinmay from "../assets/images/chinmay.jpg";
import ReactGA from "react-ga4";

function Aboutus() {
  // Log a screen_view event when the component mounts
  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_MEASUREMENT_ID);

    // Send a pageview hit
    ReactGA.send({
      hitType: "pageview",
      page: "/aboutus",
      title: "About Us",
    });
  }, []);

  return (
    <Layout>
      <section class="relative pt-16 bg-[#EEEDEB]">
        <div class="container mx-auto">
          <div class="flex flex-wrap items-center">
            <div class="w-10/12 md:w-6/12 lg:w-full px-4 md:px-4 mr-auto ml-auto -mt-10">
              <div class="relative flex flex-col min-w-0 break-words mb-6 shadow-lg rounded-lg bg-pink-500">
                <img
                  alt="..."
                  src={logo3}
                  class="w-full rounded-t-lg h-full object-cover"
                />
                <blockquote class="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    class="absolute left-0 w-full block h-95-px -top-94-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      class="text-pink-500 fill-current"
                    ></polygon>
                  </svg>
                  <h4 class="text-xl font-bold text-white">
                    OdishaWeather's Vision
                  </h4>
                  <p class="text-md font-light mt-2 text-white text-justify">
                    The vision of Odisha weather is to provide efficient weather
                    and climate services for safety of life and property and to
                    contribute towards development.
                  </p>
                </blockquote>
              </div>
            </div>
            <div class="w-full px-4">
              <div class="flex flex-wrap">
                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col mt-4">
                    <div class="px-4 py-5 flex-auto">
                      <img
                        src={biswajit}
                        class="text-blueGray-500 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white transition-transform transform hover:scale-150"
                      />
                      <h6 class="text-xl mb-1 font-semibold">Biswajit Sahoo</h6>
                      <p class="mb-4 text-blueGray-500 text-justify">
                        Hey there, I'm Biswajit Sahoo (Odishaweatherman), a
                        weather enthusiast from Odisha. My journey began in 2013
                        during Cyclone Phailin. As a young kid witnessing my
                        first Extremely Severe Cyclone with winds gust upto 200
                        km/h, I was instantly captivated by the raw force of
                        nature. Living in a state prone to extreme weather
                        events, I've made it my passion to gather and share as
                        much information as possible. From then till now, it's
                        been an unforgettable journey filled with countless
                        memories.
                      </p>
                    </div>
                  </div>
                  <div class="relative flex flex-col min-w-0">
                    <div class="px-4 py-5 flex-auto">
                      <img
                        src={sarthak}
                        class="text-blueGray-500 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white transition-transform transform hover:scale-150"
                      />
                      <h6 class="text-xl mb-1 font-semibold">Sarthak Mishra</h6>
                      <p class="mb-4 text-blueGray-500 text-justify">
                        My self Sarthak Mishra, loves predict the weather for
                        the betterment of farmers since 2018. Always I try to
                        provide early and accurate forecast for severe weather
                        like Cyclone, Heavy Rain Fall, Lightning, Heat wave,
                        Cold Wave etc.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col min-w-0 mt-4">
                    <div class="px-4 py-5 flex-auto">
                      <img
                        src={chinmay}
                        class="text-blueGray-500 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white transition-transform transform hover:scale-150"
                      />
                      <h6 class="text-xl mb-1 font-semibold">
                        Chinmay Sarangi
                      </h6>
                      <p class="mb-4 text-blueGray-500 text-justify">
                        Hello, I'm Chinmay Sarangi, passsionate weather
                        enthusiast with a background in Electrical and
                        Electronics Engineering from IIIT BBSR. With over 3
                        years of experience in analysis. I have developed a keen
                        interest in tropical cyclone dynamics and forecasting. I
                        am dedicated to exploring the intricate patterns of
                        these weather phenomena and leveraging my skills to
                        provide accurate and insightful forecasts.
                      </p>
                    </div>
                  </div>
                  <div class="relative flex flex-col min-w-0">
                    <div class="px-4 py-5 flex-auto text-justify">
                      <img
                        src={abhishek}
                        class="text-blueGray-500 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white transition-transform transform hover:scale-150"
                      />
                      <h6 class="text-xl mb-1 font-semibold">Abhishek Sahoo</h6>
                      <p class="mb-4 text-blueGray-500">
                        I'm Abhisek Sahoo, a dedicated weather and cyclone
                        forecaster with a passion for predicting the
                        unpredictable. With over three years of experience in
                        tracking and analyzing weather patterns, I strive to
                        provide accurate and reliable forecasts to help you stay
                        ahead of the storm.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col min-w-0 mt-4">
                    <div class="px-4 py-5 flex-auto">
                      <img
                        src={soumya}
                        class="text-blueGray-500 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white transition-transform transform hover:scale-150"
                      />
                      <h6 class="text-xl mb-1 font-semibold">
                        Soumya Ranjan Mishra
                      </h6>
                      <p class="mb-4 text-blueGray-500 text-justify">
                        This is Soumya(WEATHER UPDATE 2M) A Weather Enthusiast &
                        Seasoned Cyclone Tracker,dedicated to monitoring the
                        latest weather systems and predicting the paths of
                        powerful cyclones. Keeping you informed and safe in the
                        face of severe weather.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Aboutus;
