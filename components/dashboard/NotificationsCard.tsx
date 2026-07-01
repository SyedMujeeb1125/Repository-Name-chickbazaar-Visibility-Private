export default function NotificationsCard() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow">

      <h2 className="mb-5 text-xl font-bold">
        Notifications
      </h2>

      <div className="space-y-3">

        <div className="rounded bg-green-50 p-3">
          ✅ Welcome to ChickBazaar
        </div>

        <div className="rounded bg-blue-50 p-3">
          📢 Order before 11:59 PM for next day delivery.
        </div>

      </div>

    </div>
  );
}