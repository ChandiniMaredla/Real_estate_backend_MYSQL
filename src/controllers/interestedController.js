
const { addToInterested,getInterested ,countOfUsersInterested} = require('../services/interestedService');

const addToInterestedController = async (req, res) => {
    const userId = req.user.user_id; // Get user_id from the request

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    const { property_id } = req.body;

    if (property_id === undefined || isNaN(property_id)) {
        return res.status(400).json({ error: 'propertyId is required and must be a number' });
    }

    try {
        const result = await addToInterested(userId, property_id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const getInterestedController = async (req, res) => {
    const { property_id } = req.params;

    if (property_id === undefined || isNaN(property_id)) {
        return res.status(400).json({ error: 'Property ID is required and must be a number' });
    }

    try {
        const result = await getInterested(property_id);
        
        if (result.length === 0) {
            return res.status(404).json({ message: 'No users interested in this property' });
        }

        res.status(200).json({ interestedUsers: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


  
  //count of users interested in a particular sellers property
  const countOfUsersInterestedCon= async (req, res) => {
    try {
    const { property_id } = req.params;
    const count= await countOfUsersInterested({ property_id});
    
    if (count) {
    res.status(200).json(count);
    } else {
    res.status(404).json({ message: 'Properties not found' });
    }
    } catch (err) {
    res.status(500).json({ message: 'Failed to fetch count' });
    }
    };
  
module.exports={addToInterestedController,getInterestedController,countOfUsersInterestedCon};