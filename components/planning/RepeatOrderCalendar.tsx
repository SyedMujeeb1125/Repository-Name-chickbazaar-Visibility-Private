type Props = {
  orders: any[];
};

export default function RepeatOrderCalendar({
  orders,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow">

      <h2 className="text-2xl font-bold">
        Upcoming Deliveries
      </h2>

      <p className="mt-2 text-slate-500">
        This will become an intelligent planning calendar.
      </p>

      <div className="mt-8 grid grid-cols-7 gap-3">

        {[
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
        ].map((day) => (

          <div
            key={day}
            className="rounded-lg bg-slate-100 p-3 text-center font-semibold"
          >
            {day}
          </div>

        ))}

        {Array.from({ length: 28 }).map((_, index) => (

          <div
            key={index}
            className="flex h-16 items-center justify-center rounded-lg border hover:bg-orange hover:text-white"
          >
            {index + 1}
          </div>

        ))}

      </div>

      <p className="mt-6 text-sm text-slate-500">
        🚀 Next Sprint this calendar will automatically highlight
        repeat orders, future bookings and holidays.
      </p>

    </div>
  );
}