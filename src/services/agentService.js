const db=require('../models/db');



async function getAgentsByLocation(city) {
    const agentsQuery = 'SELECT FirstName, LastName, Email, PhoneNumber FROM User WHERE City = ? AND Role = "Agent"';

    try {
        // Retrieve agents from the specified city
        const [agentsResult] = await db.query(agentsQuery, [city]);

        return agentsResult;
    } catch (err) {
        // Handle errors and log them if necessary
        console.error('Error retrieving agents:', err);
        throw new Error('Error retrieving agents: ' + err.message);
    }
}
// Function to insert agent rating into the database
const insertAgentRating = async ({ rating, review, agent_id, user_id }) => {
const query = 'INSERT INTO AgentReview (agent_id, user_id, rating, review) VALUES (?,?, ?, ?)';
console.log(rating);
try {
await db.query(query, [agent_id, user_id, rating, review]);
} catch (error) {
console.error('Error inserting rating:', error);
throw error;
}
};

//Function to get agent rating
const getAgentRating = async (agent_id) => {
    const query = `
    SELECT
    ar.rating,
    ar.review,
    CONCAT(u.FirstName, ' ', u.LastName) AS FullName
    FROM
    AgentReview ar
    JOIN
    User u
    ON
    ar.user_id = u.user_id
    WHERE
    ar.agent_id = ?
    `;
    
    try {
    const [rows] = await db.query(query, [agent_id]);
    return rows; // Return the result set containing the ratings, reviews, and concatenated full names
    } catch (error) {
    console.error('Error fetching property ratings:', error);
    throw error;
    }
    };

    // Function to insert a booking into the database
const insertBooking = async ({ user_id, agent_id, bookingDate, bookingTime, location }) => {
    const query = 'INSERT INTO Booking (user_id, agent_id, bookingDate, bookingTime, location) VALUES (?, ?, ?, ?, ?)';
    
    try {
    await db.query(query, [user_id, agent_id, bookingDate, bookingTime, location]);
    console.log('Booking inserted successfully');
    } catch (error) {
    console.error('Error inserting booking:', error);
    throw error;
    }
    };
    
    
    
    //get booking details
    const getBookingDetailsByAgentId = async (agent_id,role) => {
    const query = `
    SELECT
    b.bookingId,
    b.bookingDate,
    b.bookingTime,
    b.location,
    CONCAT(u.FirstName, ' ', u.LastName) AS Name,
    u.Email,
    u.PhoneNumber
    FROM
    Booking b
    JOIN
    User u
    ON
    b.user_id = u.user_id
    WHERE
    b.agent_id = ?
    
    AND
    u.Role = ?;
    `;
    
    try {
    const [rows] = await db.query(query, [agent_id,role]);
    return rows;
    } catch (error) {
    console.error('Error fetching booking details:', error);
    throw error;
    }
    };

module.exports = {
        insertAgentRating,getAgentsByLocation,getAgentRating,insertBooking,getBookingDetailsByAgentId
    }