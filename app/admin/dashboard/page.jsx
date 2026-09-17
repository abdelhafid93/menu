"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function Dashboard() {
  const [dishes, setDishes] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
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

  // --- تعديل تصنيف ---
  const [editingCategoryId, setEditingCategoryId] = useState(null)
  const [editCategoryValues, setEditCategoryValues] = useState({ name: "", order: "" })
  const [editCategoryImageFile, setEditCategoryImageFile] = useState(null)
  const [savingCategory, setSavingCategory] = useState(false)

  // --- بحث عن الأطباق ---
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadDishes()
  }, [])

  // تظهر رسالة النجاح لمدة 3 ثوانٍ ثم تختفي تلقائياً
  function showSuccess(message) {
    setSuccess(message)
    setTimeout(() => setSuccess(""), 3000)
  }

  async function loadDishes() {
    setLoading(true)
    try {
      const res = await fetch("/api/dishes", { cache: "no-store" })
      if (res.status === 401) {
        window.location.href = "/admin"
        return
      }
      const data = await res.json()
      setDishes(data.dishes || [])
      setCategories(data.categories || [])
    } catch (err) {
      setError("خطأ في تحميل البيانات")
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
      showSuccess("تم التعديل بنجاح ✓")
    } catch (err) {
      setError("تعذر الحفظ، يرجى المحاولة مرة أخرى")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("هل أنت تأكد من أنك تريد حذف هذا الطبق؟")
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
      showSuccess("تم الحذف بنجاح ✓")
    } catch (err) {
      setError("تعذر الحذف، يرجى المحاولة مرة أخرى")
    } finally {
      setDeletingId(null)
    }
  }

  async function handleAddDish(e) {
    e.preventDefault()
    if (!newDish.name || !newDish.categoryId) {
      setError("يرجى إدخال الاسم والتصنيف على الأقل")
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
      showSuccess("تم إضافة الطبق بنجاح ✓")
    } catch (err) {
      setError("تعذر إضافة الطبق، يرجى المحاولة مرة أخرى")
    } finally {
      setAdding(false)
    }
  }

  async function handleAddCategory(e) {
    e.preventDefault()
    if (!newCategory.name) {
      setError("يرجى إدخال اسم التصنيف")
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
      showSuccess("تم إضافة التصنيف بنجاح ✓")
    } catch (err) {
      setError("تعذر إضافة التصنيف، يرجى المحاولة مرة أخرى")
    } finally {
      setAddingCategory(false)
    }
  }

  async function handleDeleteCategory(id) {
    const confirmed = window.confirm(
      "هل أنت تأكد؟ إذا كانت هناك أطباق مرتبطة بهذا التصنيف، سيفشل الحذف."
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
      showSuccess("تم حذف التصنيف بنجاح ✓")
    } catch (err) {
      setError(err.message || "تعذر حذف التصنيف")
    } finally {
      setDeletingCategoryId(null)
    }
  }

  function startEditCategory(cat) {
    setEditingCategoryId(cat._id)
    setEditCategoryValues({ name: cat.name, order: cat.order ?? "" })
    setEditCategoryImageFile(null)
    setError("")
  }

  function cancelEditCategory() {
    setEditingCategoryId(null)
    setEditCategoryImageFile(null)
    setError("")
  }

  async function saveEditCategory(id) {
    setSavingCategory(true)
    setError("")
    try {
      let imageAssetId = null
      if (editCategoryImageFile) {
        imageAssetId = await uploadImage(editCategoryImageFile)
      }

      const res = await fetch("/api/categories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name: editCategoryValues.name,
          order: editCategoryValues.order,
          imageAssetId,
        }),
      })

      if (!res.ok) throw new Error()

      await loadDishes()
      setEditingCategoryId(null)
      showSuccess("تم تعديل التصنيف بنجاح ✓")
    } catch (err) {
      setError("تعذر حفظ التصنيف، يرجى المحاولة مرة أخرى")
    } finally {
      setSavingCategory(false)
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
        {success && (
          <p className="text-green-400 text-center mb-4 bg-green-500/10 border border-green-500/30 rounded-full py-2 px-4">
            {success}
          </p>
        )}

        {tab === "dishes" && (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث عن طبق بالاسم..."
                className="flex-1 rounded-full bg-[#171717] border border-gray-700 px-5 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={() => setShowAddForm((v) => !v)}
                className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-amber-600 transition whitespace-nowrap"
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
              {dishes
                .filter((dish) =>
                  dish.name?.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((dish) => (
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

                    <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
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
                            className="rounded-full border border-amber-500/30 px-4 py-2 text-sm text-amber-400 hover:bg-amber-500 hover:text-black transition text-center"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(dish._id)}
                            disabled={deletingId === dish._id}
                            className="rounded-full border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white transition disabled:opacity-50 text-center"
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
                        تغيير صورة الطبق (اختياري)
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
              <p className="text-gray-400 text-center">لا توجد أطباق حالياً</p>
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
                  className="rounded-2xl border border-amber-500/20 bg-[#171717] p-4"
                >
                  <div className="flex items-center gap-4">
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

                    {editingCategoryId === cat._id ? (
                      <div className="flex-1 flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={editCategoryValues.name}
                          onChange={(e) =>
                            setEditCategoryValues((v) => ({
                              ...v,
                              name: e.target.value,
                            }))
                          }
                          className="flex-1 rounded-lg bg-[#0F0F0F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                          placeholder="اسم التصنيف"
                        />
                        <input
                          type="number"
                          value={editCategoryValues.order}
                          onChange={(e) =>
                            setEditCategoryValues((v) => ({
                              ...v,
                              order: e.target.value,
                            }))
                          }
                          className="w-full sm:w-24 rounded-lg bg-[#0F0F0F] border border-gray-700 px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                          placeholder="ترتيب"
                        />
                      </div>
                    ) : (
                      <div className="flex-1">
                        <p className="text-white font-semibold">{cat.name}</p>
                        <p className="text-gray-400 text-sm">
                          الترتيب: {cat.order ?? "-"}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                      {editingCategoryId === cat._id ? (
                        <>
                          <button
                            onClick={() => saveEditCategory(cat._id)}
                            disabled={savingCategory}
                            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-600 disabled:opacity-50"
                          >
                            {savingCategory ? "..." : "حفظ"}
                          </button>
                          <button
                            onClick={cancelEditCategory}
                            className="rounded-full border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                          >
                            إلغاء
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditCategory(cat)}
                            className="rounded-full border border-amber-500/30 px-4 py-2 text-sm text-amber-400 hover:bg-amber-500 hover:text-black transition text-center"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cat._id)}
                            disabled={deletingCategoryId === cat._id}
                            className="rounded-full border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white transition disabled:opacity-50 text-center"
                          >
                            {deletingCategoryId === cat._id ? "..." : "حذف"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {editingCategoryId === cat._id && (
                    <div className="mt-3">
                      <label className="block text-gray-400 text-sm mb-1">
                        تغيير صورة التصنيف (اختياري)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setEditCategoryImageFile(e.target.files[0])
                        }
                        className="w-full text-gray-300 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-amber-500 file:px-4 file:py-2 file:text-black file:font-semibold"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {categories.length === 0 && (
              <p className="text-gray-400 text-center">لا توجد تصنيفات حالياً</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}