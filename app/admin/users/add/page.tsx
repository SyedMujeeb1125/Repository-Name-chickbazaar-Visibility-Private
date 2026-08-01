export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

async function createUser(formData: FormData) {
  "use server";

  const { error } = await supabase
    .from("users")
    .insert({
      name: String(formData.get("name")),
      mobile: String(formData.get("mobile")),
      email: String(formData.get("email")),
      role: String(formData.get("role")),
      active: true,
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error("[CREATE USER]", error);
    throw new Error("Failed to create user.");
  }

  redirect("/admin/users");
}

export default function AddUserPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Add User
      </h1>

      <form
        action={createUser}
        className="space-y-4 rounded-lg border bg-white p-5"
      >
        <input
          name="name"
          placeholder="Name"
          required
          className="w-full rounded border p-3"
        />

        <input
          name="mobile"
          placeholder="Mobile"
          required
          className="w-full rounded border p-3"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded border p-3"
        />

        <select
          name="role"
          className="w-full rounded border p-3"
          defaultValue="operations"
        >
          <option value="operations">
            Operations
          </option>

          <option value="delivery">
            Delivery
          </option>

          <option value="collections">
            Collections
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button
          type="submit"
          className="rounded bg-green-600 px-5 py-3 text-white"
        >
          Save User
        </button>
      </form>
    </div>
  );
}