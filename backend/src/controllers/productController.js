import Product from "../models/Product.js";


// ================================
// CREATE PRODUCT (Vendor Only)
// ================================
export const createProduct = async (req, res) => {
    try {

        const { name, price, description, image } = req.body;

        // Basic validation
        if (!name || !price) {
            return res.status(400).json({
                message: "Name and price are required"
            });
        }

        const product = await Product.create({
            name,
            price,
            description,
            image,
            vendor: req.user.id   // taken from JWT
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// ================================
// GET LOGGED-IN VENDOR PRODUCTS
// ================================
export const getVendorProducts = async (req, res) => {
    try {

        const products = await Product.find({
            vendor: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// ================================
// UPDATE PRODUCT
// ================================
export const updateProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Ownership check
        if (product.vendor.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized to update this product"
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Product updated successfully",
            updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



// ================================
// DELETE PRODUCT
// ================================
export const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Ownership check
        if (product.vendor.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized to delete this product"
            });
        }

        await product.deleteOne();

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
