import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
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

    const emailBody = `
New Order 🚀

Customer: ${name}

Shipping:
${addr?.line1}
${addr?.city}, ${addr?.state} ${addr?.postal_code}

Items:
${items}

Total: $${total}
`;

    await resend.emails.send({
      from: "orders@wolfindustries.net",
      to: "admin@wolfindustries.net",
      subject: "New Order - Jodi Marketplace",
      text: emailBody,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return new Response("Email error", { status: 500 });
  }
}