import { draftMode } from "next/headers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  (await draftMode()).disable();
  return new Response("Draft mode is disabled");
}
