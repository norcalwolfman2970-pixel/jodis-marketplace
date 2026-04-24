"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!sessionId) return;

    fetch(`/api/session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((json) => {
  setData(json);

  // send order email to yourself
  fetch("/api/send-order", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(json),
})
  .then((res) => res.json())
  .then((data) => {
    window.location.href = data.url;
  });
})
      .catch(console.error);
  }, []);

  if (!data) {
    return <div className="p-8">Loading order details...</div>;
  }

  const addr =
  data.shipping_details?.address ||
  data.customer_details?.address;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Order Received</h1>

        <h2 className="font-bold mt-4">Shipping Address</h2>
       <p>{data.shipping_details?.name || data.customer_details?.name}</p>

<p>{addr?.line1}</p>
{addr?.line2 && <p>{addr.line2}</p>}
<p>
  {addr?.city}, {addr?.state} {addr?.postal_code}
</p>
<p>{addr?.country}</p>

        <h2 className="font-bold mt-6">Items Ordered</h2>
        {data.line_items?.data?.map((item: any, i: number) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>
              {item.description} x {item.quantity}
            </span>
            <span>${(item.amount_total / 100).toFixed(2)}</span>
          </div>
        ))}

        <div className="mt-4 font-bold">
          Total: ${(data.amount_total / 100).toFixed(2)}
        </div>

        <p className="mt-4 text-gray-600">
          We’ll email tracking information shortly.
        </p>
      </div>
    </div>
  );
}