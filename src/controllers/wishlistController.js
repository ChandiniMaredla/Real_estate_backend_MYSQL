
const { addToWishlist,getWishlistByUser } = require('../services/wishlistService');

const addToWishlistController = async (req, res) => {
    const userId = req.user.user_id; // Get user_id from the request

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const { property_id } = req.body;

    if (property_id === undefined || isNaN(property_id)) {
        return res.status(400).json({ error: 'propertyId is required and must be a number' });
    }

    try {
        const result = await addToWishlist(userId, property_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getWishlist = async (req, res) => {
    const user_id = req.user.user_id; // Or use req.params if you prefer
  
    if (!user_id) {
        return res.status(400).json({ message: 'User ID is mandatory' });
    }
  
    try {
        const result = await getWishlistByUser(user_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving wishlist items', error: err.message });
    }
  };
module.exports={addToWishlistController,getWishlist};