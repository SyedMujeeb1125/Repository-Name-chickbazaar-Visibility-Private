import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-slate-900 p-5 text-white">
          <h2 className="mb-8 text-2xl font-bold">
            ChickBazaar Admin
          </h2>

          <nav className="space-y-3">
            <Link href="/admin" className="block rounded p-3 hover:bg-white/10">
              Dashboard
            </Link>

            <Link href="/admin/orders" className="block rounded p-3 hover:bg-white/10">
              Orders
            </Link>

            <Link
  href="/admin/allocation"
  className="block rounded p-3 hover:bg-white/10"
>
  Allocation
</Link>

            <Link href="/admin/retailers" className="block rounded p-3 hover:bg-white/10">
              Retailers
            </Link>

            <Link href="/admin/farms" className="block rounded p-3 hover:bg-white/10">
              Farm Partners
            </Link>

            <Link
  href="/admin/inventory"
  className="block rounded p-3 hover:bg-white/10"
>
  Inventory
</Link>

            <Link href="/admin/rates" className="block rounded p-3 hover:bg-white/10">
              Daily Rate
            </Link>
            <Link
  href="/admin/procurement"
  className="block rounded p-3 hover:bg-white/10"
>
  Procurement
</Link>
<Link
  href="/admin/outstanding"
  className="block rounded p-3 hover:bg-white/10"
>
  Outstanding
</Link>

<Link
  href="/admin/collections"
  className="block rounded p-3 hover:bg-white/10"
>
  Collections
</Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}