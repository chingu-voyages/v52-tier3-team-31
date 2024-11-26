"use client";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
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
        {requests &&
          requests.map((request, index) => (
            <MarkerWithInfowindow
              key={request._id}
              order={index + 1}
              request={request}
            />
          ))}
      </Map>
    </APIProvider>
  );
};

export default AdminGoogleMap;
