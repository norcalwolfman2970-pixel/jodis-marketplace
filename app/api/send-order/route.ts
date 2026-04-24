export async function POST(req: Request) {
  const data = await req.json();

  const addr =
    data.shipping_details?.address ||
    data.customer_details?.address;

  const name =
    data.shipping_details?.name ||
    data.customer_details?.name;

  const items =
    data.line_items?.data
      ?.map(
        (item: any) =>
          `${item.description} x ${item.quantity}`
      )
      .join("\n") || "No items";

  const total = (data.amount_total / 100).toFixed(2);

  const body = `
New Order

Customer: ${name}

Shipping:
${addr?.line1}
${addr?.city}, ${addr?.state} ${addr?.postal_code}

Items:
${items}

Total: $${total}
`;

  const mailto = `mailto:admin@wolfindustries.net?subject=New Order&body=${encodeURIComponent(body)}`;

  return Response.json({ url: mailto });
}