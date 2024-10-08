import React, { useEffect } from "react";
import Layout from "../components/Layout";
import ReactGA from "react-ga4";

const Tcparagraph = () => {
  // Log a screen_view event when the component mounts
  useEffect(() => {
    ReactGAImplementation.initialize(import.meta.env.VITE_MEASUREMENT_ID);

    // Send a pageview hit
    ReactGA.send({
      hitType: "pageview",
      page: "/terms",
      title: "Terms Conditions",
    });
  }, []);

  return (
    <Layout>
      <div class="md:max-w-screen-sm text-center px-4 sm:px-6 lg:px-8 pt-12 pb-6 mx-auto">
        <h1 class="mb-2 text-2xl font-bold md:text-4xl">
          Terms &amp; Conditions
        </h1>
        <p class="text-gray-700">Created: May 16, 2024</p>
      </div>
      <div class="md:max-w-screen-sm lg:max-w-[992px] px-4 sm:px-6 lg:px-8 pb-12 md:pt-6 sm:pb-20 mx-auto">
        <div class="grid gap-4 md:gap-8">
          <div>
            <p class="mb-8 text-xl text-justify">
              These Terms and Conditions govern your use of our website. By
              accessing or using our website, you agree to be bound by these
              Terms and Conditions. Please read them carefully before using our
              website.
            </p>
            <h2 class="text-lg font-semibold mb-2">Use of Content</h2>
            <p class="mb-5 text-justify">
              The content provided on our website is for informational purposes
              only. As the weather forecast is bit tricky also chaotic in nature
              we will try our best to provide accurate and up-to-date weather
              updates. We are focusing on large area domain (Mostly District
              wise) so there might be some error on hyperlocal scale
              (Taluka/Panchayat level).
            </p>
            <h2 class="text-lg font-semibold mb-2">User Conduct</h2>
            <p class="mb-5 text-justify">
              You agree to use our information only for lawful purposes and in a
              manner consistent with all applicable laws and regulations. You
              further agree not to: Use our website in any way that could
              damage, disable, overburden, or impair our servers or networks.
              Attempt to gain unauthorized access to any portion of our website
              or any other systems or networks connected to our website. Use any
              automated means, such as robots, spiders, or scrapers, to access
              our website or collect information from our website. Use our
              website to transmit any unauthorized or unsolicited advertising,
              promotional materials, junk mail, spam, chain letters, pyramid
              schemes, or any other form of solicitation. Impersonate any person
              or entity or falsely state or misrepresent your affiliation with
              any person or entity.
            </p>
            <h2 class="text-lg font-semibold mb-2">Intellectual Property</h2>
            <p class="mb-5 text-justify">
              All content, including but not limited to text, graphics, logos,
              images, videos, and software, on our website is the property of us
              or its licensors and is protected by copyright, trademark, and
              other intellectual property laws. We will be happy if you contact
              us or give the credit before use.
            </p>
            <h2 class="text-lg font-semibold mb-2">
              Links to Third-party Websites
            </h2>
            <p class="mb-5 text-justify">
              Our website may contain links to third-party websites for your
              convenience. We do not endorse or control these third-party
              websites and are not responsible for their content, privacy
              policies, or practices. Your use of third-party websites is at
              your own risk.
            </p>
            <h2 class="text-lg font-semibold mb-2">Limitation of Liability</h2>
            <p class="mb-5 text-justify">
              In no event shall our website be liable for any direct, indirect,
              incidental, special, or consequential damages arising out of or in
              any way connected with your use of Odishaweather.com or the
              content therein.
            </p>
            <h2 class="text-lg font-semibold mb-2">Governing Law</h2>
            <p class="mb-5 text-justify">
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of India, without regard to its conflict
              of law provisions..
            </p>
            <h2 class="text-lg font-semibold mb-2">
              Changes to Terms and Conditions
            </h2>
            <p class="mb-5 text-justify">
              We reserve the right to modify or replace these Terms and
              Conditions at any time. Any changes will be effective immediately
              upon posting on this page. Your continued use of our website after
              any such changes constitutes acceptance of the revised Terms and
              Conditions.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tcparagraph;
