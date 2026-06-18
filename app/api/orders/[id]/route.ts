import { NextResponse } from "next/server";
import { readDb } from "@/lib/storage";

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await context.params;

  const db = await readDb();

  const order =
    db.orders.find(
      (o: any) => o.id === id
    );

  if (!order) {
    return NextResponse.json(
      {
        message:
          "Order not found"
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    order
  );
}