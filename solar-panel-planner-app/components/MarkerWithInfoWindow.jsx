"use client";
import React, { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";

export const MarkerWithInfowindow = ({ order, request }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const { name, address, email, phone, scheduledDate } = request;
  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{ lat: 28, lng: -82 }}
        title={"AdvancedMarker that opens an Infowindow when clicked."}
      >
        <Pin background={"#FBBF24"} borderColor={"#1e89a1"} scale={1}>
          {/* <h1 className="text-md font-bold">{order}</h1> */}
        </Pin>
      </AdvancedMarker>
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
          headerContent={<h1 className="text-sm font-bold">{name}</h1>}
        >
          <div>
            <h1 className="text-sm font-bold">{address}</h1>
            {scheduledDate} <br />
          </div>
        </InfoWindow>
      )}
    </>
  );
};
