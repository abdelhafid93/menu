"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push("/admin/dashboard")
      } else {
        setError("الرقم السري غير صحيح")
      }
    } catch (err) {
      setError("وقع خطأ، حاول مرة أخرى")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-amber-500/20 bg-[#171717] p-8"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          لوحة التحكم
        </h1>
        <p className="text-gray-400 text-sm text-center mb-6">
          أدخل الرقم السري للدخول
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="الرقم السري"
          className="w-full rounded-full bg-[#0F0F0F] border border-gray-700 px-5 py-3 text-white text-center focus:outline-none focus:border-amber-500 transition"
          autoFocus
        />

        {error && (
          <p className="text-red-400 text-sm text-center mt-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 rounded-full bg-amber-500 py-3 font-semibold text-black transition hover:bg-amber-600 disabled:opacity-50"
        >
          {loading ? "جاري التحقق..." : "دخول"}
        </button>
      </form>
    </div>
  )
}