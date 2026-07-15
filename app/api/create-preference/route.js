import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function POST(request) {
  try {
    const { items, shipping, back_urls } = await request.json();

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price,
        })),
        payer: {
          email: "",
        },
        shipments: {
          cost: shipping,
        },
        back_urls,
      },
    });

    return Response.json({
      success: true,
      preferenceId: result.id,
      preferenceLink: result.init_point,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
