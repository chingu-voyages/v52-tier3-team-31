import { withSession } from "@/app/lib/session";

export async function POST(req) {
  try {
    const body = await req.json();
    const { otp } = body;

    if (!otp) {
      return new Response(JSON.stringify({ error: "OTP is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const session = await withSession();

    console.log("Session OTP:", session?.otp);

    if (session?.otp) {
      if (Date.now() > session.otp.expiry) {
        return new Response(JSON.stringify({ error: "OTP expired" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (otp !== session.otp.value) {
        return new Response(JSON.stringify({ error: "Invalid OTP" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const existingRequest = session.otp.existingRequest;

      if (!existingRequest?._id) {
        return new Response(JSON.stringify({ error: "Invalid session data" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      delete session.otp;
      await session.save();

      return new Response(
        JSON.stringify({
          message: "OTP validated successfully",
          data: existingRequest,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Session expired or OTP not found" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
