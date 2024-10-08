import React, { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7821140681556729"
        data-ad-slot="YYYYYYYYYY"
        data-ad-format="auto"
      ></ins>
    </div>
  );
};

export default AdComponent;
