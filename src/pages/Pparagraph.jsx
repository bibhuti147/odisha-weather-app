import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase-config";

const Pparagraph = () => {
  // Log a screen_view event when the component mounts
  useEffect(() => {
    logEvent(analytics, "screen_view", {
      firebase_screen: "PrivacyPolicy",
      firebase_screen_class: "PrivacyPolicy",
    });
  }, []);

  return (
    <Layout>
      <div>
        <div class="md:max-w-screen-sm text-center px-4 sm:px-6 lg:px-8 pt-12 pb-6 mx-auto">
          <h1 class="mb-2 text-2xl font-bold md:text-4xl">Privacy Policy</h1>
          <p class="text-gray-700">Created: May 16, 2024</p>
        </div>
        <div class="md:max-w-screen-sm lg:max-w-[992px] px-4 sm:px-6 lg:px-8 pb-12 md:pt-6 sm:pb-20 mx-auto">
          <div class="grid gap-4 md:gap-8">
            <div>
              <p class="mb-8 text-xl text-justify">
                Welcome to Odishaweather.com . We respect your privacy and are
                committed to protecting your personal information. This Privacy
                Policy explains how we collect, use, and disclose information
                when you visit our website.
              </p>
              <h2 class="text-lg font-semibold mb-2">Information We Collect</h2>
              <p class="mb-5 text-justify">
                Personal Information: We may collect the information such as
                your email address when you voluntarily provide it to us, for
                example, when subscribing to our newsletter or contacting us.
              </p>
              <h3 class="text-lg font-semibold mb-2">
                How We Use Your Information
              </h3>
              <p class="mb-5 text-justify">
                We use the information we collect to improve our website's
                content and functionality, respond to your inquiries, process
                your requests, and send you relevant communications.
              </p>
              <h3 class="text-lg font-semibold mb-2">
                Information Sharing and Disclosure
              </h3>
              <p class="mb-5 text-justify">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties.
              </p>
              <h3 class="text-lg font-semibold mb-2">Cookies</h3>
              <p class="mb-5 text-justify">
                We use cookies to enhance your experience on our website by
                remembering your preferences and customizing the content you
                see. Third-party ServicesWe use cookies to enhance your
                experience on our website by remembering your preferences and
                customizing the content you see. Third-party Services
              </p>
              <h3 class="text-lg font-semibold mb-2">IMD and JMA Credit</h3>
              <p class="mb-5 text-justify">
                We acknowledge Indian Meteorological Department (IMD), the Japan
                Meteorological Agency (JMA) and Meteologix as we share their
                website data (such as Satellite and Radar Product) in our
                website for public awareness. We never claim on their products.
              </p>
              <h3 class="text-lg font-semibold mb-2">Data Retention</h3>
              <p class="mb-5 text-justify">
                We retain personal data as long as your account is active or as
                needed to provide services.
              </p>
              <h3 class="text-lg font-semibold mb-2">Contact Us</h3>
              <p class="mb-5 text-justify">
                For questions about this Privacy Policy or our privacy
                practices, contact us via live chat on our website.
              </p>
              <h3 class="text-lg font-semibold mb-2">Policy Updates</h3>
              <p class="mb-5 text-justify">
                We may update this Privacy Policy from time to time. Any changes
                will be effective immediately upon posting on this page. Your
                continued use of our website after any such changes constitutes
                acceptance of the revised Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pparagraph;
