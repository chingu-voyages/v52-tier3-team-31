import React from "react";

const RequestDetailMap = ({ address }) => {
  let src = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY}&q=${address}`;

  return (
    <div>
      <iframe
        className="relative h-96 w-full rounded-lg"
        loading="lazy"
        src={src}
      ></iframe>
    </div>
  );
};

export default RequestDetailMap;
