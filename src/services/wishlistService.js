
const db=require('../models/db');

async function addToWishlist(userId, property_id) {
    // Check if a wishlist entry already exists for this user and property
    const checkQuery = `
        SELECT COUNT(*) AS count 
        FROM Wishlist 
        WHERE user_id = ? AND property_id = ?
    `;
    const [checkResult] = await db.execute(checkQuery, [userId, property_id]);

    if (checkResult[0].count > 0) {
        return { message: 'Property already in wishlist' };
    }

    // Insert new wishlist entry
    const insertQuery = 'INSERT INTO Wishlist (user_id, property_id) VALUES (?, ?)';
    try {
        await db.execute(insertQuery, [userId, property_id]);
        return { message: 'Property added to wishlist successfully' };
    } catch (err) {
        throw new Error('Error adding property to wishlist: ' + err.message);
    }
}


async function getWishlistByUser(user_id) {
    const query = 
    `   SELECT 
            Properties.property_id,
            Properties.title,
            Properties.city,
            Properties.images
        FROM 
            Wishlist
        INNER JOIN 
            Properties 
        ON 
            Wishlist.property_id = Properties.property_id
        WHERE 
            Wishlist.user_id = ?;
    `;
    
    try {
        const [wishlistResult] = await db.query(query, [user_id]);
        return wishlistResult;
    } catch (err) {
        throw new Error('Error retrieving wishlist items: ' + err.message);
    }
}
module.exports={addToWishlist,getWishlistByUser}