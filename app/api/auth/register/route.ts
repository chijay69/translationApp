import { NextResponse } from "next/server"
import { createUser } from "@/app/utils/edge-config"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    const user = await createUser({ name, email, password })

    if (!user) {
      return NextResponse.json(
        { message: "Error creating user" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    )
  } catch (error: any) {
    if (error.message === "User already exists") {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      )
    }

    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    )
  }
} 