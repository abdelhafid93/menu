import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { writeClient } from "@/sanity/writeClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function PATCH(request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
  }

  try {
    const { id, name, order, imageAssetId } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "معرف التصنيف ناقص" }, { status: 400 })
    }

    const updates = { name, order: Number(order) || 0 }
    if (imageAssetId) {
      updates.image = {
        _type: "image",
        asset: { _type: "reference", _ref: imageAssetId },
      }
    }

    const updatedDoc = await writeClient.patch(id).set(updates).commit()

    return NextResponse.json({ success: true, doc: updatedDoc })
  } catch (err) {
    return NextResponse.json({ error: "خطأ فالتحديث" }, { status: 500 })
  }
}

export async function POST(request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
  }

  try {
    const { name, order, imageAssetId } = await request.json()

    if (!name) {
      return NextResponse.json({ error: "اسم التصنيف مطلوب" }, { status: 400 })
    }

    const doc = {
      _type: "menuHome",
      name,
      order: Number(order) || 0,
      slug: {
        _type: "slug",
        current: name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      },
    }

    if (imageAssetId) {
      doc.image = {
        _type: "image",
        asset: { _type: "reference", _ref: imageAssetId },
      }
    }

    const newDoc = await writeClient.create(doc)
    return NextResponse.json({ success: true, doc: newDoc })
  } catch (err) {
    return NextResponse.json({ error: "خطأ فالإضافة" }, { status: 500 })
  }
}

export async function DELETE(request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
  }

  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "معرف التصنيف ناقص" }, { status: 400 })
    }

    // تحذير: إلا كاين أطباق مربوطة بهاد التصنيف، الحذف غادي يفشل
    // (Sanity كيمنع حذف وثيقة مربوطة بوثائق أخرى بالـ reference)
    await writeClient.delete(id)

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: "ماقدرش يحذف - ربما كاين أطباق مربوطة بهاد التصنيف" },
      { status: 500 }
    )
  }
}