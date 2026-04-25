import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: body.items.map((item: any) => ({
  price_data: {
    currency: "usd",
    tax_behavior: "exclusive",
    product_data: {
      name: item.name,
      tax_code: "txcd_10000000",
    },
    unit_amount: Math.round(item.price * 100),
  },
  quantity: item.qty,
})),
      automatic_tax: {
        enabled: true,
      },

      tax_id_collection: {
        enabled: true,
      },

      customer_creation: "always",
customer_update: {
  shipping: "auto",
  address: "auto",
},
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },

      success_url: "https://jodis-marketplace-phi.vercel.app/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://jodis-marketplace-phi.vercel.app",
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return new Response("Checkout error", { status: 500 });
  }
}