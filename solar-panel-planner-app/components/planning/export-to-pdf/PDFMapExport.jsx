"use client";
import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import html2canvas from "html2canvas";

const PDFMapExport = ({ date }) => {
  const mapElement = useMap();
  const [mapDiv, setMapDiv] = useState(null);

  const saveMapImageData = async () => {
    console.log("Saving map image data");
    setTimeout(() => {
      html2canvas(mapDiv, { allowTaint: false, useCORS: true })
        .then((canvas) => {
          let imageData = canvas.toDataURL({
            type: "image/jpeg",
            quality: 1.0,
          });
          sessionStorage.setItem("map-image", imageData);
          console.log(`Canvas saved in sessionStorage`);
        })
        .catch((err) =>
          console.log(
            "Error encountered while trying to save map as image :",
            err.message
          )
        );
    }, 1000);
  };

  // if mapElement is loaded, then get the div of the map
  useEffect(() => {
    if (!mapElement) {
      return;
    }
    setMapDiv(mapElement.getDiv().children[0]);
  }, [mapElement]);

  // if mapDiv is loaded, then save the image
  useEffect(() => {
    if (mapDiv) {
      saveMapImageData();
    }
  }, [mapDiv]);

  useEffect(() => {
    console.log("Date changed. Export for new date!");
    saveMapImageData();
  }, [date]);

  return <></>;
};

export default PDFMapExport;
