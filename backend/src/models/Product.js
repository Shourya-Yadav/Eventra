import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String
    },

    image: {
        type: String   // store URL only
    },

    isAvailable: {
        type: Boolean,
        default: true
    }

},
{ timestamps: true }
);

export default mongoose.model("Product", productSchema);
