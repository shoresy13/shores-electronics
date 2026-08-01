import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a system name'],
            trim: true
        },
        images: {
            type: [String],
            required: [true, 'Please add at least one image URL'],
            validate: [
                (val) => val.length > 0,
                'Please provide at least one image URL'
            ]
        },
        description: {
            type: String,
            required: [true, 'Please add a description']
        },
        specs: {
            cpu: { type: String, default: '' },
            gpu: { type: String, default: '' },
            ram: { type: String, default: '' },
            psu: { type: String, default: '' },
            storage: { type: String, default: '' },
            motherboard: { type: String, default: '' },
            cooler: { type: String, default: '' },
            case: { type: String, default: '' },
            os: { type: String, default: '' }
        },
        price: {
            type: Number,
            required: [true, 'Please add a price (£)'],
            default: 0.0
        },
        countInStock: {
            type: Number,
            required: [true, 'Please add stock count'],
            default: 1
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;