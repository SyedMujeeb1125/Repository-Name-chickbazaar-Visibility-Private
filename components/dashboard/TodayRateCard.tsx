type Props = {
  rate: number;
};

export default function TodayRateCard({
  rate,
}: Props) {
  return (
    <div className="rounded-2xl bg-orange p-6 text-white shadow-lg">

      <p className="text-sm uppercase tracking-widest opacity-90">
        Today's Live Broiler Rate
      </p>

      <h2 className="mt-2 text-5xl font-extrabold">
        ₹{rate}
      </h2>

      <p className="mt-1 text-lg">
        Per Kilogram
      </p>

    </div>
  );
}