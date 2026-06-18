"use client";

import { useState } from "react";

export function AdminRetailersList({
  retailers,
  retailerLocations
}: {
  retailers: any[];
  retailerLocations: any[];
}) {
  const [search, setSearch] =
    useState("");
    const [statusFilter, setStatusFilter] =
  useState("all");

  const [openRetailer, setOpenRetailer] =
    useState<string | null>(null);
    
    async function updateStatus(
  id: string,
  status: string
) {
  async function updateCategory(
  retailerId: string,
  category: string
) {
  const formData = new FormData();

  formData.set(
    "retailerId",
    retailerId
  );

  formData.set(
    "category",
    category
  );

  await fetch(
    "/api/admin/retailer-category",
    {
      method: "POST",
      body: formData
    }
  );

  window.location.reload();
}
  const formData = new FormData();

  formData.set(
    "collection",
    "retailers"
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
async function updateCategory(
  retailerId: string,
  category: string
) {
  const formData = new FormData();

  formData.set(
    "retailerId",
    retailerId
  );

  formData.set(
    "category",
    category
  );

  await fetch(
    "/api/admin/retailer-category",
    {
      method: "POST",
      body: formData
    }
  );

  window.location.reload();
}

  const filtered = retailers.filter(
  (retailer) => {
    const term =
      search.toLowerCase();

    const matchesSearch =
      retailer.shopName
        ?.toLowerCase()
        .includes(term) ||
      retailer.ownerName
        ?.toLowerCase()
        .includes(term) ||
      retailer.mobile
        ?.includes(search) ||
      retailer.email
        ?.toLowerCase()
        .includes(term);

    const matchesStatus =
      statusFilter === "all"
        ? true
        : retailer.status ===
          statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );
  }
);

  const pendingCount =
    retailers.filter(
      (r) => r.status === "new"
    ).length;

  const approvedCount =
  retailers.filter(
    (r) =>
      r.status === "approved"
  ).length;

  return (
    <div>
      <div className="mb-6 grid gap-4 md:grid-cols-2">

        <div className="rounded-xl bg-orange p-5 text-white">
          <p>Pending Retailers</p>

          <p className="text-3xl font-bold">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-xl bg-green-600 p-5 text-white">
          <p>Approved Retailers</p>

          <p className="text-3xl font-bold">
            {approvedCount}
          </p>
        </div>

      </div>

      <div className="mb-4 flex flex-wrap gap-2">

  <button
    onClick={() =>
      setStatusFilter("all")
    }
    className="rounded bg-slate-700 px-4 py-2 text-white"
  >
    All ({retailers.length})
  </button>

  <button
    onClick={() =>
      setStatusFilter("new")
    }
    className="rounded bg-orange px-4 py-2 text-white"
  >
    Pending ({pendingCount})
  </button>

  <button
    onClick={() =>
      setStatusFilter("approved")
    }
    className="rounded bg-green-600 px-4 py-2 text-white"
  >
    Approved ({approvedCount})
  </button>

  <button
    onClick={() =>
      setStatusFilter("blocked")
    }
    className="rounded bg-red-600 px-4 py-2 text-white"
  >
    Blocked
  </button>

</div>

      <input
        type="text"
        placeholder="Search by shop name, owner, mobile or email"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="mb-6 w-full rounded-lg border p-3"
      />

      <div className="space-y-4">

        {filtered.map((retailer) => {
          const shops =
            retailerLocations.filter(
              (shop) =>
                shop.retailerMobile ===
                retailer.mobile
            );

          const shopCount =
            shops.length + 1;

          return (
            <div
              key={retailer.id}
              className="rounded-lg border bg-white p-5"
            >
              <h3 className="text-lg font-bold">
                {retailer.shopName}
              </h3>

              <p>
                Owner:{" "}
                {retailer.ownerName}
              </p>

              <p>
                Mobile:{" "}
                {retailer.mobile}
              </p>

              <p className="font-semibold text-orange">
                Total Shops: {shopCount}
              </p>
              <p className="font-semibold text-blue-600">
  Category:{" "}
  {retailer.creditCategory || "new"}
</p>
<div className="mt-2 flex gap-2 flex-wrap">

  <button
    onClick={() =>
      updateCategory(
        retailer.id,
        "new"
      )
    }
    className="rounded bg-orange px-3 py-1 text-sm font-semibold text-white"
  >
    New
  </button>

  <button
    onClick={() =>
      updateCategory(
        retailer.id,
        "trusted"
      )
    }
    className="rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white"
  >
    Trusted
  </button>

  <button
    onClick={() =>
      updateCategory(
        retailer.id,
        "premium"
      )
    }
    className="rounded bg-green-600 px-3 py-1 text-sm font-semibold text-white"
  >
    Premium
  </button>

</div>

              <button
                onClick={() =>
                  setOpenRetailer(
                    openRetailer === retailer.id
                      ? null
                      : retailer.id
                  )
                }
                className="mt-2 rounded bg-orange px-3 py-2 text-sm font-semibold text-white"
              >
                {openRetailer === retailer.id
                  ? "Hide Shops"
                  : "View Shops"}
              </button>

              <p className="mt-3">
                Email:{" "}
                {retailer.email}
              </p>

              <div className="mt-2">
  <span
    className={`rounded-full px-3 py-1 text-sm font-semibold ${
      retailer.status === "approved"
        ? "bg-green-100 text-green-700"
        : retailer.status === "blocked"
        ? "bg-red-100 text-red-700"
        : retailer.status === "rejected"
        ? "bg-slate-200 text-slate-700"
        : "bg-orange-100 text-orange-700"
    }`}
  >
    {retailer.status}
  </span>
</div>
<div className="mt-3 flex flex-wrap gap-2">

  {retailer.status === "new" && (
    <>
      <button
        onClick={() =>
          updateStatus(
            retailer.id,
            "approved"
          )
        }
        className="rounded bg-green-600 px-3 py-2 text-sm font-semibold text-white"
      >
        Approve
      </button>

      <button
        onClick={() =>
          updateStatus(
            retailer.id,
            "rejected"
          )
        }
        className="rounded bg-slate-700 px-3 py-2 text-sm font-semibold text-white"
      >
        Reject
      </button>
    </>
  )}

  {retailer.status === "approved" && (
    <button
      onClick={() =>
        updateStatus(
          retailer.id,
          "blocked"
        )
      }
      className="rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white"
    >
      Block
    </button>
  )}

  {(retailer.status === "blocked" ||
    retailer.status === "rejected") && (
    <button
      onClick={() =>
        updateStatus(
          retailer.id,
          "approved"
        )
      }
      className="rounded bg-green-600 px-3 py-2 text-sm font-semibold text-white"
    >
      Reactivate
    </button>
  )}

</div>

              {openRetailer === retailer.id && (
                <div className="mt-4 rounded-lg bg-slate-50 p-4">

                  <h4 className="mb-3 font-bold">
                    Shop Locations
                  </h4>

                  <div className="mb-3 rounded border bg-orange-50 p-3">
                    <p className="font-semibold">
                      {retailer.shopName}
                      {" "}
                      <span className="text-orange">
                        (Registered Shop)
                      </span>
                    </p>

                    <p className="text-sm text-slate-600">
                      {retailer.address}
                    </p>
                  </div>

                  {shops.length > 0 && (
                    <>
                      <p className="mb-2 text-sm font-semibold text-slate-500">
                        Additional Shops
                      </p>

                      {shops.map(
                        (shop: any) => (
                          <div
                            key={shop.id}
                            className="mb-2 rounded border bg-white p-3"
                          >
                            <div className="mt-3 flex flex-wrap gap-2">

  {retailer.status === "new" && (
    <>
      <button
        onClick={() =>
          updateStatus(
            retailer.id,
            "approved"
          )
        }
        className="rounded bg-green-600 px-3 py-2 text-sm font-semibold text-white"
      >
        Approve
      </button>

      <button
        onClick={() =>
          updateStatus(
            retailer.id,
            "rejected"
          )
        }
        className="rounded bg-slate-700 px-3 py-2 text-sm font-semibold text-white"
      >
        Reject
      </button>
    </>
  )}

  {retailer.status === "approved" && (
    <button
      onClick={() =>
        updateStatus(
          retailer.id,
          "blocked"
        )
      }
      className="rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white"
    >
      Block
    </button>
  )}

  {(retailer.status === "blocked" ||
    retailer.status === "rejected") && (
    <button
      onClick={() =>
        updateStatus(
          retailer.id,
          "approved"
        )
      }
      className="rounded bg-green-600 px-3 py-2 text-sm font-semibold text-white"
    >
      Reactivate
    </button>
  )}

</div>

                            <p className="text-sm text-slate-600">
                              {shop.address}
                            </p>
                          </div>
                        )
                      )}
                    </>
                  )}

                </div>
              )}

            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-lg border bg-white p-5 text-center text-slate-500">
            No retailers found
          </div>
        )}

      </div>
    </div>
  );
}