import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "development-secret-key"
);

export async function createToken(
  userId: string
): Promise<string> {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return token;
}

export async function verifyToken(token: string) {
  try {
    const result = await jwtVerify(token, secret);

    return result.payload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}