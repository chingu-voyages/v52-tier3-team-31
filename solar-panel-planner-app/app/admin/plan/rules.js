import dayjs from "dayjs";

export const showConfirmationBtn = (allPlannedRequests) => {
  const now = dayjs();
  const nextDay = now.add(1, "day").endOf("day");

  const hasNonScheduledRequest = allPlannedRequests.some((req) => {
    const isNonScheduled = req.status !== "scheduled";
    const isWithinNextDay = dayjs(req.scheduledDate).isBefore(
      nextDay,
      "second"
    );
    return isNonScheduled && isWithinNextDay;
  });
  return allPlannedRequests.length > 0 && hasNonScheduledRequest;
};
