import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth.handler);

export async function GET(request) {
  await connectToDatabase();
  return handlers.GET(request);
}

export async function POST(request) {
  await connectToDatabase();
  return handlers.POST(request);
}
