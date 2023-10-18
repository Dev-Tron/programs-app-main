import prisma from "../../../lib/prisma";
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken library

interface RequestBody {
  email: string;
  password: string;
  repeatpassword: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  if (!body.password || !body.repeatpassword) {
    // Construct an error object as a separate response.
    const errorResponse = {
      error: "Both 'password' and 'repeatpassword' are required.",
    };

    // Return the error response with a 400 Bad Request status.
    return new Response(JSON.stringify(errorResponse), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const hashedRepeatPassword = await bcrypt.hash(body.repeatpassword, 10);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: hashedPassword,
      repeatpassword: hashedRepeatPassword,
    },
  });

  // Create a JWT token with the user's email in the payload.
  const jwtSecret = 'NEXTAUTH_SECRET'; // Replace with your secret key
  const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });

  // Construct the success response with the JWT token.
  const { password, ...result } = user;

  return new Response(JSON.stringify({ ...result, token }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
