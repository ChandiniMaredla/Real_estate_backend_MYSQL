const express=require('express');
const router=express.Router();
const{getUsers,postloginUsers,getProfileCon,getSellerInfoCon,insertUserRatingCon,sample}=require("../controllers/userController");
const {validateToken}=require("../middleware/validatetokenHandler.js")

router.route('/register').post(getUsers);
router.route('/login').post(postloginUsers,validateToken);
router.route('/profile').get(validateToken,getProfileCon);
// router.route('/agent').get(getAgents);
router.route('/sellerinfo/:property_id').get(validateToken,getSellerInfoCon);
router.route('/userrating').post(validateToken,insertUserRatingCon);
router.route('/hi').get(sample);

 module.exports=router;
