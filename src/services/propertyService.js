const db=require('../models/db');


async function insertProperty(userId, title, description,city, state, zipcode, price, type, status, square_feet, images,email,username) {
    // Check if user_id exists
    const checkUserQuery = 'SELECT COUNT(*) AS count FROM User WHERE user_id = ?';
    const [userResult] = await db.execute(checkUserQuery, [userId]);

    if (userResult[0].count === 0) {
        throw new Error('User ID does not exist');
    }

    // Convert undefined values to null
    const insertQuery = `
        INSERT INTO Properties (user_id, title, description, city, state, zipcode, price, type, status, square_feet, images,email,username)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const values = [
        userId,
        title ?? null,
        description ?? null,
        city ?? null,
        state ?? null,
        zipcode ?? null,
        price ?? null,
        type ?? null,
        status ?? null,
        square_feet ?? null,
        images ?? null,
        email ?? null,
        username ?? null,
    ];

    try {
        const [result] = await db.execute(insertQuery, values);
        return { id: result.insertId, message: 'Property inserted successfully' };
    } catch (err) {
        throw new Error('Error inserting property: ' + err.message);
    }
}

async function getPropertiesByLocation(location) {
    const query = 'SELECT * FROM Properties WHERE city = ?';
    const [results] = await db.execute(query, [location]);
    return results;
}

async function getPropertiesByType(type) {
    const query = 'SELECT * FROM Properties WHERE type = ?';
    const [results] = await db.execute(query, [type]);
    return results;
}

async function getPropertiesBySquareFeet(square_feet) {
    const query = 'SELECT * FROM Properties WHERE square_feet =?';
    const [results] = await db.execute(query, [square_feet]);
    return results;
}

// Function to get properties by location
const getProperty = async(location) =>{
    try{
    // Function to determine SQL query based on location type
    console.log(location);
    function getSQLQuery(location) {
    const pinCodeCondition = /^\d{6}$/;
    const cityCondition = /^[A-Za-z]+$/;
    
    if (pinCodeCondition.test(location)) {
    return 'SELECT * FROM Properties WHERE zipcode = ?';
    } else if (cityCondition.test(location)) {
    return 'SELECT * FROM Properties WHERE city = ?';
    } else {
    throw new Error('Invalid location format');
    }
    }
    // Determine the appropriate SQL query
    const sql = getSQLQuery(location);
    const [properties] = await db.query(sql,[location]);
    return properties;
    }
    catch (err) {
    console.error('Error fetching properties by location:', err);
    throw err; // Rethrow the error to handle it in the controller
    }
    };
    
    // Function to get properties by budget or price range
async function getPropertiesByPrice(price) {
    const query = 'SELECT * FROM Properties WHERE price <= ?';
    
    try {
        const [result] = await db.query(query, [price]);
        return result;
    } catch (error) {
        throw new Error('Error retrieving properties by price: ' + error.message);
    }
}



async function getPropertiesByFilters(type,price,location,squareFeet) {
        let query = 'SELECT * FROM Properties WHERE 1=1'; // Start with a base query
        const queryParams = [];
    
        // Apply filters based on exact matches
        if (type) {
            query += ' AND type = ?';
            queryParams.push(type);
        }
    
        if (price) {
            query += ' AND price = ?';
            queryParams.push(price);
        }
    
        if (location) {
            query += ' AND location = ?';
            queryParams.push(location);
        }
    
        if (squareFeet) {
            query += ' AND square_feet = ?';
            queryParams.push(squareFeet);
        }
    
        try {
            const [result] = await db.query(query, queryParams);
            return result;
        } catch (error) {
            throw new Error('Error retrieving properties: ' + error.message);
        }
    }
   
    // Function to get property details by ID
async function getPropertyById(user_id) {
    const query = 'SELECT * FROM Properties WHERE user_id = ?';
    try {
        const [result] = await db.query(query, [user_id]);
        return result;
    } catch (error) {
        throw new Error('Error retrieving property details: ' + error.message);
    }
}

// Function to insert property rating into the database
const insertPropertyRating = async ({ rating, review, property_id, user_id }) => {
    const query = 'INSERT INTO PropertyReview (property_id,user_id, rating, review) VALUES (?, ?, ?, ?)';
    console.log(rating);
    try {
    await db.query(query, [property_id,user_id, rating, review]);
    } catch (error) {
    console.error('Error inserting rating:', error);
    throw error;
    }
    };
    
    //Function to get property rating
    const getPropertyRating = async (property_id) => {
    const query = `
    SELECT
    pr.rating,
    pr.review,
    CONCAT(u.FirstName, ' ', u.LastName) AS FullName
    FROM
    PropertyReview pr
    JOIN
    User u
    ON
    pr.user_id = u.user_id
    WHERE
    pr.property_id = ?
    `;
    
    try {
    const [rows] = await db.query(query, [property_id]);
    return rows; // Return the result set containing the ratings, reviews, and concatenated full names
    } catch (error) {
    console.error('Error fetching property ratings:', error);
    throw error;
    }
    };
module.exports = { insertProperty ,getPropertiesByLocation,getPropertiesByType,
    getPropertiesBySquareFeet,insertPropertyRating,
    getProperty,getPropertiesByFilters,getPropertiesByPrice,getPropertyById,getPropertyRating};
