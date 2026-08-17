import mongoose from 'mongoose';

const benchmarkSchema = new mongoose.Schema(
    {
        game: {
            type: String,
            required: [true, 'Please add a game title'],
            trim: true
        },
        resolution: {
            type: String,
            default: '1080P'
        },
        settings: {
            type: String,
            default: 'ULTRA'
        },
        fps: {
            type: Number,
            required: [true, 'Please add FPS result']
        }
    },
    { _id: false }
);

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
        isFeatured: {
            type: Boolean,
            default: false
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
        benchmarks: [benchmarkSchema],
        price: {
            type: Number,
            required: [true, 'Please add a price (£)'],
            default: 0.0
        },
        countInStock: {
            type: Number,
            required: [true, 'Please add stock count'],
            default: 1
        },
        ebayUrl: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;