import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

const usersFile = path.join(process.cwd(), "data", "users.json");

export async function GET(request: Request) {
  try {
    const token = request.headers
      .get("cookie")
      ?.split("; ")
      .find((cookie) => cookie.startsWith("auth_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);

    if (!payload || !payload.userId) {
      return NextResponse.json(
        { message: "Invalid or expired session" },
        { status: 401 }
      );
    }

    const fileData = await fs.readFile(usersFile, "utf-8");
    const users = JSON.parse(fileData);

    const user = users.find(
      (item: any) => item.id === payload.userId
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("ME API ERROR:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}