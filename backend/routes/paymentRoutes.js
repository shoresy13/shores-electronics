import express from 'express';
import Stripe from 'stripe';
import Product from '../models/Product.js';

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

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
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
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/products?payment=success`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/products/${product._id}?payment=cancelled`,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Stripe Session Error:', error.message);
        res.status(500).json({ message: 'FAILED TO INITIALISE CHECKOUT' });
    }
});

export default router;