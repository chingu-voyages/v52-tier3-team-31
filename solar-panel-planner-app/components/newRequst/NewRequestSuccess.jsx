import React from "react";
import { FcOk } from "react-icons/fc";
import { useRouter } from "next/navigation";

const NewRequestSuccess = ({ requestId }) => {
  const router = useRouter();
  return (
    <div className="w-screen h-screen mx-auto p-24 sm:p-36 lg:p-52">
      <div className="flex flex-col gap-4 items-center text-center">
        <FcOk size={80} />
        <h1 className="text-3xl font-bold tracking-tight">Thank you!</h1>
        <h3 className="text-xl">
          Your solar panel evaluation request has been submitted succesfully. We
          will notify you the exact time of inspection via email, one day before
          your confirmed appointment date.
        </h3>
        <h3 className="mt-8 text-xl">
          If you wish to make any changes or cancel your request, please use the
          button below.
        </h3>
        <div className="flex gap-4 w-full items-center justify-center align-middle">
          <button
            href="#"
            className="rounded-md bg-secondary-light px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            onClick={() => router.push(`/request/${requestId}`)}
          >
            Manage Request
          </button>
          <button
            className="rounded-md border-2 border-gray-700 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
            type="button"
            onClick={() => router.push("/")}
          >
            Return to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRequestSuccess;
