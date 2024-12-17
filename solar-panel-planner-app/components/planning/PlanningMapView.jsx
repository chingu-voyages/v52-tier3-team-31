import AdminGoogleMap from "../AdminGoogleMap";
const PlanningMapView = ({ requests }) => {
  return (
    <div className="relative w-full overflow-clip">
      <AdminGoogleMap requests={requests} />
    </div>
  );
};

export default PlanningMapView;
