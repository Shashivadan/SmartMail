import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";

import authOptions from "@/lib/auth";
const { google } = require("googleapis");
import { getEmail } from "./helpers";

export async function GET(req: NextRequest, res: NextRequest) {
  const accessToken = req.headers.get("accessToken");
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("not authenticated");
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const oAuth2Client = new google.auth.OAuth2();
    //@ts-ignore
    oAuth2Client.setCredentials({ access_token: session?.user.accessToken });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 50,
    });
    const messages = response.data.messages;

    const emails = await Promise.all(
      messages.map(async (message: any) => await getEmail(message.id, gmail))
    );

    return NextResponse.json({ emails });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch Gmail data" });
  }
}
