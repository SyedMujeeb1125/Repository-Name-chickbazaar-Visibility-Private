type Props = {
  status: string;
};

const stages = [
  "new",
  "confirmed",
  "procured",
  "dispatched",
  "delivered",
  "completed",
];

const labels: Record<string, string> = {
  new: "Order Placed",
  confirmed: "Payment Received",
  procured: "Procurement",
  dispatched: "Out For Delivery",
  delivered: "Delivered",
  completed: "Completed",
};

export function OrderProgress({
  status,
}: Props) {
  const current =
    stages.indexOf(status);

  return (
    <div className="space-y-4">
      {stages.map((stage, index) => {
        const done =
          index <= current;

        return (
          <div
            key={stage}
            className="flex items-center gap-3"
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${
                done
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
            >
              {done ? "✓" : index + 1}
            </div>

            <span
              className={
                done
                  ? "font-semibold text-green-700"
                  : "text-gray-500"
              }
            >
              {labels[stage]}
            </span>
          </div>
        );
      })}
    </div>
  );
}