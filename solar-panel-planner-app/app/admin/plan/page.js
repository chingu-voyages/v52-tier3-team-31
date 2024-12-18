"use client";
import DateView from "@/components/planning/DateView";
import dayjs from "dayjs";
import PlanningCards from "@/components/planning/PlanningCards";
import React, { useEffect, useState } from "react";
import PlanningHeader from "@/components/planning/PlanningHeader";
import Dropdown from "@/components/planning/Dropdown";
import {
  getAllPlanVisitRequests,
  updateRequestById,
  updateRequestStatus,
  updateRequestTimeSlot,
} from "@/app/actions/requestActions";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import PlanningMapView from "@/components/planning/PlanningMapView";
import { toast } from "react-toastify";
import { showConfirmationBtn } from "./rules";
import { timeSlots } from "@/utils/timesSlots";

const haversineDistance = ([lat1, lon1], [lat2, lon2]) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const planShortestRoute = (appointments, startPoint, selectedDate) => {
  const plannedRoute = [];
  let currentPoint = startPoint || appointments[0];
  const unvisited = [...appointments];

  while (unvisited.length > 0) {
    const nearest = unvisited.reduce((nearest, appointment) => {
      const distance = haversineDistance(
        currentPoint.location.coordinates,
        appointment.location.coordinates
      );
      return !nearest || distance < nearest.distance
        ? { distance, appointment }
        : nearest;
    }, null);

    plannedRoute.push(nearest.appointment);

    unvisited.splice(unvisited.indexOf(nearest.appointment), 1);

    currentPoint = nearest.appointment;
  }

  const today = dayjs(selectedDate, "MM/DD/YYYY").startOf("day");
  const updatedPlannedRoute = plannedRoute.map((appointment, index) => {
    const timeSlot = timeSlots[index];
    if (!timeSlot) {
      console.warn(`No available time slot for appointment ${appointment._id}`);
      return appointment;
    }
    const [hours, minutes] = timeSlot.start.split(":").map(Number);
    const updatedDateTime = today
      .hour(hours)
      .minute(minutes)
      .second(0)
      .millisecond(0)
      .toISOString();

    return {
      ...appointment,
      requestedDate: updatedDateTime,
      scheduledDate: updatedDateTime,
    };
  });

  return updatedPlannedRoute;
};

const Page = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("MM/DD/YYYY")
  );
  const [allPlannedRequests, setAllPlannedRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    let imageData = sessionStorage.getItem("map-image");
    if (imageData) {
      sessionStorage.removeItem("map-image");
    }

    const getAllRequestsData = async () => {
      const allRequest = await getAllPlanVisitRequests();
      const filtered = allRequest.data.filter((request) => {
        const scheduledDate = dayjs(request.scheduledDate).format("MM/DD/YYYY");
        return scheduledDate === selectedDate;
      });

      const hasNewRequest = filtered.some((req) => req.status === "new");

      if (hasNewRequest) {
        const startPoint = filtered[0];
        const plannedRoute = planShortestRoute(
          filtered,
          startPoint,
          selectedDate
        );

        setAllPlannedRequest(plannedRoute);
      } else {
        setAllPlannedRequest(filtered);
      }
    };
    getAllRequestsData();
  }, [selectedDate]);

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      dates.push(dayjs().add(i, "day"));
    }
    return dates;
  };
  const [dates] = useState(generateDates());

  const rescheduleSelectedTimeSlot = async (time, id) => {
    const response = await updateRequestTimeSlot(id, time);

    if (response?.request) {
      setAllPlannedRequest((prev) =>
        prev.map((request) =>
          request._id === response.request._id
            ? {
                ...request,
                requestedDate: response.request.requestedDate,
                scheduledDate: response.request.scheduledDate,
              }
            : request
        )
      );
    } else {
      console.error("Failed to update request:", response.error);
    }
  };

  const sendConfirmationEmail = async (requests) => {
    try {
      const emailPromises = requests.map(async (request) => {
        const scheduledDate = request.data?.scheduledDate;
        const formattedDate = dayjs(scheduledDate).isValid()
          ? dayjs(scheduledDate).format("MM/DD/YYYY hh:mm A")
          : "an unknown date";

        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: { name: "BrightGrid", address: "noreply@gmail.com" },
            recipients: [
              { name: request.data?.name, address: request.data?.email },
            ],
            subject: "Your Request is Confirmed",
            message: `Hello ${request.data?.name}, your request at ${formattedDate} has been scheduled.`,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error(
            `Failed to send email to: ${request.data?.email}`,
            error
          );
          return null;
        }

        return response.json();
      });

      const emailResponses = await Promise.all(emailPromises);

      emailResponses.forEach((response, index) => {
        if (!response) {
          console.error(`Email failed for: ${requests[index].data?.email}`);
        }
      });
    } catch (err) {
      console.error("Error sending confirmation emails:", err);
    }
  };

  const confirmRequestsFn = async () => {
    if (isLoading) return false;
    setIsLoading(true);
    try {
      const updatedRequests = await Promise.all(
        allPlannedRequests.map((request) => {
          console.log("the data in confirmation", request);
          return updateRequestById(request._id, {
            ...request,
            status: "scheduled",
          });
        })
      );
      const successfulUpdates = updatedRequests.filter((res) => !res.error);
      console.log("the successfulUpdates", successfulUpdates);

      if (successfulUpdates.length > 0) {
        await sendConfirmationEmail(successfulUpdates);
        toast("Confirmation emails have been successfully sent!");
      }

      setAllPlannedRequest((prevRequests) =>
        prevRequests.map((req) =>
          successfulUpdates.find((updated) => updated.data._id === req._id)
            ? { ...req, status: "scheduled", confirmationEmailSend: true }
            : req
        )
      );
    } catch (error) {
      console.error("Error confirming requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewSwitch = (showMap) => {
    setShowMap(showMap);
  };

  const handleExportToPDF = () => {
    window.open(
      `/admin/plan/export?date=${selectedDate}&map=${showMap}`,
      "_blank"
    );
  };

  return (
    <div className="w-full mx-auto max-w-screen-xl ">
      <h1 className="page-heading mt-5">Plan Visits</h1>
      <div className="p-4 rounded-sm">
        <div className="block md:hidden">
          <Dropdown
            values={dates.map((date) => date.format("MM/DD/YYYY"))}
            setSelectedValue={setSelectedDate}
          />
        </div>
        <div className="md:mx-10 xl:mx-20 2xl:mx-40 flex gap-4">
          <div className="hidden md:block min-w-[20%]">
            <DateView
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              dates={dates}
            />
          </div>
          <div className="w-[100%] sm:w-[calc(100%-20%)] rounded-lg bg-white border flex-1">
            <PlanningHeader
              selectedDate={selectedDate}
              toggleView={handleViewSwitch}
              exportToPDF={handleExportToPDF}
            />
            {showMap ? (
              <PlanningMapView requests={allPlannedRequests} />
            ) : (
              <>
                <PlanningCards
                  allPlannedRequests={JSON.parse(
                    JSON.stringify(allPlannedRequests)
                  )}
                  rescheduleSelectedTimeSlot={rescheduleSelectedTimeSlot}
                />
                {showConfirmationBtn(allPlannedRequests) && (
                  <div className="text-center mt-10">
                    <PrimaryBtn
                      text={"Confirm Request"}
                      onClickFn={confirmRequestsFn}
                      isDisabled={isLoading}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
