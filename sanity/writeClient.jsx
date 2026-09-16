import { createClient } from "@sanity/client"

// هاد الـ client عندو صلاحية القراءة والكتابة (write token)
// يستعمل غير فالـ server (API routes)، ماشي فالـ client مباشرة
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN, // token خاص بصلاحية الكتابة
  useCdn: false, // خاص يكون false باش الكتابة تخدم مزيان
})