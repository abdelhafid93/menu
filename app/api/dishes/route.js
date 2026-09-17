import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { writeClient } from "@/sanity/writeClient"

export async function GET() {
  // التحقق من الجلسة قبل إعطاء البيانات
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
  }

  try {
    const dishes = await writeClient.fetch(
      `*[_type == "article"] | order(name asc) {
        _id,
        name,
        price,
        "imageUrl": image.asset->url,
        "categoryName": menuHome->name
      }`
    )

    // نجيبو التصنيفات أيضاً باش نستعملهم فقائمة (dropdown) إضافة طبق جديد
const categories = await writeClient.fetch(
  `*[_type == "menuHome"] | order(name asc) {
    _id,
    name,
    order,
    "imageUrl": image.asset->url
  }`
)

    return NextResponse.json({ dishes, categories })
  } catch (err) {
    return NextResponse.json({ error: "خطأ فجلب البيانات" }, { status: 500 })
  }
}

export async function PATCH(request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
  }

  try {
    const { id, name, price } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "معرف الطبق ناقص" }, { status: 400 })
    }

    const updatedDoc = await writeClient
      .patch(id) // id هو الـ _id ديال الوثيقة فـ Sanity
      .set({ name, price })
      .commit()

    return NextResponse.json({ success: true, doc: updatedDoc })
  } catch (err) {
    return NextResponse.json({ error: "خطأ فالتحديث" }, { status: 500 })
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
      return NextResponse.json({ error: "معرف الطبق ناقص" }, { status: 400 })
    }

    await writeClient.delete(id)

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "خطأ فالحذف" }, { status: 500 })
  }
}

export async function POST(request) {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")

  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
  }

  try {
    const {
      name,
      price,
      categoryId,
      imageAssetId,
    } = await request.json()

    if (!name || !categoryId) {
      return NextResponse.json(
        { error: "الاسم والتصنيف مطلوبين" },
        { status: 400 }
      )
    }

    const newDoc = await writeClient.create({
      _type: "article",
      name,
      price: Number(price) || 0,

      slug: {
        _type: "slug",
        current: name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      },

      categoryes: {
        _type: "reference",
        _ref: categoryId,
      },

      ...(imageAssetId && {
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAssetId,
          },
        },
      }),

      isBestSeller: false,
    })

    return NextResponse.json({
      success: true,
      doc: newDoc,
    })
  } catch (err) {
    console.error("CREATE DISH ERROR:", err)

    return NextResponse.json(
      {
        error: "خطأ فالإضافة",
        details: err.message,
      },
      { status: 500 }
    )
  }
}