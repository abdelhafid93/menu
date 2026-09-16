"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function Dashboard() {
  const [dishes, setDishes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [tab, setTab] = useState("dishes") // "dishes" | "categories"

  // --- تعديل طبق ---
  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({ name: "", price: "" })
  const [editImageFile, setEditImageFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  // --- إضافة طبق ---
  const [showAddForm, setShowAddForm] = useState(false)
  const [newDish, setNewDish] = useState({ name: "", price: "", categoryId: "" })
  const [newDishImage, setNewDishImage] = useState(null)
  const [adding, setAdding] = useState(false)

  // --- إضافة تصنيف ---
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: "", order: "" })
  const [newCategoryImage, setNewCategoryImage] = useState(null)
  const [addingCategory, setAddingCategory] = useState(false)
  const [deletingCategoryId, setDeletingCategoryId] = useState(null)

  useEffect(() => {
    loadDishes()
  }, [])

  async function loadDishes() {
    setLoading(true)
    try {
      const res = await fetch("/api/dishes")
      if (res.status === 401) {
        window.location.href = "/admin"
        return
      }
      const data = await res.json()
      setDishes(data.dishes || [])
      setCategories(data.categories || [])
    } catch (err) {
      setError("خطأ فتحميل البيانات")
    } finally {
      setLoading(false)
    }
  }

  async function uploadImage(file) {
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: formData })
    const data = await res.json()
    if (!res.ok) {
      console.error("Upload failed:", data)
      throw new Error(data.details || data.error || "فشل رفع الصورة")
    }
    return data.assetId
  }

  function startEdit(dish) {
    setEditingId(dish._id)
    setEditValues({ name: dish.name, price: dish.price })
    setEditImageFile(null)
    setError("")
  }

  function cancelEdit() {
    setEditingId(null)
    setEditImageFile(null)
    setError("")
  }

  async function saveEdit(id) {
    setSaving(true)
    setError("")
    try {
      let imageAssetId = null
      if (editImageFile) {
        imageAssetId = await uploadImage(editImageFile)
      }

      const res = await fetch("/api/dishes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: editValues.name,
          price: Number(editValues.price),
          imageAssetId,
        }),
      })

      if (!res.ok) throw new Error()

      await loadDishes()
      setEditingId(null)
    } catch (err) {
      setError("ماقدرش يحفظ، حاول مرة أخرى")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("واش متأكد بغيتي تحذف هاد الطبق؟")
    if (!confirmed) return

    setDeletingId(id)
    setError("")
    try {
      const res = await fetch("/api/dishes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error()
      setDishes((prev) => prev.filter((d) => d._id !== id))
    } catch (err) {
      setError("ماقدرش يحذف، حاول مرة أخرى")
    } finally {
      setDeletingId(null)
    }
  }

  async function handleAddDish(e) {
    e.preventDefault()
    if (!newDish.name || !newDish.categoryId) {
      setError("خاصك تعطي الاسم والتصنيف على الأقل")
      return
    }

    setAdding(true)
    setError("")
    try {
      let imageAssetId = null
      if (newDishImage) {
        imageAssetId = await uploadImage(newDishImage)
      }

      const res = await fetch("/api/dishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newDish, imageAssetId }),
      })

      if (!res.ok) throw new Error()

      await loadDishes()
      setNewDish({ name: "", price: "", categoryId: "" })
      setNewDishImage(null)
      setShowAddForm(false)
    } catch (err) {
      setError("ماقدرش يضيف الطبق، حاول مرة أخرى")
    } finally {
      setAdding(false)
    }
  }

  async function handleAddCategory(e) {
    e.preventDefault()
    if (!newCategory.name) {
      setError("خاصك تعطي اسم التصنيف")
      return
    }

    setAddingCategory(true)
    setError("")
    try {
      let imageAssetId = null
      if (newCategoryImage) {
        imageAssetId = await uploadImage(newCategoryImage)
      }

      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newCategory, imageAssetId }),
      })

      if (!res.ok) throw new Error()

      await loadDishes()
      setNewCategory({ name: "", order: "" })
      setNewCategoryImage(null)
      setShowAddCategory(false)
    } catch (err) {
      setError("ماقدرش يضيف التصنيف، حاول مرة أخرى")
    } finally {
      setAddingCategory(false)
    }
  }

  async function handleDeleteCategory(id) {
    const confirmed = window.confirm(
      "واش متأكد؟ إلا كاين أطباق مربوطة بهاد التصنيف، الحذف غادي يفشل."
    )
    if (!confirmed) return

    setDeletingCategoryId(id)
    setError("")
    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }
      setCategories((prev) => prev.filter((c) => c._id !== id))
    } catch (err) {
      setError(err.message || "ماقدرش يحذف التصنيف")
    } finally {
      setDeletingCategoryId(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] text-white">
        جاري التحميل...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          لوحة تحكم القائمة
        </h1>

        <div className="flex gap-2 mb-6 justify-center">
          <button
            onClick={() => setTab("dishes")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              tab === "dishes"
                ? "bg-amber-500 text-black"
                : "border border-gray-700 text-gray-300 hover:bg-gray-800"
            }`}
          >
            الأطباق
          </button>
          <button
            onClick={() => setTab("categories")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              tab === "categories"
                ? "bg-amber-500 text-black"
                : "border border-gray-700 text-gray-300 hover:bg-gray-800"
            }`}
          >
            التصنيفات
          </button>
        </div>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        {tab === "dishes" && (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowAddForm((v) => !v)}
                className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber-600 transition"
              >
                {showAddForm ? "إلغاء" : "+ إضافة طبق"}
              </button>
            </div>

            {showAddForm && (
              <form
                onSubmit={handleAddDish}
                className="mb-6 rounded-2xl border border-amber-500/30 bg-[#171717] p-5 space-y-3"
              >
                <input
                  type="text"
                  placeholder="اسم الطبق"
                  value={newDish.name}
                  onChange={(e) =>
                    setNewDish((v) => ({ ...v, name: e.target.value }))
                  }
                  className="w-full rounded-lg bg-[#0F0F0F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="number"
                  placeholder="السعر (DH)"
                  value={newDish.price}
                  onChange={(e) =>
                    setNewDish((v) => ({ ...v, price: e.target.value }))
                  }
                  className="w-full rounded-lg bg-[#0F0F0F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <select
                  value={newDish.categoryId}
                  onChange={(e) =>
                    setNewDish((v) => ({ ...v, categoryId: e.target.value }))
                  }
                  className="w-full rounded-lg bg-[#0F0F0F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="">اختر التصنيف</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    صورة الطبق
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewDishImage(e.target.files[0])}
                    className="w-full text-gray-300 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-black file:font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  disabled={adding}
                  className="w-full rounded-full bg-amber-500 py-2.5 font-semibold text-black hover:bg-amber-600 disabled:opacity-50"
                >
                  {adding ? "جاري الإضافة..." : "إضافة الطبق"}
                </button>
              </form>
            )}

            <div className="space-y-4">
              {dishes.map((dish) => (
                <div
                  key={dish._id}
                  className="rounded-2xl border border-amber-500/20 bg-[#171717] p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-800">
                      {dish.imageUrl && (
                        <Image
                          src={dish.imageUrl}
                          alt={dish.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    {editingId === dish._id ? (
                      <div className="flex-1 flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={editValues.name}
                          onChange={(e) =>
                            setEditValues((v) => ({ ...v, name: e.target.value }))
                          }
                          className="flex-1 rounded-lg bg-[#0F0F0F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                          placeholder="اسم الطبق"
                        />
                        <input
                          type="number"
                          value={editValues.price}
                          onChange={(e) =>
                            setEditValues((v) => ({ ...v, price: e.target.value }))
                          }
                          className="w-full sm:w-28 rounded-lg bg-[#0F0F0F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                          placeholder="السعر"
                        />
                      </div>
                    ) : (
                      <div className="flex-1">
                        <p className="text-white font-semibold">{dish.name}</p>
                        <p className="text-gray-400 text-sm">
                          {dish.categoryName}
                        </p>
                      </div>
                    )}

                    {editingId !== dish._id && (
                      <p className="text-amber-400 font-bold flex-shrink-0">
                        {dish.price} DH
                      </p>
                    )}

                    <div className="flex gap-2 flex-shrink-0">
                      {editingId === dish._id ? (
                        <>
                          <button
                            onClick={() => saveEdit(dish._id)}
                            disabled={saving}
                            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-600 disabled:opacity-50"
                          >
                            {saving ? "..." : "حفظ"}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="rounded-full border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                          >
                            إلغاء
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(dish)}
                            className="rounded-full border border-amber-500/30 px-4 py-2 text-sm text-amber-400 hover:bg-amber-500 hover:text-black transition"
                          >
                            عدّل
                          </button>
                          <button
                            onClick={() => handleDelete(dish._id)}
                            disabled={deletingId === dish._id}
                            className="rounded-full border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                          >
                            {deletingId === dish._id ? "..." : "حذف"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {editingId === dish._id && (
                    <div className="mt-3">
                      <label className="block text-gray-400 text-sm mb-1">
                        تبديل صورة الطبق (اختياري)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setEditImageFile(e.target.files[0])}
                        className="w-full text-gray-300 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-black file:font-semibold"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {dishes.length === 0 && (
              <p className="text-gray-400 text-center">ماكاينش أطباق بعد</p>
            )}
          </>
        )}

        {tab === "categories" && (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowAddCategory((v) => !v)}
                className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber-600 transition"
              >
                {showAddCategory ? "إلغاء" : "+ إضافة تصنيف"}
              </button>
            </div>

            {showAddCategory && (
              <form
                onSubmit={handleAddCategory}
                className="mb-6 rounded-2xl border border-amber-500/30 bg-[#171717] p-5 space-y-3"
              >
                <input
                  type="text"
                  placeholder="اسم التصنيف (مثلاً: لحوم)"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory((v) => ({ ...v, name: e.target.value }))
                  }
                  className="w-full rounded-lg bg-[#0F0F0F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="number"
                  placeholder="ترتيب الظهور (مثلاً 1)"
                  value={newCategory.order}
                  onChange={(e) =>
                    setNewCategory((v) => ({ ...v, order: e.target.value }))
                  }
                  className="w-full rounded-lg bg-[#0F0F0F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    صورة التصنيف
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewCategoryImage(e.target.files[0])}
                    className="w-full text-gray-300 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-black file:font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  disabled={addingCategory}
                  className="w-full rounded-full bg-amber-500 py-2.5 font-semibold text-black hover:bg-amber-600 disabled:opacity-50"
                >
                  {addingCategory ? "جاري الإضافة..." : "إضافة التصنيف"}
                </button>
              </form>
            )}

            <div className="space-y-4">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="flex items-center gap-4 rounded-2xl border border-amber-500/20 bg-[#171717] p-4"
                >
                  <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-gray-800">
                    {cat.imageUrl && (
                      <Image
                        src={cat.imageUrl}
                        alt={cat.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">{cat.name}</p>
                    <p className="text-gray-400 text-sm">ترتيب: {cat.order ?? "-"}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(cat._id)}
                    disabled={deletingCategoryId === cat._id}
                    className="rounded-full border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                  >
                    {deletingCategoryId === cat._id ? "..." : "حذف"}
                  </button>
                </div>
              ))}
            </div>

            {categories.length === 0 && (
              <p className="text-gray-400 text-center">ماكاينش تصنيفات بعد</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}