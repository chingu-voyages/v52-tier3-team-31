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
    const {name, phone, email, address, location, requestedDate} = formData
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
