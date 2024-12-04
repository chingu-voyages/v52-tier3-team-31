"use client";
import { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import html2canvas from "html2canvas";

const PDFMapExport = ({ date }) => {
  const mapElement = useMap();
  const [mapDiv, setMapDiv] = useState(null);

  const saveMapImageData = async () => {
    html2canvas(mapDiv, { allowTaint: false, useCORS: true }).then((canvas) => {
      let imageData = canvas.toDataURL({
        type: "image/jpeg",
        quality: 1.0,
      });
      sessionStorage.setItem("map-image", imageData);
      console.log(`Canvas saved in sessionStorage`);
    });
  };

  // if mapElement is loaded, then get the div of the map
  useEffect(() => {
    if (!mapElement) {
      return;
    }
    setMapDiv(mapElement.getDiv());
  }, [mapElement]);

  // if mapDiv is loaded, then save the image
  useEffect(() => {
    if (mapDiv) {
      setTimeout(() => {
        saveMapImageData();
      }, 1000);
    }
  }, [mapDiv]);

  useEffect(() => {
    console.log("Date changed. Export for new date!");
    setTimeout(() => {
      saveMapImageData();
    }, 1000);
  }, [date]);

  return <></>;
};

export default PDFMapExport;
