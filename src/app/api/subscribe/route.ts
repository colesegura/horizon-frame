// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const API_KEY = process.env.BREVO_API_KEY!;
  const LIST_ID = process.env.BREVO_LIST_ID!;

  // 1) Create or update the contact
  const createResp = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      listIds: [Number(LIST_ID)],
      updateEnabled: false
    }),
  });

  if (!createResp.ok) {
    const err = await createResp.json();
    return NextResponse.json({ error: err }, { status: createResp.status });
  }

  return NextResponse.json({ success: true });
}