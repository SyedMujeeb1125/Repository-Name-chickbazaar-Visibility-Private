export default function OrderTimeline({
  history,
}: {
  history: any[];
}) {
  if (!history?.length) {
    return (
      <p className="text-slate-500">
        No tracking updates yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <div
          key={item.id}
          className="border-l-2 border-orange pl-4"
        >
          <p className="font-semibold capitalize">
            {item.status.replace("_", " ")}
          </p>

          <p className="text-xs text-slate-500">
            {new Date(
              item.created_at
            ).toLocaleString()}
          </p>

          {item.remarks && (
            <p className="text-sm">
              {item.remarks}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}