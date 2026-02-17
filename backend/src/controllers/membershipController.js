import Membership from "../models/Membership.js";
import User from "../models/User.js";


// ================================
// ADD MEMBERSHIP (ADMIN ONLY)
// ================================
export const addMembership = async (req, res) => {
    try {

        const { vendorId, plan, durationInDays } = req.body;

        // Check vendor exists
        const vendor = await User.findById(vendorId);

        if (!vendor || vendor.role !== "vendor") {
            return res.status(400).json({
                message: "Invalid vendor ID"
            });
        }

        const startDate = new Date();

        const endDate = new Date();
        endDate.setDate(startDate.getDate() + durationInDays);

        const membership = await Membership.create({
            vendor: vendorId,
            plan,
            startDate,
            endDate
        });

        res.status(201).json({
            message: "Membership added successfully",
            membership
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// ================================
// UPDATE MEMBERSHIP
// ================================
export const updateMembership = async (req, res) => {
    try {

        const membership = await Membership.findById(req.params.id);

        if (!membership) {
            return res.status(404).json({
                message: "Membership not found"
            });
        }

        const updated = await Membership.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Membership updated",
            updated
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// ================================
// GET ALL MEMBERSHIPS
// ================================
export const getMemberships = async (req, res) => {
    try {

        const memberships = await Membership.find()
            .populate("vendor", "name email");

        res.status(200).json(memberships);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
