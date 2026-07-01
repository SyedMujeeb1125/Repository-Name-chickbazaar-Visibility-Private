type Metric = {
  title: string;
  value: string | number;
  color: string;
};

type Props = {
  metrics: Metric[];
};

export default function DashboardMetrics({
  metrics,
}: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-5">

      {metrics.map((metric) => (

        <div
          key={metric.title}
          className={`${metric.color} rounded-xl p-5 text-white shadow`}
        >
          <p className="text-sm opacity-90">
            {metric.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {metric.value}
          </h2>
        </div>

      ))}

    </div>
  );
}