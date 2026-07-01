export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";

import { getRepeatOrderById } from "@/lib/planning/repeat-orders";

import RepeatOrderForm from "@/components/planning/RepeatOrderForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditRepeatOrderPage({
  params,
}: Props) {
  const { id } = await params;

  let order;

  try {
    order =
      await getRepeatOrderById(id);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">

      <div className="mb-8">

        <h1 className="text-3xl font-extrabold text-navy">
          Edit Repeat Order
        </h1>

        <p className="mt-2 text-slate-500">
          Update your recurring procurement schedule.
        </p>

      </div>

      <RepeatOrderForm
        mode="edit"
        repeatOrder={order}
      />

    </div>
  );
}