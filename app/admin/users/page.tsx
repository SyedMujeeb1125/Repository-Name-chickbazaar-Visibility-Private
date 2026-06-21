import { readDb } from "@/lib/storage";
import Link from "next/link";
export default async function UsersPage() {
  const db = await readDb();

  
  return (
    <div>
        <h1 className="mb-6 text-3xl font-bold">
  User Management
</h1>

<Link
  href="/admin/users/add"
  className="mb-4 inline-block rounded bg-green-600 px-4 py-2 text-white"
>
  Add User
</Link>
      <h1 className="mb-6 text-3xl font-bold">
        User Management
      </h1>

      <div className="space-y-4">
        {db.users.length === 0 ? (
          <div className="rounded-lg border bg-white p-5">
            No users found.
          </div>
        ) : (
          db.users.map((user: any) => (
            <div
              key={user.id}
              className="rounded-lg border bg-white p-5"
            >
              <h3 className="font-bold">
                {user.name}
              </h3>

              <p>{user.email}</p>

              <p>{user.mobile}</p>

              <p>
                Role:
                {" "}
                <strong>
                  {user.role}
                </strong>
              </p>

              <p>
                Status:
                {" "}
                {user.active
                  ? "Active"
                  : "Inactive"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}