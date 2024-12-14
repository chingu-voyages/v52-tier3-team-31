"use server";
import dayjs from "dayjs";
import connectToDatabase from "@/app/lib/db";
import Request from "@/app/models/Request";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
await connectToDatabase();

const sampleRequest = new Request({
  name: "John Doe",
  phone: "1234567890",
  email: "qM0bA@example.com",
  address: "123 Main St, Anytown, USA",
  requestedDate: new Date(),
  status: "new",
  scheduledDate: null,
  confirmationEmailSent: false,
});

// Create a new request using the form data
export async function createRequest(formData) {
  try {
    const { name, phone, email, address, location, requestedDate } = formData;
    const scheduledDate = requestedDate;

    const request = new Request({
      name,
      phone,
      email,
      address,
      location,
      requestedDate,
      scheduledDate,
    });

    let saved = await request.save();
    return { message: "New request created successfully", data: saved };
  } catch (error) {
    return { error: error.message };
  }
}

export async function createSampleRequest() {
  let saved = await sampleRequest.save();
  return { message: "Sample request created successfully", data: saved };
}

// Return all requests
export async function getAllRequests() {
  try {
    let requests = await Request.find();
    if (requests.length > 0) {
      return { data: requests };
    } else {
      return { data: [], error: "No requests found" };
    }
  } catch (error) {
    return { error: error.message };
  }
}

// Return a single request using the given ID
export async function getRequestById(requestId) {
  console.log('the data backend', requestId)
  try {
    let request = await Request.findById(requestId);
    if (request) {
      return { data: request };
    } else {
      return { error: "No Request found for this ID" };
    }
  } catch (error) {
    return { error: error.message };
  }
}


export async function updateRequestById(requestId, updateData) {

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { $set: updateData }, 
      { new: true, runValidators: true }
    );

    if (updatedRequest) {
      return { data: updatedRequest };
    } else {
      return { error: "No Request found for this ID to update" };
    }
  } catch (error) {
    return { error: error.message };
  }
}

// Update the status of a request
export async function updateRequestStatus(requestId, status) {
  try {
    let request = await Request.findById(requestId);
    if (request) {
      request.status = status;
      let updated = await request.save();
      return { message: "Updated request status successfully", data: updated };
    } else {
      return { error: "No Request found for this ID" };
    }
  } catch (error) {
    return { error: error.message };
  }
}

export async function updateRequestTimeSlot(requestId, slot) {
  try {
    let request = await Request.findById(requestId);
    if (request) {
      const updatedRequestedDate = dayjs(request.requestedDate)
        .hour(parseInt(slot.split(":")[0]))
        .minute(parseInt(slot.split(":")[1]));

      request.requestedDate = updatedRequestedDate.toISOString();
      request.scheduledDate = updatedRequestedDate.toISOString();
      await request.save();
      return { request };
    } else {
      return { error: "No Request found for this ID" };
    }
  } catch (error) {
    return { error: error.message };
  }
}

export async function getAllPlanVisitRequests() {
  try {
    let requests = await Request.find();
    requests = requests.filter((request) => {
      return request.status === "new" || request.status === "scheduled";
    });
    if (requests.length > 0) {
      return { data: requests };
    } else {
      return { data: [], error: "No requests found" };
    }
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

export async function getScheduledRequestsForDate(date) {
  const start = dayjs(date, "MM-DD-YYYY").utc(true);
  const end = start.add(1, "day");
  console.log("Searching between ", start.format(), " and ", end.format());

  try {
    let requests = await Request.find({
      scheduledDate: {
        $gte: start.toDate(),
        $lte: end.toDate(),
      },
      // status: "scheduled",
    });
    console.log(`Requests Found : ${requests.length}`);
    if (requests.length > 0) {
      return { data: requests };
    } else {
      return { data: [], error: "No requests found for this date." };
    }
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}

export async function fetchFilteredRequests(searchTerm, currentPage, perPage) {
  const offset = (currentPage - 1) * perPage;
  let query = {};
  if (searchTerm.trim() !== "") {
    query = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { phone: { $regex: searchTerm, $options: "i" } },
        { address: { $regex: searchTerm, $options: "i" } },
      ],
    };
  }
  try {
    let totalResults = await Request.find(query).countDocuments();
    let results = await Request.find(query).skip(offset).limit(perPage);
    console.log(
      `Search Term : ${searchTerm}\nCurrentPage: ${currentPage}\nPerPage : ${perPage}\nTotalResults : ${totalResults}\nLimitedResults:${results.length}`
    );
    return {
      totalResults: totalResults,
      data: results,
    };
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}
