"use client";
import React, { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

export const MarkerWithInfowindow = ({ order, request }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { name, address, phone, scheduledDate, location } = request;
  dayjs.extend(localizedFormat);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{
          lat: location.coordinates[0],
          lng: location.coordinates[1],
        }}
        title={"AdvancedMarker that opens an Infowindow when clicked."}
      >
        <Pin
          background={"#ff3f3f"}
          borderColor={"#ffffff"}
          scale={1.2}
          glyphColor="#ffffff"
        >
          <h1 className="text-md font-bold">{order}</h1>
        </Pin>
      </AdvancedMarker>
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
          headerContent={
            <h1 className="font-bold">
              {order} - {name}
            </h1>
          }
        >
          <div>
            <h3 className="">🏠 {address}</h3>
            <h3 className="">📞 {phone}</h3>
            <h1 className="font-bold mt-1">
              {" "}
              ⏰ {dayjs(scheduledDate).format("LLL")}
            </h1>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
