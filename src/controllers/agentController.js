
const{insertAgentRating,getAgentsByLocation,getAgentRating,getBookingDetailsByAgentId,insertBooking}=require('../services/agentService');


  
const getAgents=async(req,res)=>{
    const{city}=req.params;
    try{
        const result=await getAgentsByLocation(city);
        res.status(201).json(result);
    }
    catch(err){
      res.status(500).json({error:'error logging'+err.message});
    }
};


//post Ratings for agent
const insertAgentRatingCon = async (req, res) => {
    try {
    const { rating, review, agent_id} = req.body;
    const user_id= req.user.user_id;
    console.log('Inserting Rating:', { rating, review, agent_id, user_id });
    await insertAgentRating({ rating, review, agent_id, user_id});
    
    res.status(200).send('Rating inserted successfully');
    } catch (error) {
    console.error('Error inserting rating:', error);
    res.status(500).send('Error inserting rating');
    }
    };

     //Get rating
const getAgentRatings = async (req, res) => {
    const  agent_id  = req.user.user_id; // Get property_id from route parameters
    console.log(agent_id);
    // const {agent_id}= req.params;
    try {
    // Fetch property ratings and reviews
    const ratings = await getAgentRating(agent_id);
    
    if (ratings.length > 0) {
    res.status(200).json(ratings); // Send the ratings and reviews as JSON response
    } else {
    res.status(404).json({ message: 'No ratings found for this Agent.' });
    }
    } catch (error) {
    console.error('Error in getPropertyRatings controller:', error);
    res.status(500).json({ message: 'Failed to fetch Agent ratings' });
    }
    };
    


    // Controller function to handle booking insertion
const insertBookingCon = async (req, res) => {
    const { user_id, bookingDate, bookingTime, location } = req.body; // Get booking details from request body
    const agent_id = req.user.user_id;
    try {
    // Insert booking into the database
    await insertBooking({ user_id, agent_id, bookingDate, bookingTime, location });
    res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
    console.error('Error in insertBooking controller:', error);
    res.status(500).json({ message: 'Failed to create booking' });
    }
    };
    
    
    
    // get bookings
    
    
    const getBookingDetailsCon = async (req, res) => {
        const agent_id = req.user.user_id;
    const { role } = req.params; // Get agent_id from route parameters
    
    try {
    // Fetch booking details and corresponding user information
    const bookings = await getBookingDetailsByAgentId(agent_id,role);
    
    if (bookings.length > 0) {
    res.status(200).json(bookings); // Send the booking details as JSON response
    } else {
    res.status(404).json({ message: 'No bookings found for this agent.' });
    }
    } catch (error) {
    console.error('Error in getBookingDetails controller:', error);
    res.status(500).json({ message: 'Failed to fetch booking details' });
    }
    };
    module.exports = {
        insertAgentRatingCon,getAgents,getAgentRatings,getBookingDetailsCon, insertBookingCon
    }