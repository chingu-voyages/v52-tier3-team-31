import React from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { getScheduledRequestsForDate } from "@/app/actions/requestActions";

const PDFView = dynamic(
  () => import("@/components/planning/export-to-pdf/PDFView"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const page = async ({ searchParams }) => {
  let today = dayjs().format("MM-DD-YYYY");
  const date = searchParams?.date || today;
  const showMap = searchParams?.map || false;
  let requests = await getScheduledRequestsForDate(date);

  return (
    <div>
      {requests && (
        <div>
          <PDFView
            date={date}
            requests={JSON.parse(JSON.stringify(requests.data))}
            map={showMap}
          />
        </div>
      )}
    </div>
  );
};

export default page;
