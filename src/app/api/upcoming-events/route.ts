import { NextResponse } from "next/server";
import { getUpcomingEventsAction } from "@/app/actions/public";

export async function GET() {
  const events = await getUpcomingEventsAction();
  return NextResponse.json(events);
}

