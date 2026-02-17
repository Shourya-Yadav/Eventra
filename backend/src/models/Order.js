import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: ["card", "upi", "cod"],
        default: "cod"
    },

    status: {
        type: String,
        enum: ["placed", "accepted", "preparing", "out_for_delivery", "delivered"],
        default: "placed"
    }

},
{ timestamps: true }
);

export default mongoose.model("Order", orderSchema);
