"use client";
import React from "react";
import { updateRequestStatus } from "@/app/actions/requestActions";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import { useRouter } from "next/navigation";

const RequestDetailsBtns = ({ session, requestId }) => {
  const router = useRouter();
  const handleVisitedStatus = async () => {
    await updateRequestStatus(requestId, "visited");
    router.refresh();
  };
  const handleCancelRequest = async () => {
    await updateRequestStatus(requestId, "cancelled");
    router.refresh();
  };

  const handleEditRequest = () => {
    router.push(`${requestId}/edit`);
  };

  return (
    <div className="bg-gray-50 md:rounded-2xl p-8 flex gap-4 justify-center">
      {session && session?.user ? (
        <PrimaryBtn text={"Mark As Visited"} onClickFn={handleVisitedStatus} />
      ) : (
        <PrimaryBtn text={"Edit Request"} onClickFn={handleEditRequest} />
      )}
      <button
        className="text-white bg-red-500 hover:bg-red-700 focus:ring-red-300 font-medium rounded-lg 
        text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none focus:ring-0  "
        onClickFn={handleCancelRequest}
      >
        Cancel Request{" "}
      </button>
    </div>
  );
};

export default RequestDetailsBtns;
