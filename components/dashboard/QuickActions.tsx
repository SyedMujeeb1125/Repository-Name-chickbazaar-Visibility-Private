import Link from "next/link";

const actions = [
  {
    title: "Order Chicken",
    href: "/order-chicken",
    icon: "🛒",
  },
  {
    title: "Repeat Orders",
    href: "/repeat-orders",
    icon: "🔁",
  },
  {
    title: "Future Booking",
    href: "/future-bookings",
    icon: "📅",
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: "📄",
  },
];

export default function QuickActions() {
  return (
    <div>

      <h2 className="mb-4 text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-5 md:grid-cols-4">

        {actions.map((action) => (

          <Link
            key={action.title}
            href={action.href}
            className="rounded-2xl border bg-white p-6 text-center shadow transition hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="text-5xl">
              {action.icon}
            </div>

            <p className="mt-4 font-bold">
              {action.title}
            </p>

          </Link>

        ))}

      </div>

    </div>
  );
}