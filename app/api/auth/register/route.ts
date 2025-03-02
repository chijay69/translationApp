import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { getUserByEmail } from "@/app/utils/edge-config"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // For now, we'll return success without storing the user
    // You should implement proper user storage using a database
    return NextResponse.json(
      { 
        message: "User registered successfully",
        user: {
          name,
          email,
          // Don't send back the hashed password
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    )
  }
} 