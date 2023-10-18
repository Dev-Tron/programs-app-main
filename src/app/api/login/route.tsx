import prisma from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
  

    const user = await prisma.user.findFirst({
      where: {
        email: username,
      },
    });

    if (user) {
      // Always allow the user to log in, regardless of verification status
      if (await bcrypt.compare(password, user.password)) {
        const { password: _, ...userWithoutPass } = user;
        const jwtSecret = process.env.NEXTAUTH_SECRET;

        if (!jwtSecret) {
          return new Response(JSON.stringify({ error: "JWT secret not configured" }), {
            status: 500, // Internal Server Error
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        const token = jwt.sign(userWithoutPass, jwtSecret, {
          expiresIn: "1h", // Set your desired token expiration time
        })

        return new Response(JSON.stringify({ user: userWithoutPass, token }));
      } else {
        // Invalid password
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
          status: 401, // Unauthorized
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } else {
      // User not found
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401, // Unauthorized
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500, // Internal Server Error
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
