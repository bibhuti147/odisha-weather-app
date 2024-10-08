import React from "react";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleClickTwitter = () => {
    ReactGA.event({
      category: "Footer Twitter Button",
      action: "Footer Twitter Button",
    });
  };

  const handleClickFacebook = () => {
    ReactGA.event({
      category: "Footer Facebook Button",
      action: "Footer Facebook Button",
    });
  };

  const handleClickYoutube = () => {
    ReactGA.event({
      category: "Footer Youtube Button",
      action: "Footer Youtube Button",
    });
  };

  const handleClickInstagram = () => {
    ReactGA.event({
      category: "Footer Instagram Button",
      action: "Footer Instagram Button",
    });
  };

  const handleClickWhatsapp = () => {
    ReactGA.event({
      category: "Footer Whatsapp Button",
      action: "Footer Whatsapp Button",
    });
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <footer
        class="relative pt-8 pb-6"
        style={{ background: "rgb(30, 41, 59)", color: "#ffffff" }}
      >
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap text-left lg:text-left">
            <div class="w-full lg:w-6/12 px-4">
              <h4 class="text-3xl fonat-semibold text-[#FF9F66]">
                Let's keep in touch!
              </h4>
              <h5 class="text-lg mt-0 mb-2">
                Connect with us on any of these platforms!!
              </h5>
              <div class="mt-6 lg:mb-0 mb-6">
                <button
                  onClick={handleClickTwitter}
                  class="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <Link
                    to="https://twitter.com/OdishaWeather7?t=-GcChEHO8f9z2DJc3RUb1Q&s=08"
                    target="_blank"
                  >
                    <i class="fab fa-twitter"></i>
                  </Link>
                </button>
                <button
                  onClick={handleClickFacebook}
                  class="bg-white text-blue-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <Link
                    to="https://www.facebook.com/OdishaWeather"
                    target="_blank"
                  >
                    <i class="fab fa-facebook-square"></i>
                  </Link>
                </button>
                <button
                  onClick={handleClickYoutube}
                  class="bg-white text-red-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <Link
                    to="https://youtube.com/@weatherupdate2m?si=01g7glRaV0XxLBwq"
                    target="_blank"
                  >
                    <i class="fab fa-youtube"></i>
                  </Link>
                </button>
                <button
                  onClick={handleClickInstagram}
                  class="bg-white text-red-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <Link
                    to="https://www.instagram.com/odisha_weatherman7?igsh=c3pjenhuNHN2bTA3&utm_source=qr"
                    target="_blank"
                  >
                    <i class="fab fa-instagram"></i>
                  </Link>
                </button>
                <button
                  onClick={handleClickWhatsapp}
                  class="bg-white text-green-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <Link
                    to="https://whatsapp.com/channel/0029Va99hkxFi8xl8kFL9430"
                    target="_blank"
                  >
                    <i class="fab fa-whatsapp"></i>
                  </Link>
                </button>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="flex flex-wrap items-top mb-6">
                <div class="w-full lg:w-4/12 px-4 ml-auto">
                  <span class="block uppercase text-sm font-semibold mb-2 text-[#FF9F66]">
                    INFO Links
                  </span>
                  <ul class="list-unstyled">
                    <li>
                      <Link
                        to="/aboutus"
                        aria-label="Go to About Us page"
                        onClick={scrollToTop}
                      >
                        <a class="hover:text-[#A9A9A9] font-semibold block pb-2 text-sm">
                          About Us
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/terms"
                        aria-label="Go to About Us page"
                        onClick={scrollToTop}
                      >
                        <a class="hover:text-[#A9A9A9] font-semibold block pb-2 text-sm">
                          Terms & Conditions
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/privacy"
                        aria-label="Go to About Us page"
                        onClick={scrollToTop}
                      >
                        <a class="hover:text-[#A9A9A9] font-semibold block pb-2 text-sm">
                          Privacy Policy
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contactus"
                        aria-label="Go to About Us page"
                        onClick={scrollToTop}
                      >
                        <a class="hover:text-[#A9A9A9] font-semibold block pb-2 text-sm">
                          Contact Us
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div class="w-full lg:w-4/12 px-4">
                  <span class="block uppercase text-sm font-semibold mb-2 text-[#FF9F66]">
                    SITE Links
                  </span>
                  <ul class="list-unstyled">
                    <li>
                      <Link
                        to="https://meteologix.com/in/weather/11719680-odisa"
                        target="_blank"
                        aria-label="Go to About Us page"
                        onClick={scrollToTop}
                      >
                        <a class="hover:text-[#A9A9A9] font-semibold block pb-2 text-sm">
                          Meteologix
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="https://rapid.imd.gov.in/r2v/"
                        target="_blank"
                        aria-label="Go to About Us page"
                        onClick={scrollToTop}
                      >
                        <a class="hover:text-[#A9A9A9] font-semibold block pb-2 text-sm">
                          IMD Rapid Satellie
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="https://mausam.imd.gov.in/responsive/radar.php"
                        target="_blank"
                        aria-label="Go to About Us page"
                        onClick={scrollToTop}
                      >
                        <a class="hover:text-[#A9A9A9] font-semibold block pb-2 text-sm">
                          IMD Radar
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="https://www.data.jma.go.jp/mscweb/data/himawari/sat_img.php?area=se4"
                        target="_blank"
                        aria-label="Go to About Us page"
                        onClick={scrollToTop}
                      >
                        <a class="hover:text-[#A9A9A9] font-semibold block pb-2 text-sm">
                          JMA Satellite Himawari
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr class="my-6 border-blueGray-300" />
          <div class="flex flex-wrap items-center md:justify-between justify-center">
            <div class="w-full md:w-4/12 px-4 mx-auto text-center">
              <div class="text-sm font-semibold py-1">
                Copyright © <span id="get-current-year">2024</span>
                <a href="https://www.odishaweather.com/odisha-weather/">
                  {" "}
                  Odishaweather .
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
