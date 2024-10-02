
const{registerUser,loginuser,getProfile,getSellerInfo,insertUserRating,sampleservice}=require('../services/userService');
const{validateToken}=require("../middleware/validatetokenHandler.js")



const sample= async(req,res)=>{
  try{
      const result= await sampleservice()
      console.log(result,"10");
      res.status(201).json(result);
  }
  catch(err){
    res.status(500).json({ error: 'Error adding user: ' + err.message });
  }
  
  
 
}

const getUsers = async (req, res) => {
    const { FirstName,LastName,Email,PhoneNumber,Password,Pincode,City,Role} = req.body;
    
  if ( !FirstName||!LastName||!Email||!PhoneNumber||!Password||!Pincode||!City||!Role) {
    return res.status(400).json({ message: 'All fields are mandatory' });
  }

  try {
    const result = await registerUser( FirstName,LastName,Email,PhoneNumber,Password,Pincode,City,Role);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error adding user: ' + err.message });
  }
};



// @desc Get all login users
// @router GET /api/users/login
// @access public
const postloginUsers = async (req, res) => {
    const{Email,Password}=req.body;
      if(!Email){
        throw new Error('Email is mandatory!');
      }
      try{
        const result= await loginuser(Email,Password);
        res.status(201).json(result);
      }
      catch(err){
        res.status(500).json({error:'error logging'+err.message});
      }
  };



  const getProfileCon = async (req, res) => {
    const user_id  = req.user.user_id; // Get email from request parameters
    try {
    const user = await getProfile(user_id);
    if (user) {
      console.log(user);
    res.status(200).json(user);
    } else {
    res.status(404).json({ message: 'User not found' });
    }
    } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user' });
    }
    };






// Route handler to get seller info
const getSellerInfoCon= async (req,res) =>{
  const  {userId}  =  req.params; // Get userId from request parameters
  console.log(userId)
  try {
  const seller = await getSellerInfo(userId);
  console.log(seller)
  if (seller) {
  res.status(200).json(seller);
  } else {
  res.status(404).json({ message: 'Seller not found' });
  }
  } catch (err) {
  res.status(500).json({ message: 'Failed to fetch seller info' });
  }
  };
  
  
  //post Ratings for user
  const insertUserRatingCon = async (req, res) => {

  try {
  const { rating, review, user_id } = req.body;
  console.log('Inserting Rating:', { rating, review, user_id });
  await insertUserRating({ rating, review, user_id });
  
  res.status(200).send('Rating inserted successfully');
  } catch (error) {
  console.error('Error inserting rating:', error);
  res.status(500).send('Error inserting rating');
  }
  };
  
  

  
  module.exports={getUsers,postloginUsers,getProfileCon,getSellerInfoCon,insertUserRatingCon,sample}