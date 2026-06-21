import { createId, addUser } from "@/lib/storage";
import { redirect } from "next/navigation";

async function createUser(formData: FormData) {
  "use server";

  await addUser({
    id: createId("USR"),
    createdAt: new Date().toISOString(),

    name: String(formData.get("name")),
    mobile: String(formData.get("mobile")),
    email: String(formData.get("email")),

    role: formData.get("role") as any,

    active: true,
  });

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
          placeholder="Email"
          required
          className="w-full rounded border p-3"
        />

        <select
          name="role"
          className="w-full rounded border p-3"
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
          className="rounded bg-green-600 px-5 py-3 text-white"
        >
          Save User
        </button>
      </form>
    </div>
  );
}