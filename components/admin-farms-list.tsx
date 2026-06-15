"use client";

import { useState } from "react";

export function AdminFarmsList({
  farms
}: {
  farms: any[];
}) {
  async function updateStatus(
    id: string,
    status: string
  ) {
    const formData =
      new FormData();

    formData.set(
      "collection",
      "farmPartners"
    );

    formData.set("id", id);

    formData.set(
      "status",
      status
    );

    await fetch(
      "/api/admin/status",
      {
        method: "POST",
        body: formData
      }
    );

    window.location.reload();
  }

  const pendingCount =
    farms.filter(
      (f) => f.status === "new"
    ).length;

  const approvedCount =
    farms.filter(
      (f) =>
        f.status === "approved"
    ).length;
   const blockedCount =
  farms.filter(
    (f) =>
      f.status === "blocked"
  ).length;

const [search, setSearch] =
  useState("");

const filtered =
  farms.filter((farm) => {
    const term =
      search.toLowerCase();

    return (
      farm.farmName
        ?.toLowerCase()
        .includes(term) ||
      farm.contactPerson
        ?.toLowerCase()
        .includes(term) ||
      farm.mobile?.includes(
        search
      ) ||
      farm.location
        ?.toLowerCase()
        .includes(term)
    );
  });
  return (
    <div>
      <div className="mb-6 grid gap-4 md:grid-cols-3">

        <div className="rounded-xl bg-orange p-5 text-white">
          <p>Pending Farms</p>

          <p className="text-3xl font-bold">
            {pendingCount}
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">

  <div className="rounded-xl bg-orange p-5 text-white">
    <p>Pending Farms</p>

    <p className="text-3xl font-bold">
      {pendingCount}
    </p>
  </div>

  <div className="rounded-xl bg-green-600 p-5 text-white">
    <p>Approved Farms</p>

    <p className="text-3xl font-bold">
      {approvedCount}
    </p>
  </div>

  <div className="rounded-xl bg-red-600 p-5 text-white">
    <p>Blocked Farms</p>

    <p className="text-3xl font-bold">
      {blockedCount}
    </p>
  </div>

</div>

      </div>
      <input
  type="text"
  placeholder="Search by farm name, contact person, mobile or location"
  value={search}
  onChange={(e) =>
    setSearch(
      e.target.value
    )
  }
  className="mb-6 w-full rounded-lg border p-3"
/>
      <div className="space-y-4">

        {filtered.map((farm) => (
          <div
            key={farm.id}
            className="rounded-lg border bg-white p-5"
          >
            <h3 className="text-lg font-bold">
              {farm.farmName}
            </h3>

            <p>
              Location:
              {" "}
              {farm.location}
            </p>

            <p>
              Contact:
              {" "}
              {farm.contactPerson}
            </p>

            <p>
              Mobile:
              {" "}
              {farm.mobile}
            </p>

            <div className="mt-3">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  farm.status ===
                  "approved"
                    ? "bg-green-100 text-green-700"
                    : farm.status ===
                      "blocked"
                    ? "bg-red-100 text-red-700"
                    : farm.status ===
                      "rejected"
                    ? "bg-slate-200 text-slate-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {farm.status}
              </span>
            </div>

            <div className="mt-3 flex gap-2">

              {farm.status ===
                "new" && (
                <>
                  <button
                    onClick={() =>
                      updateStatus(
                        farm.id,
                        "approved"
                      )
                    }
                    className="rounded bg-green-600 px-3 py-2 text-white"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        farm.id,
                        "rejected"
                      )
                    }
                    className="rounded bg-slate-700 px-3 py-2 text-white"
                  >
                    Reject
                  </button>
                </>
              )}

              {farm.status ===
                "approved" && (
                <button
                  onClick={() =>
                    updateStatus(
                      farm.id,
                      "blocked"
                    )
                  }
                  className="rounded bg-red-600 px-3 py-2 text-white"
                >
                  Block
                </button>
              )}

              {(farm.status ===
                "blocked" ||
                farm.status ===
                  "rejected") && (
                <button
                  onClick={() =>
                    updateStatus(
                      farm.id,
                      "approved"
                    )
                  }
                  className="rounded bg-green-600 px-3 py-2 text-white"
                >
                  Reactivate
                </button>
              )}

            </div>
            
          </div>
        ))}
        {filtered.length === 0 && (
  <div className="rounded-lg border bg-white p-5 text-center text-slate-500">
    No farms found
  </div>
)}
      </div>
    </div>
  );
}