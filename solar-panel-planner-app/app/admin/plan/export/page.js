import React from "react";
import dynamic from "next/dynamic";
import { getScheduledRequestsForDate } from "@/app/actions/requestActions";

const PDFListView = dynamic(
  () => import("@/components/planning/export-to-pdf/PDFListView"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const page = async () => {
  let requests = await getScheduledRequestsForDate("12/01/2024");
  console.log(`Fetched requests : ${requests.data.length}`);
  return (
    <div>
      {requests && (
        <PDFListView
          date="12/01/2024"
          requests={JSON.parse(JSON.stringify(requests.data))}
        />
      )}
    </div>
  );
};

export default page;
