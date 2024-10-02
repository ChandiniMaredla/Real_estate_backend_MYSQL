const express=require('express');
const router=express.Router();
const {validateToken}=require("../middleware/validatetokenHandler.js");
const {addToInterestedController,getInterestedController,countOfUsersInterestedCon}=require("../controllers/interestedController");

router.post('/interested/addinterest', validateToken, addToInterestedController);
router.get('/interested/getinterest', validateToken, getInterestedController);
router.get('/interested/getcount', validateToken, countOfUsersInterestedCon);


module.exports= router;