'use client';

import { useMemo, useState } from "react";

const productBlocks = [
  { sku: "BLOCK-001", name: "Item 1", description: "EPSON 502 EcoTank Ink Ultra-high Capacity Bottle Black Works with ET-2850, ET-2980, ET-2988, ET-3850, ET-3930, ET-3950, ET-4850, ET-4950 and other select EcoTank models", price: 32, image: "/images/epson-502-black.png" },
  { sku: "BLOCK-002", name: "Item 2", description: "EPSON 502 EcoTank Ink Ultra-high Capacity Bottle Cyan Works with ET-2850, ET-2980, ET-2988, ET-3850, ET-3930, ET-3950, ET-4850, ET-4950 and other select EcoTank models", price: 22, image: "/images/epson-502-cyan.png" },
  { sku: "BLOCK-003", name: "Item 3", description: "EPSON 502 EcoTank Ink Ultra-high Capacity Bottle Magenta Works with ET-2850, ET-2980, ET-2988, ET-3850, ET-3930, ET-3950, ET-4850, ET-4950 and other select EcoTank models", price: 22, image: "/images/epson-502-magenta.png" },
  { sku: "BLOCK-004", name: "Item 4", description: "EPSON 502 EcoTank Ink Ultra-high Capacity Bottle Yellow Works with ET-2850, ET-2980, ET-2988, ET-3850, ET-3930, ET-3950, ET-4850, ET-4950 and other select EcoTank models", price: 22, image: "/images/epson-502-yellow.png" },
  { sku: "BLOCK-005", name: "Item 5", description: "EPSON 502 EcoTank Ink Ultra-high Capacity Bottle Color Combo Pack Works with ET-2850, ET-2980, ET-2988, ET-3850, ET-3930, ET-3950, ET-4850, ET-4950 and other select EcoTank models", price: 60, image: "/images/epson-502-3pack.png" },
  { sku: "BLOCK-006", name: "Item 6", description: "HP 923 Black, Cyan, Magenta, Yellow Ink Cartridges (4-Pack) | Works with Printer Series: OfficeJet 8120, OfficeJet Pro 8130 | Eligible for Instant Ink | 6C3Y6LN", price: 110, image: "/images/hp-923 4 pack.png" },
  { sku: "BLOCK-007", name: "Item 7", description: "HP 923 Cyan Original Ink Cartridge | Works OfficeJet 8120 Series, OfficeJet Pro 8130 Series | Eligible for Instant Ink | 4K0T0LN", price: 25, image: "/images/hp-923-cyan.png" },
  { sku: "BLOCK-008", name: "Item 8", description: "HP 902XL Yellow High-Yield Ink Cartridge | Works OfficeJet 6950, 6960 Series, OfficeJet Pro 6960, 6970 Series | Eligible for Instant Ink | T6M10AN", price: 43, image: "/images/hp 923 yellow.png" },
  { sku: "BLOCK-009", name: "Item 9", description: "Bankers Box 12 Pack Standard Duty File Storage Boxes, Standard Assembly, Removable Lid, Letter/Legal (0071301)", price: 44, image: "/images/bankers box.png" },
  { sku: "BLOCK-010", name: "Item 10", description: "EXPO Dry Erase Markers, Low Odor Ink, Assorted Fashion Colors, Chisel Tip, 36 Count - Easily Erases, Ideal for Classroom, Home, Office", price: 34, image: "/images/expo markers 36 pack.png" },
  { sku: "BLOCK-011", name: "Item 11", description: "Amazon Basics Multipurpose Copy Printer Paper, 20 lb, 8.5 x 11 Inches, 5 Reams (2,500 Sheets), 92 Bright White", price: 35, image: "/images/copy paper 5 reams.png" },
  { sku: "BLOCK-012", name: "Item 12", description: "PILOT G2 Premium Refillable & Retractable Rolling Ball Gel Pens, Fine Point, Black Ink, 12 Count (Pack of 1) (31020)", price: 16, image: "/images/black gel pens.png" },
];

export default function Page() {
  const [cart, setCart] = useState<any[]>([]);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.sku === product.sku);
      if (existing) {
        return prev.map((item) =>
          item.sku === product.sku
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

 const submitOrder = async () => {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: cart }),
  });

  if (!res.ok) {
    alert("Checkout failed");
    return;
  }

  const data = await res.json();
  window.location.href = data.url;
};
const removeFromCart = (sku: string) => {
  setCart((prev) => prev.filter((item) => item.sku !== sku));
};
const updateCartQty = (sku: string, change: number) => {
  setCart((prev) =>
    prev.map((item) =>
      item.sku === sku
        ? { ...item, qty: Math.max(1, item.qty + change) }
        : item
    )
  );
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Jodi’s Marketplace </h1>
      <p className="mb-6 text-gray-500">
  Powered by Wolf Industries – Fast sourcing. Simple ordering.
</p>

     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {productBlocks.map((product) => (
         <div key={product.sku} className="bg-white p-3 rounded shadow-sm">
           <img
  src={product.image}
  className="mb-2 rounded w-full h-32 object-contain bg-white"
/>
            <h3 className="font-semibold text-sm">{product.name}</h3>
<p className="text-xs text-gray-500">{product.description}</p>
<div className="mt-1 font-semibold text-sm">${product.price}</div>

            <button
              onClick={() => addToCart(product)}
             className="mt-2 bg-black text-white px-3 py-1.5 text-sm rounded"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Cart</h2>

        {cart.map((item) => (
          <div key={item.sku} className="flex justify-between items-center mb-3">
  <div>
    <div className="font-medium">{item.name}</div>

    <div className="flex items-center gap-2 mt-1">
      <button
        onClick={() => updateCartQty(item.sku, -1)}
        className="bg-gray-300 px-2 py-1 rounded"
      >
        -
      </button>

      <span>{item.qty}</span>

      <button
        onClick={() => updateCartQty(item.sku, 1)}
        className="bg-gray-300 px-2 py-1 rounded"
      >
        +
      </button>
    </div>

    <div className="text-sm text-gray-500 mt-1">
      ${(item.price * item.qty).toFixed(2)}
    </div>
  </div>

  <button
    onClick={() => removeFromCart(item.sku)}
    className="ml-4 bg-red-500 text-white px-3 py-1 rounded text-sm"
  >
    Remove
  </button>
</div>
  
))}

        <div className="mt-4 font-bold">Total: ${total.toFixed(2)}</div>
        <button
  onClick={submitOrder}
  className="mt-4 bg-green-600 text-white px-6 py-3 rounded text-lg"
>
  CheckOut
</button>
      </div>
    </div>
  );
}