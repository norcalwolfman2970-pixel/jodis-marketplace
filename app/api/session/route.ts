import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return Response.json({ error: "Missing session_id" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    return Response.json({
      customer_details: session.customer_details,
      shipping_details: session.collected_information?.shipping_details,
      amount_total: session.amount_total,
      currency: session.currency,
      line_items: session.line_items,
      payment_status: session.payment_status,
    });
  } catch (err) {
    console.error("Session lookup error:", err);
    return Response.json({ error: "Session lookup error" }, { status: 500 });
  }
}