"use client";

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { MarkerWithInfowindow } from "./MarkerWithInfoWindow";
const AdminGoogleMap = ({ requests }) => {
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
      >
        <AdvancedMarker
          position={{ lat: 15, lng: 20 }}
          title={"AdvancedMarker with customized pin."}
        >
          <Pin background={"#FBE843"} borderColor={"#1e89a1"} scale={1}>
            {/* children are rendered as 'glyph' of pin */}1
          </Pin>
        </AdvancedMarker>
        <MarkerWithInfowindow order={"1"} request={requests[0]} />
      </Map>
    </APIProvider>
  );
};

export default AdminGoogleMap;
