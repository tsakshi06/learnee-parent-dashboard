import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";
import { createToken } from "@/lib/auth";

const usersFile = path.join(process.cwd(), "data", "users.json");

export async function POST(request: Request) {
  try {
    // Get data from request
    const body = await request.json();

    const email = body.email;
    const password = body.password;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }

    // Normalize email
    const normalizedEmail = String(email).toLowerCase().trim();

    // Read users.json
    const fileData = await fs.readFile(usersFile, "utf-8");

    // Convert JSON string to array
    const users = JSON.parse(fileData);

    // Find user
    const user = users.find(
      (item: { email: string }) =>
        item.email.toLowerCase() === normalizedEmail
    );

    // User not found
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    // Wrong password
    if (!passwordMatch) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    // Create authentication token
    const token = await createToken(user.id);

    // Create response
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 200,
      }
    );

    // Store token in HTTP-only cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}