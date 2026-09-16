import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { writeClient } from "@/sanity/writeClient"

export async function POST(request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "ماكاينش صورة" }, { status: 400 })
    }

    // نحولو الملف لـ buffer باش Sanity يقدر يرفعو
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const asset = await writeClient.assets.upload("image", buffer, {
      filename: file.name,
      contentType: file.type,
    })

    return NextResponse.json({ success: true, assetId: asset._id, url: asset.url })
  } catch (err) {
    console.error("UPLOAD ERROR:", err)
    return NextResponse.json(
      { error: "خطأ فرفع الصورة", details: err.message },
      { status: 500 }
    )
  }
}