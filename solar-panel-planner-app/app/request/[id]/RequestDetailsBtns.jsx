"use client"
import React from "react";
import { updateRequestStatus } from "@/app/actions/requestActions";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import {useRouter} from "next/navigation";

const RequestDetailsBtns = ({session, requestId}) => {
    const router = useRouter();
    const handleVisitedStatus = async () =>{
        await updateRequestStatus(requestId, 'visited');
        router.refresh()
    }
    const handleCancelRequest = async () =>{
        await updateRequestStatus(requestId, 'cancelled');
        router.refresh()
    }

    const handleEditRequest = () =>{
      router.push(`${requestId}/edit`)
    }

  return (
    <div className="form-section flex gap-2 justify-center ">
      {session && session?.user ? (
            <PrimaryBtn text={"Mark As Visited"} onClickFn={handleVisitedStatus}/>
      ) : (
        <PrimaryBtn text={"Edit Request"} onClickFn={handleEditRequest}/>
      )}
      <PrimaryBtn text={"Cancel Request"} onClickFn={handleCancelRequest}/>
    </div>
  );
};

export default RequestDetailsBtns;
