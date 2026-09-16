import { NextResponse } from "next/server"

export async function POST(request) {
  const { password } = await request.json()

  // الرقم السري محفوظ فـ .env، ماشي مكتوب مباشرة فالكود
  const correctPassword = process.env.ADMIN_PASSWORD

  if (!correctPassword) {
    return NextResponse.json(
      { success: false, error: "الإعدادات غير مكتملة" },
      { status: 500 }
    )
  }

  if (password === correctPassword) {
    const response = NextResponse.json({ success: true })

    // كوكي بسيطة باش الزبون ما يحتاجش يدخل الرقم السري كل صفحة
    // صالحة لمدة 24 ساعة
    response.cookies.set("admin_session", correctPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    })

    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}