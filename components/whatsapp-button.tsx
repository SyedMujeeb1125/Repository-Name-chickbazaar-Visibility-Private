import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/910000000000?text=I%20want%20to%20order%20live%20broiler%20chickens"
      className="fixed bottom-5 right-4 z-50 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#1FAF38] px-4 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-[#17872b] sm:right-6"
      aria-label="Order via WhatsApp"
    >
      <MessageCircle size={19} />
      <span>Order Via WhatsApp</span>
    </a>
  );
}
