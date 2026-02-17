import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
{
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    plan: {
        type: String,
        enum: ["6_months", "1_year", "2_years"],
        required: true
    },

    startDate: {
        type: Date,
        default: Date.now
    },

    endDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["active", "expired"],
        default: "active"
    }

},
{ timestamps: true }
);

export default mongoose.model("Membership", membershipSchema);
