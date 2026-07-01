type Props = {
  status: string;
};

export function StatusBadge({ status }: Props) {
  const styles: Record<string, string> = {
    // Order Status
    new: "bg-blue-100 text-blue-700",
    confirmed: "bg-indigo-100 text-indigo-700",
    procured: "bg-orange-100 text-orange-700",
    dispatched: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",

    // Payment Status
    pending: "bg-yellow-100 text-yellow-700",
    partially_paid: "bg-orange-100 text-orange-700",
    paid: "bg-green-100 text-green-700",
    refunded: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${
        styles[status] ??
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status.replace(/_/g, " ").toUpperCase()}
    </span>
  );
}