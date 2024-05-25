import React, { useState } from "react";
import { MdSubscriptions } from "react-icons/md";

const Subscriptionbox = () => {
  const [email, setEmail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiKey = "012911ca-4aa2-4818-a551-760125a1a395";
      const response = await fetch(
        "https://api-ivbbu06r6-odisha-weathers-projects.vercel.app/subscribe.js",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        alert("Subscription successful!");
      } else {
        alert("Subscription failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div class="px-9 pt-10 pb-14 flex flex-col bg-teal-900 text-white rounded-xl">
      <div class="flex justify-end">
        <MdSubscriptions size={40} />
      </div>
      <div>
        <div class="font-semibold text-2xl pb-4 mb-6">Subsrcibe Newsletter</div>
        <p class="">Get the latest posts delivered right to your inbox.</p>
      </div>
      <div className="mb-10 mt-5">
        <form onSubmit={handleSubmit} class="flex flex-col space-y-8">
          <div class="flex gap-y-8 h-12 space-x-2">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              class="bg-transparent placeholder:font-semibold border-2 rounded-full py-4 px-10 text-[16px] -ml-[30px] md:-ml-0 leading-[22.4px] font-light placeholder:text-black text-white"
              placeholder="Enter Email Address"
            />
            <button
              type="submit"
              class="max-w-[200px] h-auto rounded-full bg-white text-black py-3 px-6 hover:bg-slate-100"
            >
              <span class="text-teal-900 font-semibold">Subscribe</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscriptionbox;
