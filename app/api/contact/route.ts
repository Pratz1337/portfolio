import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const formData = body?.formData

    if (!formData?.name || !formData?.email || !formData?.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("Contact form submission:", formData)

    return NextResponse.json({
      success: true,
      message: "Message received successfully.",
    })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
