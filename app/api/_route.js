// pages/api/login.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  console.log("HERE");
  const res = await request.json();
  // const cookie = cookies().get("next-auth.session-token");
  /*
  try {
    const authResponse = await axios.post(
      `http://localhost:4001/users/is-allowed-to-sign-in`,
      req.body,
      {
        headers: {
          Authorization: cookie?.value,
        },
      }
    );

    // Check if the authentication was successful
    if (authResponse.status === 200) {
      console.log("USER IS ALLOWed");
      // Return a success response
      res.status(200).json({ message: "Login successful" });
    } else {
      // Handle authentication errors
      res.status(401).json({ message: "Login failed" });
    }
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  */

  return NextResponse.json({ res });
}
