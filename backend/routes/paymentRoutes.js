import express from 'express';
import Stripe from 'stripe';
import Product from '../models/Product.js';
import { sendOrderConfirmationEmail } from '../utils/sendOrderEmail.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "SYSTEM SPECIFICATION NOT FOUND" });
        }

        if (product.stock <= 0 || product.inStock === false) {
            return res.status(400).json({ message: "SYSTEM IS OUT OF STOCK" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',

            shipping_address_collection: {
                allowed_countries: ['GB'],
            },

            phone_number_collection: {
                enabled: true,
            },

            // Delivery and Collection Options
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 2000,
                            currency: 'gbp',
                        },
                        display_name: 'Standard Insured Shipping (UK)',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 1 },
                            maximum: { unit: 'business_day', value: 3 },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 1000,
                            currency: 'gbp',
                        },
                        display_name: 'Local Delivery (Newcastle Upon Tyne)',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 1 },
                            maximum: { unit: 'business_day', value: 2 },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'gbp',
                        },
                        display_name: 'Free Local Collection (Newcastle Upon Tyne)',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 1 },
                            maximum: { unit: 'business_day', value: 2 },
                        },
                    },
                },
            ],

            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: product.name,
                            description: product.description?.substring(0, 255),
                            images: product.images?.[0] ? [product.images[0]] : [],
                        },
                        unit_amount: Math.round(product.price * 100),
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                productId: product._id.toString(),
            },
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/products/${product._id}?payment=cancelled`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Stripe Session Error:', error.message);
        res.status(500).json({ message: 'FAILED TO INITIALISE CHECKOUT' });
    }
});

// Fetch Order Confirmation Details
router.get('/session/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;

        if (!sessionId || !sessionId.startsWith('cs_')) {
            return res.status(400).json({ message: 'INVALID SESSION IDENTIFIER' });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'line_items.data.price', 'customer_details'],
        });

        if (!session) {
            return res.status(404).json({ message: 'SESSION NOT FOUND' });
        }

        const shipping = session.shipping_details || session.customer_details;

        const orderData = {
            orderId: session.id.slice(-10).toUpperCase(),
            customerName: session.customer_details?.name || session.shipping_details?.name || null,
            customerEmail: session.customer_details?.email || session.customer_email || null,
            shippingAddress: shipping?.address ? {
                line1: shipping.address.line1,
                line2: shipping.address.line2,
                city: shipping.address.city,
                postal_code: shipping.address.postal_code,
                country: shipping.address.country,
            } : null,
            amountSubtotal: (session.amount_subtotal || 0) / 100,
            amountShipping: (session.shipping_cost?.amount_total || 0) / 100,
            amountTotal: (session.amount_total || 0) / 100,
            paymentStatus: session.payment_status,
            items: session.line_items?.data?.map((item) => ({
                name: item.description || 'Custom PC Build / Hardware Component',
                quantity: item.quantity || 1,
                price: (item.amount_total || 0) / 100,
            })) || [],
        };

        // Send confirmation emails
        if (session.payment_status === 'paid' && orderData.customerEmail) {
            sendOrderConfirmationEmail(orderData).catch((err) =>
                console.error("Failed to send order email:", err.message)
            );
        }

        res.json(orderData);
    } catch (error) {
        console.error('Error fetching Stripe session:', error.message);
        res.status(500).json({ message: 'FAILED TO RETRIEVE ORDER DETAILS' });
    }
});

export default router;