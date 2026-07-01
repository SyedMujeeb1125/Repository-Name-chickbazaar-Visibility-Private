type Props = {
  retailerName: string;
};

export default function DashboardHeader({
  retailerName,
}: Props) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold text-navy">
        {greeting}, {retailerName} 👋
      </h1>

      <p className="text-slate-500">
        Welcome to ChickBazaar Retailer Portal
      </p>
    </div>
  );
}