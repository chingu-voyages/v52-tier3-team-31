import React from "react";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { getScheduledRequestsForDate } from "@/app/actions/requestActions";

const PDFListView = dynamic(
  () => import("@/components/planning/export-to-pdf/PDFListView"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const page = async ({ searchParams }) => {
  let today = dayjs().format("MM-DD-YYYY");
  const date = searchParams?.date || today;
  let requests = await getScheduledRequestsForDate(date);

  console.log(`Fetched requests : ${requests.data.length}`);
  return (
    <div>
      {requests && (
        <PDFListView
          date={date}
          requests={JSON.parse(JSON.stringify(requests.data))}
        />
      )}
    </div>
  );
};

export default page;
