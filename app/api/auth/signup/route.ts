import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const usersFile = path.join(process.cwd(), "data", "users.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name;
    const email = body.email;
    const password = body.password;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    let users = [];

    try {
      const fileData = await fs.readFile(usersFile, "utf-8");
      users = JSON.parse(fileData);
    } catch {
      users = [];
    }

    const existingUser = users.find(
      (user: any) => user.email === normalizedEmail
    );

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    };

    users.push(newUser);

    await fs.mkdir(path.dirname(usersFile), {
      recursive: true,
    });

    await fs.writeFile(
      usersFile,
      JSON.stringify(users, null, 2),
      "utf-8"
    );

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}