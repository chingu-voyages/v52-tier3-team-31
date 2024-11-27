"use server";

import connectToDatabase from "@/app/lib/db";
import Request from "@/app/models/Request";

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
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const address = formData.get("address");
    const requestedDate = formData.get("requestedDate");
    const scheduledDate = requestedDate;

    const request = new Request({
      name,
      phone,
      email,
      address,
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
    let totalResults = await Request.find(query);
    let results = await Request.find(query).skip(offset).limit(perPage);
    console.log(
      `Search Term : ${searchTerm}\nCurrentPage: ${currentPage}\nPerPage : ${perPage}\nTotalResults : ${totalResults.length}\nLimitedResults:${results.length}`
    );
    // results.map((request) => {
    //   console.log(`Name: ${request.name}`);
    // });
    return results;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}
