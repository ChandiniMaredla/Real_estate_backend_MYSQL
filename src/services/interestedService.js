const db=require('../models/db');

async function addToInterested(user_id, property_id) {
    // Check if a wishlist entry already exists for this user and property
    const checkQuery = `
        SELECT COUNT(*) AS count 
        FROM InterestedProperty 
        WHERE user_id = ? AND property_id = ?
    `;
    const [checkResult] = await db.execute(checkQuery, [user_id, property_id]);

    if (checkResult[0].count > 0) {
        return { message: 'Property already in InterestedProperty' };
    }
    const insertQuery = 'INSERT INTO InterestedProperty (user_id, property_id) VALUES (?, ?)';
    try {
        await db.execute(insertQuery, [user_id, property_id]);
        return { message: 'Property added to InterestedProperty successfully' };
    } catch (err) {
        throw new Error('Error adding property to InterestedProperty: ' + err.message);
    }
}

    // Function to count the no. of users interested in a particular property
    const countOfUsersInterested = async ({ property_id }) => {
        const query = 'select count(*) from InterestedProperty where property_id=?';
        console.log(property_id);
        try {
        await db.query(query, [property_id]);
        } catch (error) {
        console.error('Error getting the count:', error);
        throw error;
        }
        };



const getInterested = async (property_id) => {
    const query = `
        SELECT u.user_id, u.FirstName, u.LastName, u.PhoneNumber, u.email, u.pincode, u.City, u.profile_picture
        FROM InterestedProperty ip JOIN User u ON ip.user_id = u.user_id WHERE ip.property_id = ?
    `;

    try {
        const [rows] = await db.execute(query, [property_id]);
        return rows;
    } catch (err) {
        throw new Error('Error retrieving interested users: ' + err.message);
    }
};

module.exports={addToInterested,getInterested,countOfUsersInterested}