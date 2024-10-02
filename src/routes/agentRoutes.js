const express=require('express');
const router=express.Router();

const {getAgents,insertAgentRatingCon,getAgentRatings, insertBookingCon, getBookingDetailsCon}=require('../controllers/agentController');
const {validateToken}=require("../middleware/validatetokenHandler.js");

router.route('/agent').get(validateToken,getAgents);
router.post('/give_agent_rating',validateToken,insertAgentRatingCon);
router.route('/get_agentrating').get(validateToken,getAgentRatings);
router.route('/bookappointment').post(validateToken,insertBookingCon);
router.route('/getbookingdetails/:role').get(validateToken,getBookingDetailsCon);
module.exports=router;