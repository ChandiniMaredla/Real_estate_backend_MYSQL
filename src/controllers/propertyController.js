const{insertProperty,getPropertiesBySquareFeet,
    getPropertiesByType,getPropertiesByLocation,
    insertPropertyRating,getProperty,
    getPropertiesByFilters,getPropertiesByPrice,getPropertyById,getPropertyRating}=require('../services/propertyService');

const addProperty = async (req, res) => {
    const {
        title, description, city, state, zipcode, price, type, status, square_feet, images,email,username
    } = req.body;

    const userId = req.user.user_id;

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        const result = await insertProperty(userId, title, description,city ,state, zipcode, price, type, status, square_feet, images,email,username);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const getPropertiesByLocationCon = async (req, res) => {
    const { location } = req.params;

    if (!location) {
        return res.status(400).json({ error: 'Location parameter is required' });
    }

    try {
        const properties = await getPropertiesByLocation(location);
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPropertiesByTypeCon = async (req, res) => {
    const { type } = req.params;

    if (!type) {
        return res.status(400).json({ error: 'Type parameter is required' });
    }

    try {
        const properties = await getPropertiesByType(type);
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPropertiesBySquareFeetCon = async (req, res) => {
    const { square_feet } = req.params;

    if (square_feet === undefined) {
        return res.status(400).json({ error: 'Square_Feet parameter is required' });
    }

    const squareFeet = parseInt(square_feet, 10);

    if (isNaN(squareFeet)) {
        return res.status(400).json({ error: 'Square_Feet must be a valid number' });
    }

    try {
        const properties = await getPropertiesBySquareFeet(squareFeet);
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Route handler to get property by location
const getPropertyCon = async (req,res) =>{
    const  {location}  = req.params; // Get email from request parameters
    console.log(location)
    try {
    const property = await getProperty(location);
    console.log(property)
    if (property) {
    res.status(200).json(property);
    } else {
    res.status(404).json({ message: 'Properties not found' });
    }
    } catch (err) {
    res.status(500).json({ message: 'Failed to fetch property' });
    }
    };
    
    
  


    const getPropertiesByFilters1 = async (req, res) => {
        // Extract filters from request body
    //      const filters = {
    //     type: req.params.type || null,
    //     price: req.params.price ? parseInt(req.query.price, 10) : null,
    //     location: req.params.location || null,
    //     squareFeet: req.params.squareFeet ? parseInt(req.query.squareFeet, 10) : null
    // };

    const {type,price,location,squareFeet} = req.params;
        try {
            const properties = await getPropertiesByFilters(type,price,location,squareFeet);
            if (properties.length === 0) {
                res.status(404).json({ message: 'No properties found' });
            } else {
                res.status(200).json(properties);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving properties', error: error.message });
        }
      };
      const getPropertiesByPrice1 = async (req, res) => {
        const { price } = req.params;
      
          if (price === undefined) {
              return res.status(400).json({ message: 'Price is required' });
          }
      
          try {
              const properties = await getPropertiesByPrice(price);
              res.status(200).json(properties);
          } catch (error) {
              res.status(500).json({ message: 'Error retrieving properties by price', error: error.message });
          }
      };

const getPropertyById1 = async (req, res) => {
        //const { propertyId } = req.params; // Use req.params to fetch propertyId
      const user_id= req.user.user_id;
        if (!user_id) {
            return res.status(400).json({ message: 'Property ID is mandatory' });
        }
      
        try {
            const property = await getPropertyById(user_id);
            if (property.length === 0) {
                res.status(404).json({ message: 'Property not found' });
            } else {
                res.status(200).json(property);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving property details', error: error.message });
        }
      };  
      
      
const insertBooking=async (req,res)=>{
        try {
          const bookingData = req.body;
          const result = await createBooking(bookingData);
          res.status(201).json({ message: 'Booking created successfully!', bookingId: result.insertId });
      } catch (error) {
          res.status(500).json({ message: 'Error creating booking', error: error.message });
      }
      }
      
 const getBookingDetails = async (req, res) => {
        const { booking_id } = req.params; // Use req.body to fetch booking_id
      
        if (!booking_id) {
            return res.status(400).json({ message: 'Booking ID is mandatory' });
        }
      
        try {
            const result = await getBookingById(booking_id);
            if (result.length === 0) {
                res.status(404).json({ message: 'Booking not found' });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving booking details', error: error.message });
        }
      };

      //post Rating for property
const insertPropertyRatingCon = async (req, res) => {
    try {
    const { rating, review, property_id} = req.body;
    const user_id= req.user.user_id;
    console.log('Inserting Rating:', { rating, review, property_id, user_id});
    await insertPropertyRating({ rating, review, property_id, user_id });
    
    res.status(200).send('Rating inserted successfully');
    } catch (error) {
    console.error('Error inserting rating:', error);
    res.status(500).send('Error inserting rating');
    }
    };
    
    //Get rating
    const getPropertyRatings = async (req, res) => {
    const { property_id } = req.params; // Get property_id from route parameters
    
    try {
    // Fetch property ratings and reviews
    const ratings = await getPropertyRating(property_id);
    
    if (ratings.length > 0) {
    res.status(200).json(ratings); // Send the ratings and reviews as JSON response
    } else {
    res.status(404).json({ message: 'No ratings found for this property.' });
    }
    } catch (error) {
    console.error('Error in getPropertyRatings controller:', error);
    res.status(500).json({ message: 'Failed to fetch property ratings' });
    }
    };
           
module.exports={addProperty,getPropertiesByLocationCon,
    getPropertiesByTypeCon,getPropertiesBySquareFeetCon,
    getPropertyCon,insertPropertyRatingCon,getPropertiesByFilters1,
    getPropertiesByPrice1,getPropertyById1,insertBooking,getBookingDetails,insertPropertyRatingCon,getPropertyRatings};