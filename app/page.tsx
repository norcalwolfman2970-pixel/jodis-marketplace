'use client';

import { useMemo, useState } from "react";

const productBlocks = [
  {
  sku: "DESK-031",
  name: "Folding Computer Desk - 31.5\"",
  description: "Compact folding desk, teak and white, fully assembled, ideal for small spaces",
  price: 115,
  image: "/images/desk-31.png",
  category: "Furniture",
},
{
  sku: "DESK-039",
  name: "Folding Computer Desk - 39\"",
  description: "Standard folding desk, teak and white, fully assembled",
  price: 125,
  image: "/images/desk-31.png",
  category: "Furniture",
},
{
  sku: "DESK-047",
  name: "Folding Computer Desk - 47\"",
  description: "Large folding desk, teak and white, fully assembled, great for dual monitors",
  price: 155,
  image: "/images/desk-31.png",
  category: "Furniture",
},
  { sku: "BLOCK-001", name: "EPSON 502 Black Ink Bottle", description: "EPSON 502 EcoTank Ink Ultra-high Capacity Bottle Black Works with ET-2850, ET-2980, ET-2988, ET-3850, ET-3930, ET-3950, ET-4850, ET-4950 and other select EcoTank models", price: 32, image: "/images/epson-502-black.png",category: "Ink & Toner", },
  { sku: "BLOCK-002", name: "EPSON 502 Cyan Ink Bottle", description: "EPSON 502 EcoTank Ink Ultra-high Capacity Bottle Cyan Works with ET-2850, ET-2980, ET-2988, ET-3850, ET-3930, ET-3950, ET-4850, ET-4950 and other select EcoTank models", price: 22, image: "/images/epson-502-cyan.png",category: "Ink & Toner", },
  { sku: "BLOCK-003", name: "EPSON 502 Magenta Ink Bottle", description: "EPSON 502 EcoTank Ink Ultra-high Capacity Bottle Magenta Works with ET-2850, ET-2980, ET-2988, ET-3850, ET-3930, ET-3950, ET-4850, ET-4950 and other select EcoTank models", price: 22, image: "/images/epson-502-magenta.png",category: "Ink & Toner", },
  { sku: "BLOCK-004", name: "EPSON 502 Yellow Ink Bottle", description: "EPSON 502 EcoTank Ink Ultra-high Capacity Bottle Yellow Works with ET-2850, ET-2980, ET-2988, ET-3850, ET-3930, ET-3950, ET-4850, ET-4950 and other select EcoTank models", price: 22, image: "/images/epson-502-yellow.png",category: "Ink & Toner", },
  { sku: "BLOCK-005", name: "EPSON 502 Combo Pack Ink Bottles", description: "EPSON 502 EcoTank Ink Ultra-high Capacity Bottle Color Combo Pack Works with ET-2850, ET-2980, ET-2988, ET-3850, ET-3930, ET-3950, ET-4850, ET-4950 and other select EcoTank models", price: 60, image: "/images/epson-502-3pack.png",category: "Ink & Toner", },
  { sku: "BLOCK-006", name: "HP 923 Black, Cyan, Magenta, Yellow Ink Cartridges", description: "HP 923 Black, Cyan, Magenta, Yellow Ink Cartridges (4-Pack) | Works with Printer Series: OfficeJet 8120, OfficeJet Pro 8130 | Eligible for Instant Ink | 6C3Y6LN", price: 110, image: "/images/hp-923 4 pack.png",category: "Ink & Toner", },
  { sku: "BLOCK-007", name: "HP 923 Cyan Original Ink Cartridge", description: "HP 923 Cyan Original Ink Cartridge | Works OfficeJet 8120 Series, OfficeJet Pro 8130 Series | Eligible for Instant Ink | 4K0T0LN", price: 25, image: "/images/hp-923-cyan.png",category: "Ink & Toner", },
  { sku: "BLOCK-008", name: "HP 902XL Yellow High-Yield Ink Cartridge", description: "HP 902XL Yellow High-Yield Ink Cartridge | Works OfficeJet 6950, 6960 Series, OfficeJet Pro 6960, 6970 Series | Eligible for Instant Ink | T6M10AN", price: 43, image: "/images/hp 923 yellow.png",category: "Ink & Toner", },
  { sku: "BLOCK-009", name: "Bankers Box 12 Pack", description: "Bankers Box 12 Pack Standard Duty File Storage Boxes, Standard Assembly, Removable Lid, Letter/Legal (0071301)", price: 44, image: "/images/bankers box.png",category: "Office Supplies", },
  { sku: "BLOCK-010", name: "EXPO Dry Erase Markers", description: "EXPO Dry Erase Markers, Low Odor Ink, Assorted Fashion Colors, Chisel Tip, 36 Count - Easily Erases, Ideal for Classroom, Home, Office", price: 34, image: "/images/expo markers 36 pack.png",category: "Office Supplies", },
  { sku: "BLOCK-011", name: "Amazon Basics Multipurpose Copy Printer Paper", description: "Amazon Basics Multipurpose Copy Printer Paper, 20 lb, 8.5 x 11 Inches, 5 Reams (2,500 Sheets), 92 Bright White", price: 35, image: "/images/copy paper 5 reams.png",category: "Paper", },
  { sku: "BLOCK-012", name: "PILOT G2 Premium Refillable & Retractable Rolling Ball Gel Pens", description: "PILOT G2 Premium Refillable & Retractable Rolling Ball Gel Pens, Fine Point, Black Ink, 12 Count (Pack of 1) (31020)", price: 16, image: "/images/black gel pens.png",category: "Office Supplies", },
  { sku: "BLOCK-013", name: "HP 902 Black Ink Cartridge", description: "HP 902 Black Ink Cartridge", price: 34, image: "/images/hp-902-black.png",category: "Ink & Toner", },
  { sku: "BLOCK-014", name: "HP 902 Tri-color Ink Cartridge", description: "HP 902 Tri-color Ink Cartridge", price: 62, image: "/images/hp-902-color.png",category: "Ink & Toner", },
  { sku: "BLOCK-015", name: "HP 62 Black Ink Cartridge", description: "HP 62 Black Ink Cartridge", price: 30, image: "/images/hp-62-black.png",category: "Ink & Toner", },
  { sku: "BLOCK-016", name: "HP 62 Tri-color Ink Cartridge", description: "HP 62 Tri-color Ink Cartridge", price: 72, image: "/images/hp-62-color.png",category: "Ink & Toner", },
  {
  
  sku: "PPE-001-S",
  name: "Disposable Nitrile Gloves - Small (Box of 100)",
  description: "Powder-free nitrile gloves, size Small",
  price: 12,
  image: "/images/sm-nitrile-gloves.png",
  category: "PPE",
},
{
  sku: "PPE-001-M",
  name: "Disposable Nitrile Gloves - Medium (Box of 100)",
  description: "Inspire Exam Grade Powder & Latex Free Stretch Vinyl Gloves, Medium, 100 Count, White",
  price: 12,
  image: "/images/med-nitrile-gloves.png",
  category: "PPE",
},
{
  sku: "PPE-001-L",
  name: "Disposable Nitrile Gloves - Large (Box of 100)",
  description: "Powder-free nitrile gloves, size Large",
  price: 12,
  image: "/images/lg-nitrile-gloves.png",
  category: "PPE",
},
{
  sku: "PPE-001-XL",
  name: "Disposable Nitrile Gloves - XL (Box of 100)",
  description: "Powder-free nitrile gloves, size Extra Large",
  price: 12,
  image: "/images/xl-nitrile-gloves.png",
  category: "PPE",
},
{
  sku: "PPE-002",
  name: "Safety Glasses - Clear Anti-Fog",
  description: "Clear Safety Glasses Bulk Pack of 24, UV Protection and Impact Resistant Lens, Safety Goggles for Men Women, Protective Eyewear with ANSI Z87.1",
  price: 30,
  image: "/images/safety-glasses.png",
  category: "PPE",
},
{
  sku: "PPE-002-T",
  name: "Safety Glasses - Tinted Anti-Fog",
  description: "Tinted Safety Glasses Bulk, 24 Pack, Protective Shaded Safety Goggles, UV Protection Sunglasses, Scratch & Impact Resistant Dark Smoke Lense",
  price: 30,
  image: "/images/tinted-safety-glasses.png",
  category: "PPE",
},
{
  sku: "PPE-003-S",
  name: "High-Visibility Safety Vest - Class 2",
  description: "Reflective vest for construction and roadside safety compliance",
  price: 18,
  image: "/images/safety-vest.png",
  category: "PPE",
},
{
  sku: "PPE-003-M",
  name: "High-Visibility Safety Vest - Class 2",
  description: "Reflective vest for construction and roadside safety compliance",
  price: 18,
  image: "/images/safety-vest.png",
  category: "PPE",
},
{
  sku: "PPE-003-L",
  name: "High-Visibility Safety Vest - Class 2",
  description: "Reflective vest for construction and roadside safety compliance",
  price: 18,
  image: "/images/safety-vest.png",
  category: "PPE",
},
{
  sku: "PPE-003-XL",
  name: "High-Visibility Safety Vest - Class 2",
  description: "Reflective vest for construction and roadside safety compliance",
  price: 18,
  image: "/images/safety-vest.png",
  category: "PPE",
},
{
  sku: "PPE-004",
  name: "Disposable Face Masks - 100 Pack",
  description: "Disposable Face Masks 100 Pack, 3 Ply Breathable Filter Mask with Adjustable Nose Clip & Soft Elastic Ear Loops",
  price: 17,
  image: "/images/face-masks.png",
  category: "PPE",
},
  {
  sku: "JAN-001",
  name: "Heavy-Duty Trash Bags - 55 Gallon (100/Box)",
  description: "55-60 Gallon Trash Bags Heavy Duty 2.1 Mil - 39''x55'' 100 Count Extra Thick Black Garbage Bags Unscented Strong Huge Can Liners for Construction Industrial Yard Outdoor Commercial",
  price: 57,
  image: "/images/trash-bags.png",
  category: "Janitorial",
},
{
  sku: "JAN-002",
  name: "Disinfecting Wipes - 3 pack 75 Count Canister",
  description: "CloroxPro Clorox EcoClean Disinfecting Wipes, Multipurpose 100% Plant Based Cleaning Cloths, Antibacterial Disinfectant, Safe for Multi Surface Use, 75 Count",
  price: 30,
  image: "/images/disinfecting-wipes.png",
  category: "Janitorial",
},
{
  sku: "JAN-003",
  name: "Paper Towels - 12 Roll Pack",
  description: "Brawny Tear-A-Square 3-Ply Paper Towels, 12 XL Family Rolls = 30 Regular Rolls, Strong, Absorbent, and Durable with 3 Sheet Sizes",
  price: 38,
  image: "/images/paper-towels.png",
  category: "Janitorial",
},
{
  sku: "JAN-004",
  name: "Toilet Paper - 2 Ply (96 Rolls)",
  description: "Cottonelle Professional Standard Roll Bulk Toilet Paper (17713), 2-Ply, White (60 Rolls of 451 Sheets, 27,060 Sheet Total)",
  price: 74,
  image: "/images/toilet-paper.png",
  category: "Janitorial",
},
];

export default function Page() {
  const [authorized, setAuthorized] = useState(false);
const [input, setInput] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
const scrollToCheckout = () => {
  const el = document.getElementById("checkout-section");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const PASSWORD = "jodi2026";
  const [cart, setCart] = useState<any[]>([]);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const categories = ["All", ...Array.from(new Set(productBlocks.map((p) => p.category)))];

const filteredProducts =
  activeCategory === "All"
    ? productBlocks
    : productBlocks.filter((p) => p.category === activeCategory);

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

 if (!authorized) {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Private Ordering Portal</h1>
      <p>Enter password to continue</p>

      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "10px", fontSize: "16px" }}
      />

      <br /><br />

      <button
        onClick={() => {
          if (input === PASSWORD) setAuthorized(true);
          else alert("Wrong password");
        }}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Enter
      </button>
    </div>
  );
}const submitOrder = async () => {
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
    <div className="min-h-screen bg-gray-100">
  <div className="sticky top-0 z-50 bg-white shadow border-b">
    <div className="flex items-center justify-between px-6 py-4">

      {/* LEFT LOGO */}
      <img
        src="/images/wolf-logo.webp"
        alt="Wolf Logo"
        className="h-12 w-12 object-contain"
      />

      {/* CENTER TEXT */}
      <div className="text-center flex-1">
        <h1 className="text-3xl font-bold">
          Wolf Industries Quick Order
        </h1>
        <p className="text-sm text-gray-600">
          DVBE Supplier – Fast sourcing for office, PPE, facility, and custom orders
        </p>
      </div>

     {/* RIGHT SIDE: CART + LOGO */}
<div className="flex items-center gap-3">
  <div
  onClick={scrollToCheckout}
  className="bg-gray-100 border px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap cursor-pointer hover:bg-gray-200"
>
    🛒 {cart.length} items | ${total.toFixed(2)}
  </div>

  <img
    src="/images/wolf-logo.webp"
    alt="Wolf Logo"
    className="h-12 w-12 object-contain"
  />
</div>

    </div>
  </div>

  <main className="p-6">
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-700">
  <strong>Order directly from this page for fast processing.</strong><br />
  All orders are confirmed with Wolf Industries and completed in accordance with agency requirements.
</div>
<div className="flex flex-wrap gap-2 mb-6">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setActiveCategory(category)}
      className={`px-4 py-2 rounded-lg border font-semibold ${
        activeCategory === category
          ? "bg-blue-900 text-white border-blue-900"
          : "bg-white text-blue-900 border-blue-900 hover:bg-blue-50"
      }`}
    >
      {category}
    </button>
  ))}
</div>
     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredProducts.map((product) => (
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

      <div id="checkout-section" className="mt-10 bg-white p-6 rounded shadow">
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
      </main>
    </div>
  );
}