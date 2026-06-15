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

  return (
    <div>
      <div className="mb-6 grid gap-4 md:grid-cols-2">

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

      </div>

      <div className="space-y-4">

        {farms.map((farm) => (
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

      </div>
    </div>
  );
}