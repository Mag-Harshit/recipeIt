import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");
  const username = searchParams.get("username");

  try {
    if (!uid) throw new Error("uid required");
    await sql`INSERT into users(uid, username) values(${uid},${username})`;
    const usernames = await sql`SELECT username from users`;
    return NextResponse.json({ usernames }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
