import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "1",
      title: "Order Confirmed",
      description: "Order CB-2026-0145 has been confirmed.",
      time: "10 min ago",
      icon: "✅",
    },
    {
      id: "2",
      title: "Captain Assigned",
      description: "Captain Salman has been assigned.",
      time: "35 min ago",
      icon: "🚚",
    },
    {
      id: "3",
      title: "Payment Received",
      description: "₹20,000 payment received.",
      time: "Yesterday",
      icon: "💰",
    },
    {
      id: "4",
      title: "Order Delivered",
      description: "Order CB-2026-0142 delivered successfully.",
      time: "2 days ago",
      icon: "📦",
    },
  ]);
}