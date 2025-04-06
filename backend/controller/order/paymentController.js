const stripe = require("../../config/stripe");
const UserModel = require("../../models/userModel");
const paymentController = async (request, response) => {
  try {
    const { cardItems } = request.body;

    const user = await UserModel.findOne({ _id: request.userId });
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1RAqX8INeG7Mknqymu4PYsoq",
        },
      ],
      customer_email: user.email,
      line_items: cardItems.map((item, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              images: Array.isArray(item.image) ? item.image : [item.image],

              metadata: {
                productId: item._id,
              },
            },
            unit_amount: item.price.discounted * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };
    const session = await stripe.checkout.sessions.create(params);
    response.status(303).json(session);
  } catch (error) {
    response.json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = paymentController;
