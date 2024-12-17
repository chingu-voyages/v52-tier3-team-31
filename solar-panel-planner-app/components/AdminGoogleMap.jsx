"use client";
import { APIProvider, Map, RenderingType } from "@vis.gl/react-google-maps";
import { MarkerWithInfowindow } from "./MarkerWithInfoWindow";
import PDFMapExport from "./planning/export-to-pdf/PDFMapExport";
import { useEffect, useState } from "react";

const AdminGoogleMap = ({ requests }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    console.log("AdminGoogleMap re-rendered");
    if (requests.length > 0) {
      setDate(requests[0].scheduledDate);
    }
  }, [requests]);

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={["marker"]}
    >
      <Map
        mapId={"solarpanelplanner"}
        style={{ width: "80vw", height: "60vh", margin: "auto" }}
        defaultCenter={{ lat: 34.052235, lng: -118.243683 }}
        defaultZoom={11}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        reuseMaps={true}
        renderingType={RenderingType.RASTER}
      >
        {requests &&
          requests.map((request, index) => (
            <MarkerWithInfowindow
              key={request._id}
              order={index + 1}
              request={request}
            />
          ))}
      </Map>
      <PDFMapExport date={date} />
    </APIProvider>
  );
};

export default AdminGoogleMap;
