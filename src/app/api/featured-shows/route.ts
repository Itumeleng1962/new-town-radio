import { NextResponse } from "next/server";
import { getFeaturedShowsAction } from "@/app/actions/public";

export async function GET() {
  const shows = await getFeaturedShowsAction();
  return NextResponse.json(shows);
}

